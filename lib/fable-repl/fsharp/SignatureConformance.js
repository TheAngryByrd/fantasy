import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { valLinkageAEquiv, returnTypesAEquiv, typarsAEquiv, ValSpecIsCompiledAsInstance, tcrefAEquiv, superOfTycon, isAbstractTycon, isSealedTy, generalizedTyconRef, TypeNullIsExtraValue, IsUnionTypeWithNullAsTrueValue, typeAEquiv, isInterfaceTy, typarConstraintsAEquiv, tyconRefEq, typeEquiv, EvaledAttribExprEquality, remapAttrib, addValRemap, addTyconRefRemap, Remap, DisplayEnv } from "./TastOps";
import { mkLocalModRef, ValReprInfo, mkLocalEntityRef, mkLocalTyconRef, isLessAccessible, TType, RecdField, Entity, UnionCase, Val, EntityRef } from "./tast";
import { equals, toString, Tuple, equalsRecords, Unit, Function as _Function } from "../fable-core/Util";
import { Microsoft, System } from "../fcs-fable/adapters";
import { range } from "./range";
import { tryFind, map2, toList, iterate, forAll, forAll2, exists, foldBack } from "../fable-core/Seq";
import { choose, collect, filter, append, reverse, map } from "../fable-core/List";
import List_1 from "../fable-core/List";
import { NameMapModule, List } from "../absil/illib";
import CurriedLambda from "../fable-core/CurriedLambda";
import { error, errorR, Error as _Error, warning } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import { getValue } from "../fable-core/Option";
import { mkSynId } from "./ast";
import { showL } from "./layout";
import { outputQualifiedValOrMember, minimalStringsOfTwoTypes, stringValOrMember, minimalStringOfType, layoutTyparConstraint } from "./NicePrint";
import { NameSetModule, ListSet, p13 } from "./lib";
import { AllSuperTypesOfType, AllowMultiIntfInstantiations } from "./infos";
import { ZsetModule } from "../absil/zset";
import { printf, join } from "../fable-core/String";
import Choice from "../fable-core/Choice";
export class RequiredButNotSpecified extends Error {
  constructor(data0, data1, data2, data3, data4) {
    super();
    Object.setPrototypeOf(this, RequiredButNotSpecified.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SignatureConformance.RequiredButNotSpecified",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: EntityRef,
        Data2: "string",
        Data3: _Function([System.Text.StringBuilder, Unit]),
        Data4: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.SignatureConformance.RequiredButNotSpecified", RequiredButNotSpecified);
export class ValueNotContained extends Error {
  constructor(data0, data1, data2, data3, data4) {
    super();
    Object.setPrototypeOf(this, ValueNotContained.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SignatureConformance.ValueNotContained",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: EntityRef,
        Data2: Val,
        Data3: Val,
        Data4: _Function([Tuple(["string", "string", "string"]), "string"])
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.SignatureConformance.ValueNotContained", ValueNotContained);
export class ConstrNotContained extends Error {
  constructor(data0, data1, data2, data3) {
    super();
    Object.setPrototypeOf(this, ConstrNotContained.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SignatureConformance.ConstrNotContained",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: UnionCase,
        Data2: UnionCase,
        Data3: _Function([Tuple(["string", "string"]), "string"])
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.SignatureConformance.ConstrNotContained", ConstrNotContained);
export class ExnconstrNotContained extends Error {
  constructor(data0, data1, data2, data3) {
    super();
    Object.setPrototypeOf(this, ExnconstrNotContained.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SignatureConformance.ExnconstrNotContained",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: Entity,
        Data2: Entity,
        Data3: _Function([Tuple(["string", "string"]), "string"])
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.SignatureConformance.ExnconstrNotContained", ExnconstrNotContained);
export class FieldNotContained extends Error {
  constructor(data0, data1, data2, data3) {
    super();
    Object.setPrototypeOf(this, FieldNotContained.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SignatureConformance.FieldNotContained",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: RecdField,
        Data2: RecdField,
        Data3: _Function([Tuple(["string", "string"]), "string"])
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.SignatureConformance.FieldNotContained", FieldNotContained);
export class InterfaceNotRevealed extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, InterfaceNotRevealed.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SignatureConformance.InterfaceNotRevealed",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: TType,
        Data2: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.SignatureConformance.InterfaceNotRevealed", InterfaceNotRevealed);
export class Checker {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SignatureConformance.Checker",
      properties: {}
    };
  }

  constructor(g, amap, denv, remapInfo, checkingSig) {
    this.g = g;
    this.amap = amap;
    this.denv = denv;
    this.checkingSig = checkingSig;
    const remap = Remap.Empty;
    const remap_1 = foldBack((tupledArg, acc) => addTyconRefRemap(tupledArg[1], tupledArg[0], acc), remapInfo.mrpiEntities, remap);
    const remap_2 = foldBack((tupledArg_1, acc_1) => addValRemap(tupledArg_1[1].Deref, tupledArg_1[0].Deref, acc_1), remapInfo.mrpiVals, remap_1);
    this.sigToImplRemap = remap_2;
  }

  CheckSignature(aenv, implModRef, signModType) {
    const m = implModRef.Range;
    return this.checkModuleOrNamespaceContents(m, aenv, implModRef, signModType);
  }

  CheckTypars(m, aenv, implTypars, signTypars) {
    return this.checkTypars(m, aenv, implTypars, signTypars);
  }

  checkAttribs(_aenv, implAttribs, sigAttribs, fixup) {
    var arg00_;
    var arg10_;
    const sigAttribs_1 = map((arg00_ = this.g, arg10_ = this.sigToImplRemap, arg20_ => remapAttrib(arg00_, arg10_, arg20_)), sigAttribs);

    const attribExprEq = (_arg2, _arg1) => {
      return EvaledAttribExprEquality(this.g, _arg2.data[1], _arg1.data[1]);
    };

    const attribNamedArgEq = (_arg4, _arg3) => {
      const ty1 = _arg4.data[1];
      const nm1 = _arg4.data[0];
      const isProp1 = _arg4.data[2];
      const e1 = _arg4.data[3];
      const ty2 = _arg3.data[1];
      const nm2 = _arg3.data[0];
      const isProp2 = _arg3.data[2];
      const e2 = _arg3.data[3];

      if ((nm1 === nm2 ? typeEquiv(this.g, ty1, ty2) : false) ? isProp1 === isProp2 : false) {
        return attribExprEq(e1, e2);
      } else {
        return false;
      }
    };

    const attribsEq = (attrib1, attrib2) => {
      if (tyconRefEq(this.g, attrib2.data[0], attrib1.data[0]) ? ((l1, l2) => List.lengthsEqAndForall2(attribExprEq, l1, l2))(attrib1.data[2], attrib2.data[2]) : false) {
        return ((l1_1, l2_1) => List.lengthsEqAndForall2(attribNamedArgEq, l1_1, l2_1))(attrib1.data[3], attrib2.data[3]);
      } else {
        return false;
      }
    };

    const attribsHaveSameTycon = (attrib1_1, attrib2_1) => {
      return tyconRefEq(this.g, attrib2_1.data[0], attrib1_1.data[0]);
    };

    const check = (keptImplAttribsRev, implAttribs_1, sigAttribs_2) => {
      check: while (true) {
        if (implAttribs_1.tail != null) {
          const lookForMatchingAttrib = List.tryRemove(CurriedLambda(attribsEq)(implAttribs_1.head), sigAttribs_2);

          if (lookForMatchingAttrib == null) {
            const existsSimilarAttrib = exists(CurriedLambda(attribsHaveSameTycon)(implAttribs_1.head), sigAttribs_2);

            if (existsSimilarAttrib) {
              warning(new _Error(SR.tcAttribArgsDiffer(implAttribs_1.head.data[0].DisplayName), implAttribs_1.head.data[6]));
              keptImplAttribsRev = keptImplAttribsRev;
              implAttribs_1 = implAttribs_1.tail;
              sigAttribs_2 = sigAttribs_2;
              continue check;
            } else {
              keptImplAttribsRev = new List_1(implAttribs_1.head, keptImplAttribsRev);
              implAttribs_1 = implAttribs_1.tail;
              sigAttribs_2 = sigAttribs_2;
              continue check;
            }
          } else {
            const remainingSigAttribs = getValue(lookForMatchingAttrib)[1];
            keptImplAttribsRev = keptImplAttribsRev;
            implAttribs_1 = implAttribs_1.tail;
            sigAttribs_2 = remainingSigAttribs;
            continue check;
          }
        } else {
          return reverse(keptImplAttribsRev);
        }
      }
    };

    const keptImplAttribs = check(new List_1(), implAttribs, sigAttribs_1);
    fixup(append(sigAttribs_1, keptImplAttribs));
    return true;
  }

  checkTypars(m, aenv, implTypars, sigTypars) {
    if (implTypars.length !== sigTypars.length) {
      errorR(new _Error(SR.typrelSigImplNotCompatibleParamCountsDiffer(), m));
      return false;
    } else {
      const aenv_1 = ((arg00, arg10) => aenv.BindEquivTypars(arg00, arg10))(implTypars, sigTypars);

      return forAll2((implTypar, sigTypar) => {
        var copyOfStruct;
        const m_1 = sigTypar.Range;

        if (!implTypar.StaticReq.Equals(sigTypar.StaticReq)) {
          errorR(new _Error(SR.typrelSigImplNotCompatibleCompileTimeRequirementsDiffer(), m_1));
        }

        implTypar.SetIdent(mkSynId(implTypar.Range, (copyOfStruct = sigTypar.Id, copyOfStruct.idText)));
        implTypar.SetCompilerGenerated(false);

        if (forAll(implTyparCx => {
          var arg00_;

          if (implTyparCx.tag === 1) {
            return true;
          } else if (!exists((arg00_ = this.g, arg30_ => typarConstraintsAEquiv(arg00_, aenv_1, implTyparCx, arg30_)), sigTypar.Constraints)) {
            errorR(new _Error(SR.typrelSigImplNotCompatibleConstraintsDiffer(sigTypar.Name, showL(layoutTyparConstraint(this.denv, implTypar, implTyparCx))), m_1));
            return false;
          } else {
            return true;
          }
        }, implTypar.Constraints) ? forAll(sigTyparCx => {
          if (sigTyparCx.tag === 1) {
            return true;
          } else if (sigTyparCx.tag === 9) {
            return true;
          } else if (sigTyparCx.tag === 10) {
            return true;
          } else if (!exists(implTyparCx_1 => typarConstraintsAEquiv(this.g, aenv_1, implTyparCx_1, sigTyparCx), implTypar.Constraints)) {
            errorR(new _Error(SR.typrelSigImplNotCompatibleConstraintsDifferRemove(sigTypar.Name, showL(layoutTyparConstraint(this.denv, sigTypar, sigTyparCx))), m_1));
            return false;
          } else {
            return true;
          }
        }, sigTypar.Constraints) : false) {
          if (!this.checkingSig) {
            return true;
          } else {
            const implAttribs = implTypar.Attribs;
            const sigAttribs = sigTypar.Attribs;

            const fixup = attribs => {
              implTypar.typar_attribs = attribs;
            };

            return this.checkAttribs(aenv_1, implAttribs, sigAttribs, fixup);
          }
        } else {
          return false;
        }
      }, implTypars, sigTypars);
    }
  }

  checkTypeDef(aenv, implTycon, sigTycon) {
    var arg00__2;
    var implAttribs;
    var sigAttribs;
    var fixup;
    const m = implTycon.Range;
    sigTycon.SetOtherRange([implTycon.Range, true]);
    implTycon.SetOtherRange([sigTycon.Range, false]);

    if (implTycon.LogicalName !== sigTycon.LogicalName) {
      errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleNamesDiffer(toString(implTycon.TypeOrMeasureKind), sigTycon.LogicalName, implTycon.LogicalName), m));
      return false;
    } else if (implTycon.CompiledName !== sigTycon.CompiledName) {
      errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleNamesDiffer(toString(implTycon.TypeOrMeasureKind), sigTycon.CompiledName, implTycon.CompiledName), m));
      return false;
    } else if (((err, aenv_1, implTypeRepr, sigTypeRepr) => this.checkExnInfo(err, aenv_1, implTypeRepr, sigTypeRepr))(f => new ExnconstrNotContained(this.denv, implTycon, sigTycon, f), aenv, implTycon.ExceptionInfo, sigTycon.ExceptionInfo)) {
      const implTypars = implTycon.Typars(m);
      const sigTypars = sigTycon.Typars(m);

      if (implTypars.length !== sigTypars.length) {
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleParameterCountsDiffer(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
        return false;
      } else if (isLessAccessible(implTycon.Accessibility, sigTycon.Accessibility)) {
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleAccessibilityDiffer(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
        return false;
      } else {
        const aenv_2 = ((arg00, arg10) => aenv.BindEquivTypars(arg00, arg10))(implTypars, sigTypars);

        const aintfs = implTycon.ImmediateInterfaceTypesOfFSharpTycon;
        const fintfs = sigTycon.ImmediateInterfaceTypesOfFSharpTycon;
        const aintfsUser = map(tupledArg => p13(tupledArg[0], tupledArg[1], tupledArg[2]), filter(tupledArg_1 => !tupledArg_1[1], implTycon.TypeContents.tcaug_interfaces));

        const flatten = tys => {
          var arg00_;
          var arg00__1;
          var g;
          var amap;
          var allowMultiIntfInst;
          return filter((arg00_ = this.g, arg10_ => isInterfaceTy(arg00_, arg10_)), ListSet.setify((arg00__1 = this.g, (arg10__1, arg20_) => typeEquiv(arg00__1, arg10__1, arg20_)), collect((g = this.g, amap = this.amap, allowMultiIntfInst = new AllowMultiIntfInstantiations(0), ty => AllSuperTypesOfType(g, amap, m, allowMultiIntfInst, ty)), tys)));
        };

        const aintfs_1 = flatten(aintfs);
        const aintfsUser_1 = flatten(aintfsUser);
        const fintfs_1 = flatten(fintfs);
        const unimpl = ListSet.subtract((fity, aity) => typeAEquiv(this.g, aenv_2, aity, fity), fintfs_1, aintfs_1);

        if (forAll(ity => {
          errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleMissingInterface(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, minimalStringOfType(this.denv, ity)), m));
          return false;
        }, unimpl)) {
          const hidden = ListSet.subtract((arg00__2 = this.g, (arg20__1, arg30_) => typeAEquiv(arg00__2, aenv_2, arg20__1, arg30_)), aintfsUser_1, fintfs_1);
          iterate(ity_1 => {
            (implTycon.IsFSharpInterfaceTycon ? exn => {
              error(exn);
            } : exn_1 => {
              warning(exn_1);
            })(new InterfaceNotRevealed(this.denv, ity_1, implTycon.Range));
          }, hidden);
          const aNull = IsUnionTypeWithNullAsTrueValue(this.g, implTycon);
          const fNull = IsUnionTypeWithNullAsTrueValue(this.g, sigTycon);

          if (aNull ? !fNull : false) {
            errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleImplementationSaysNull(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          } else if (fNull ? !aNull : false) {
            errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleSignatureSaysNull(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          }

          const aNull2 = TypeNullIsExtraValue(this.g, m, generalizedTyconRef(mkLocalTyconRef(implTycon)));
          const fNull2 = TypeNullIsExtraValue(this.g, m, generalizedTyconRef(mkLocalTyconRef(implTycon)));

          if (aNull2 ? !fNull2 : false) {
            errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleImplementationSaysNull2(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          } else if (fNull2 ? !aNull2 : false) {
            errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleSignatureSaysNull2(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          }

          const aSealed = isSealedTy(this.g, generalizedTyconRef(mkLocalTyconRef(implTycon)));
          const fSealed = isSealedTy(this.g, generalizedTyconRef(mkLocalTyconRef(sigTycon)));

          if (aSealed ? !fSealed : false) {
            errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleImplementationSealed(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          }

          if (!aSealed ? fSealed : false) {
            errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleImplementationIsNotSealed(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          }

          const aPartial = isAbstractTycon(implTycon);
          const fPartial = isAbstractTycon(sigTycon);

          if (aPartial ? !fPartial : false) {
            errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleImplementationIsAbstract(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          }

          if (!aPartial ? fPartial : false) {
            errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleSignatureIsAbstract(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          }

          if (!typeAEquiv(this.g, aenv_2, superOfTycon(this.g, implTycon), superOfTycon(this.g, sigTycon))) {
            errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleTypesHaveDifferentBaseTypes(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          }

          if (((((m_1, aenv_3, implTypars_1, sigTypars_1) => this.checkTypars(m_1, aenv_3, implTypars_1, sigTypars_1))(m, aenv_2, implTypars, sigTypars) ? ((m_2, aenv_4, implTycon_1, sigTypeRepr_1) => this.checkTypeRepr(m_2, aenv_4, implTycon_1, sigTypeRepr_1))(m, aenv_2, implTycon, sigTycon.TypeReprInfo) : false) ? ((m_3, aenv_5, implTycon_2, sigTycon_1) => this.checkTypeAbbrev(m_3, aenv_5, implTycon_2, sigTycon_1))(m, aenv_2, implTycon, sigTycon) : false) ? (implAttribs = implTycon.Attribs, sigAttribs = sigTycon.Attribs, fixup = attribs => {
            implTycon.entity_attribs = attribs;
          }, this.checkAttribs(aenv_2, implAttribs, sigAttribs, fixup)) : false) {
            return ((m_4, aenv_6, implModRef, signModType) => this.checkModuleOrNamespaceContents(m_4, aenv_6, implModRef, signModType))(implTycon.Range, aenv_2, mkLocalEntityRef(implTycon), sigTycon.ModuleOrNamespaceType);
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  checkValInfo(aenv, err, implVal, sigVal) {
    var predicate;
    const id = implVal.Id;
    const matchValue = [implVal.ValReprInfo, sigVal.ValReprInfo];

    if (matchValue[1] != null) {
      if (matchValue[0] != null) {
        const ntps = getValue(matchValue[0]).data[0].length | 0;
        const mtps = getValue(matchValue[1]).data[0].length | 0;

        if (ntps !== mtps) {
          return err(tupledArg => SR.ValueNotContainedMutabilityGenericParametersDiffer(tupledArg[0], tupledArg[1], tupledArg[2], mtps.toString(), ntps.toString()));
        } else if (!getValue(matchValue[0]).KindsOfTypars.Equals(getValue(matchValue[1]).KindsOfTypars)) {
          return err(tupledArg_1 => SR.ValueNotContainedMutabilityGenericParametersAreDifferentKinds(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]));
        } else if (!(getValue(matchValue[1]).data[1].length <= getValue(matchValue[0]).data[1].length ? forAll2((x, y) => x.length <= y.length, getValue(matchValue[1]).data[1], List.chop(getValue(matchValue[1]).data[1].length, getValue(matchValue[0]).data[1])[0]) : false)) {
          return err(tupledArg_2 => SR.ValueNotContainedMutabilityAritiesDiffer(tupledArg_2[0], tupledArg_2[1], tupledArg_2[2], id.idText, getValue(matchValue[1]).data[1].length.toString(), id.idText, id.idText));
        } else {
          const implArgInfos = List.take(getValue(matchValue[1]).data[1].length, getValue(matchValue[0]).data[1]);
          const implArgInfos_1 = toList(map2((l1, l2) => List.take(l2.length, l1), implArgInfos, getValue(matchValue[1]).data[1]));
          let res;

          if (forAll2((predicate = (implArgInfo, sigArgInfo) => {
            const implAttribs = implArgInfo.Attribs;
            const sigAttribs = sigArgInfo.Attribs;

            const fixup = attribs => {
              var sname;
              var iname;
              const matchValue_1 = [implArgInfo.Name, sigArgInfo.Name];
              const $var1 = matchValue_1[0] != null ? matchValue_1[1] != null ? (sname = getValue(matchValue_1[1]), iname = getValue(matchValue_1[0]), sname.idText !== iname.idText) ? [0, getValue(matchValue_1[0]), getValue(matchValue_1[1])] : [1] : [1] : [1];

              switch ($var1[0]) {
                case 0:
                  warning(new _Error(SR.ArgumentsInSigAndImplMismatch($var1[2].idText, $var1[1].idText), $var1[1].idRange));
                  break;

                case 1:
                  break;
              }

              implArgInfo.Name = sigArgInfo.Name;
              implArgInfo.Attribs = attribs;
            };

            return this.checkAttribs(aenv, implAttribs, sigAttribs, fixup);
          }, (list1, list2) => forAll2(predicate, list1, list2)), implArgInfos_1, getValue(matchValue[1]).data[1])) {
            const implAttribs_1 = getValue(matchValue[0]).data[2].Attribs;
            const sigAttribs_1 = getValue(matchValue[1]).data[2].Attribs;

            const fixup_1 = attribs_1 => {
              getValue(matchValue[0]).data[2].Name = getValue(matchValue[1]).data[2].Name;
              getValue(matchValue[0]).data[2].Attribs = attribs_1;
            };

            res = this.checkAttribs(aenv, implAttribs_1, sigAttribs_1, fixup_1);
          } else {
            res = false;
          }

          implVal.SetValReprInfo(new ValReprInfo(0, [getValue(matchValue[1]).data[0], implArgInfos_1, getValue(matchValue[0]).data[2]]));
          return res;
        }
      } else {
        return err(tupledArg_3 => SR.ValueNotContainedMutabilityArityNotInferred(tupledArg_3[0], tupledArg_3[1], tupledArg_3[2]));
      }
    } else {
      return true;
    }
  }

  checkVal(implModRef, aenv, implVal, sigVal) {
    var inputRecord;
    sigVal.SetOtherRange([implVal.Range, true]);
    implVal.SetOtherRange([sigVal.Range, false]);

    const mk_err = (denv, f) => {
      return new ValueNotContained(denv, implModRef, implVal, sigVal, f);
    };

    const err = (denv_1, f_1) => {
      errorR(mk_err(denv_1, f_1));
      return false;
    };

    const m = implVal.Range;

    if (implVal.IsMutable !== sigVal.IsMutable) {
      return err(this.denv, tupledArg => SR.ValueNotContainedMutabilityAttributesDiffer(tupledArg[0], tupledArg[1], tupledArg[2]));
    } else if (implVal.LogicalName !== sigVal.LogicalName) {
      return err(this.denv, tupledArg_1 => SR.ValueNotContainedMutabilityNamesDiffer(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]));
    } else if (implVal.CompiledName !== sigVal.CompiledName) {
      return err(this.denv, tupledArg_2 => SR.ValueNotContainedMutabilityCompiledNamesDiffer(tupledArg_2[0], tupledArg_2[1], tupledArg_2[2]));
    } else if (implVal.DisplayName !== sigVal.DisplayName) {
      return err(this.denv, tupledArg_3 => SR.ValueNotContainedMutabilityDisplayNamesDiffer(tupledArg_3[0], tupledArg_3[1], tupledArg_3[2]));
    } else if (isLessAccessible(implVal.Accessibility, sigVal.Accessibility)) {
      return err(this.denv, tupledArg_4 => SR.ValueNotContainedMutabilityAccessibilityMore(tupledArg_4[0], tupledArg_4[1], tupledArg_4[2]));
    } else if (implVal.MustInline !== sigVal.MustInline) {
      return err(this.denv, tupledArg_5 => SR.ValueNotContainedMutabilityInlineFlagsDiffer(tupledArg_5[0], tupledArg_5[1], tupledArg_5[2]));
    } else if (!equals(implVal.LiteralValue, sigVal.LiteralValue)) {
      return err(this.denv, tupledArg_6 => SR.ValueNotContainedMutabilityLiteralConstantValuesDiffer(tupledArg_6[0], tupledArg_6[1], tupledArg_6[2]));
    } else if (implVal.IsTypeFunction !== sigVal.IsTypeFunction) {
      return err(this.denv, tupledArg_7 => SR.ValueNotContainedMutabilityOneIsTypeFunction(tupledArg_7[0], tupledArg_7[1], tupledArg_7[2]));
    } else {
      const patternInput = implVal.TypeScheme;
      const patternInput_1 = sigVal.TypeScheme;

      if (patternInput[0].length !== patternInput_1[0].length) {
        return err((inputRecord = this.denv, new DisplayEnv(inputRecord.includeStaticParametersInTypeNames, inputRecord.openTopPathsSorted, inputRecord.openTopPathsRaw, inputRecord.shortTypeNames, inputRecord.suppressNestedTypes, inputRecord.maxMembers, inputRecord.showObsoleteMembers, inputRecord.showHiddenMembers, true, inputRecord.showImperativeTyparAnnotations, inputRecord.suppressInlineKeyword, inputRecord.suppressMutableKeyword, inputRecord.showMemberContainers, inputRecord.shortConstraints, inputRecord.useColonForReturnType, inputRecord.showAttributes, inputRecord.showOverrides, inputRecord.showConstraintTyparAnnotations, inputRecord.abbreviateAdditionalConstraints, inputRecord.showTyparDefaultConstraints, inputRecord.g, inputRecord.contextAccessibility, inputRecord.generatedValueLayout)), tupledArg_8 => SR.ValueNotContainedMutabilityParameterCountsDiffer(tupledArg_8[0], tupledArg_8[1], tupledArg_8[2]));
      } else {
        const aenv_1 = ((arg00, arg10) => aenv.BindEquivTypars(arg00, arg10))(patternInput[0], patternInput_1[0]);

        if (((m_1, aenv_2, implTypars, sigTypars) => this.checkTypars(m_1, aenv_2, implTypars, sigTypars))(m, aenv_1, patternInput[0], patternInput_1[0])) {
          if (!typeAEquiv(this.g, aenv_1, patternInput[1], patternInput_1[1])) {
            return err(this.denv, tupledArg_9 => SR.ValueNotContainedMutabilityTypesDiffer(tupledArg_9[0], tupledArg_9[1], tupledArg_9[2]));
          } else if (!((aenv_3, err_1, implVal_1, sigVal_1) => this.checkValInfo(aenv_3, err_1, implVal_1, sigVal_1))(aenv_1, CurriedLambda(err)(this.denv), implVal, sigVal)) {
            return false;
          } else if (!(implVal.IsExtensionMember === sigVal.IsExtensionMember)) {
            return err(this.denv, tupledArg_10 => SR.ValueNotContainedMutabilityExtensionsDiffer(tupledArg_10[0], tupledArg_10[1], tupledArg_10[2]));
          } else if (!((err_2, tupledArg_11, tupledArg_12) => this.checkMemberDatasConform(err_2, tupledArg_11[0], tupledArg_11[1], tupledArg_11[2], tupledArg_12[0], tupledArg_12[1], tupledArg_12[2]))(CurriedLambda(err)(this.denv), [implVal.Attribs, implVal, implVal.MemberInfo], [sigVal.Attribs, sigVal, sigVal.MemberInfo])) {
            return false;
          } else {
            const implAttribs = implVal.Attribs;
            const sigAttribs = sigVal.Attribs;

            const fixup = attribs => {
              implVal.SetAttribs(attribs);
            };

            return this.checkAttribs(aenv_1, implAttribs, sigAttribs, fixup);
          }
        } else {
          return false;
        }
      }
    }
  }

  checkExnInfo(err, aenv, implTypeRepr, sigTypeRepr) {
    const matchValue = [implTypeRepr, sigTypeRepr];
    const $var2 = matchValue[0].tag === 0 ? matchValue[1].tag === 2 ? [2] : matchValue[1].tag === 0 ? [3, matchValue[0].data, matchValue[1].data] : [6] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [4, matchValue[0].data, matchValue[1].data] : [6] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [5] : [6] : matchValue[1].tag === 2 ? [0] : matchValue[1].tag === 1 ? [1, matchValue[0].data, matchValue[1].data] : [6];

    switch ($var2[0]) {
      case 0:
        errorR(err(tupledArg => SR.ExceptionDefsNotCompatibleHiddenBySignature(tupledArg[0], tupledArg[1])));
        return false;

      case 1:
        if (!equals($var2[1], $var2[2])) {
          errorR(err(tupledArg_1 => SR.ExceptionDefsNotCompatibleDotNetRepresentationsDiffer(tupledArg_1[0], tupledArg_1[1])));
          return false;
        } else {
          return true;
        }

      case 2:
        errorR(err(tupledArg_2 => SR.ExceptionDefsNotCompatibleAbbreviationHiddenBySignature(tupledArg_2[0], tupledArg_2[1])));
        return false;

      case 3:
        if (!tcrefAEquiv(this.g, aenv, $var2[1], $var2[2])) {
          errorR(err(tupledArg_3 => SR.ExceptionDefsNotCompatibleSignaturesDiffer(tupledArg_3[0], tupledArg_3[1])));
          return false;
        } else {
          return true;
        }

      case 4:
        return ((_g, _denv, err_1, aenv_1, implFields, sigFields) => this.checkRecordFieldsForExn(_g, _denv, err_1, aenv_1, implFields, sigFields))(this.g, this.denv, err, aenv, $var2[1], $var2[2]);

      case 5:
        return true;

      case 6:
        errorR(err(tupledArg_4 => SR.ExceptionDefsNotCompatibleExceptionDeclarationsDiffer(tupledArg_4[0], tupledArg_4[1])));
        return false;
    }
  }

  checkUnionCase(aenv, implUnionCase, sigUnionCase) {
    const err = f => {
      errorR(new ConstrNotContained(this.denv, implUnionCase, sigUnionCase, f));
      return false;
    };

    sigUnionCase.OtherRangeOpt = [implUnionCase.Range, true];
    implUnionCase.OtherRangeOpt = [sigUnionCase.Range, false];

    if (implUnionCase.Id.idText !== sigUnionCase.Id.idText) {
      return err(tupledArg => SR.ModuleContainsConstructorButNamesDiffer(tupledArg[0], tupledArg[1]));
    } else if (implUnionCase.RecdFields.length !== sigUnionCase.RecdFields.length) {
      return err(tupledArg_1 => SR.ModuleContainsConstructorButDataFieldsDiffer(tupledArg_1[0], tupledArg_1[1]));
    } else if (!forAll2(CurriedLambda((aenv_1, implField, sigField) => this.checkField(aenv_1, implField, sigField))(aenv), implUnionCase.RecdFields, sigUnionCase.RecdFields)) {
      return err(tupledArg_2 => SR.ModuleContainsConstructorButTypesOfFieldsDiffer(tupledArg_2[0], tupledArg_2[1]));
    } else if (isLessAccessible(implUnionCase.Accessibility, sigUnionCase.Accessibility)) {
      return err(tupledArg_3 => SR.ModuleContainsConstructorButAccessibilityDiffers(tupledArg_3[0], tupledArg_3[1]));
    } else {
      const implAttribs = implUnionCase.Attribs;
      const sigAttribs = sigUnionCase.Attribs;

      const fixup = attribs => {
        implUnionCase.Attribs = attribs;
      };

      return this.checkAttribs(aenv, implAttribs, sigAttribs, fixup);
    }
  }

  checkField(aenv, implField, sigField) {
    var implAttribs;
    var sigAttribs;
    var fixup;

    const err = f => {
      errorR(new FieldNotContained(this.denv, implField, sigField, f));
      return false;
    };

    sigField.rfield_other_range = [implField.Range, true];
    implField.rfield_other_range = [sigField.Range, false];

    if (implField.rfield_id.idText !== sigField.rfield_id.idText) {
      return err(tupledArg => SR.FieldNotContainedNamesDiffer(tupledArg[0], tupledArg[1]));
    } else if (isLessAccessible(implField.Accessibility, sigField.Accessibility)) {
      return err(tupledArg_1 => SR.FieldNotContainedAccessibilitiesDiffer(tupledArg_1[0], tupledArg_1[1]));
    } else if (implField.IsStatic !== sigField.IsStatic) {
      return err(tupledArg_2 => SR.FieldNotContainedStaticsDiffer(tupledArg_2[0], tupledArg_2[1]));
    } else if (implField.IsMutable !== sigField.IsMutable) {
      return err(tupledArg_3 => SR.FieldNotContainedMutablesDiffer(tupledArg_3[0], tupledArg_3[1]));
    } else if (!equals(implField.LiteralValue, sigField.LiteralValue)) {
      return err(tupledArg_4 => SR.FieldNotContainedLiteralsDiffer(tupledArg_4[0], tupledArg_4[1]));
    } else if (!typeAEquiv(this.g, aenv, implField.FormalType, sigField.FormalType)) {
      return err(tupledArg_5 => SR.FieldNotContainedTypesDiffer(tupledArg_5[0], tupledArg_5[1]));
    } else if (implAttribs = implField.FieldAttribs, sigAttribs = sigField.FieldAttribs, fixup = attribs => {
      implField.rfield_fattribs = attribs;
    }, this.checkAttribs(aenv, implAttribs, sigAttribs, fixup)) {
      const implAttribs_1 = implField.PropertyAttribs;
      const sigAttribs_1 = sigField.PropertyAttribs;

      const fixup_1 = attribs_1 => {
        implField.rfield_pattribs = attribs_1;
      };

      return this.checkAttribs(aenv, implAttribs_1, sigAttribs_1, fixup_1);
    } else {
      return false;
    }
  }

  checkMemberDatasConform(err, _implAttrs, implVal, implMemberInfo, _sigAttrs, sigVal, sigMemberInfo) {
    const matchValue = [implMemberInfo, sigMemberInfo];
    const $var3 = matchValue[0] != null ? matchValue[1] != null ? [1, getValue(matchValue[0]), getValue(matchValue[1])] : [2] : matchValue[1] == null ? [0] : [2];

    switch ($var3[0]) {
      case 0:
        return true;

      case 1:
        if (!(implVal.CompiledName === sigVal.CompiledName)) {
          return err(tupledArg => SR.ValueNotContainedMutabilityDotNetNamesDiffer(tupledArg[0], tupledArg[1], tupledArg[2]));
        } else if (!($var3[1].MemberFlags.IsInstance === $var3[2].MemberFlags.IsInstance)) {
          return err(tupledArg_1 => SR.ValueNotContainedMutabilityStaticsDiffer(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]));
        } else if (false) {
          return err(tupledArg_2 => SR.ValueNotContainedMutabilityVirtualsDiffer(tupledArg_2[0], tupledArg_2[1], tupledArg_2[2]));
        } else if (!($var3[1].MemberFlags.IsDispatchSlot === $var3[2].MemberFlags.IsDispatchSlot)) {
          return err(tupledArg_3 => SR.ValueNotContainedMutabilityAbstractsDiffer(tupledArg_3[0], tupledArg_3[1], tupledArg_3[2]));
        } else if (!$var3[1].MemberFlags.IsFinal ? $var3[2].MemberFlags.IsFinal : false) {
          return err(tupledArg_4 => SR.ValueNotContainedMutabilityFinalsDiffer(tupledArg_4[0], tupledArg_4[1], tupledArg_4[2]));
        } else if (!($var3[1].MemberFlags.IsOverrideOrExplicitImpl === $var3[2].MemberFlags.IsOverrideOrExplicitImpl)) {
          return err(tupledArg_5 => SR.ValueNotContainedMutabilityOverridesDiffer(tupledArg_5[0], tupledArg_5[1], tupledArg_5[2]));
        } else if (!$var3[1].MemberFlags.MemberKind.Equals($var3[2].MemberFlags.MemberKind)) {
          return err(tupledArg_6 => SR.ValueNotContainedMutabilityOneIsConstructor(tupledArg_6[0], tupledArg_6[1], tupledArg_6[2]));
        } else {
          const finstance = ValSpecIsCompiledAsInstance(this.g, sigVal);
          const ainstance = ValSpecIsCompiledAsInstance(this.g, implVal);

          if (finstance ? !ainstance : false) {
            return err(tupledArg_7 => SR.ValueNotContainedMutabilityStaticButInstance(tupledArg_7[0], tupledArg_7[1], tupledArg_7[2]));
          } else if (!finstance ? ainstance : false) {
            return err(tupledArg_8 => SR.ValueNotContainedMutabilityInstanceButStatic(tupledArg_8[0], tupledArg_8[1], tupledArg_8[2]));
          } else {
            return true;
          }
        }

      case 2:
        return false;
    }
  }

  checkRecordFields(m, aenv, implTycon, implFields, sigFields) {
    const implFields_1 = implFields.TrueFieldsAsList;
    const sigFields_1 = sigFields.TrueFieldsAsList;
    const m1 = NameMapModule.ofKeyedList(rfld => rfld.Name, implFields_1);
    const m2 = NameMapModule.ofKeyedList(rfld_1 => rfld_1.Name, sigFields_1);

    if (NameMapModule.suball2((fieldName, _arg3) => {
      errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleFieldRequiredButNotSpecified(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, fieldName), m));
      return false;
    }, CurriedLambda((aenv_1, implField, sigField) => this.checkField(aenv_1, implField, sigField))(aenv), m1, m2) ? NameMapModule.suball2((fieldName_1, _arg4) => {
      errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleFieldWasPresent(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, fieldName_1), m));
      return false;
    }, (x, y) => ((aenv_2, implField_1, sigField_1) => this.checkField(aenv_2, implField_1, sigField_1))(aenv, y, x), m2, m1) : false) {
      if (forAll2(CurriedLambda((aenv_3, implField_2, sigField_2) => this.checkField(aenv_3, implField_2, sigField_2))(aenv), implFields_1, sigFields_1)) {
        return true;
      } else {
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleFieldOrderDiffer(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
        return false;
      }
    } else {
      return false;
    }
  }

  checkRecordFieldsForExn(_g, _denv, err, aenv, implFields, sigFields) {
    const implFields_1 = implFields.TrueFieldsAsList;
    const sigFields_1 = sigFields.TrueFieldsAsList;
    const m1 = NameMapModule.ofKeyedList(rfld => rfld.Name, implFields_1);
    const m2 = NameMapModule.ofKeyedList(rfld_1 => rfld_1.Name, sigFields_1);

    if (NameMapModule.suball2((s, _arg5) => {
      errorR(err(tupledArg => SR.ExceptionDefsNotCompatibleFieldInSigButNotImpl(s, tupledArg[0], tupledArg[1])));
      return false;
    }, CurriedLambda((aenv_1, implField, sigField) => this.checkField(aenv_1, implField, sigField))(aenv), m1, m2) ? NameMapModule.suball2((s_1, _arg6) => {
      errorR(err(tupledArg_1 => SR.ExceptionDefsNotCompatibleFieldInImplButNotSig(s_1, tupledArg_1[0], tupledArg_1[1])));
      return false;
    }, (x, y) => ((aenv_2, implField_1, sigField_1) => this.checkField(aenv_2, implField_1, sigField_1))(aenv, y, x), m2, m1) : false) {
      if (forAll2(CurriedLambda((aenv_3, implField_2, sigField_2) => this.checkField(aenv_3, implField_2, sigField_2))(aenv), implFields_1, sigFields_1)) {
        return true;
      } else {
        errorR(err(tupledArg_2 => SR.ExceptionDefsNotCompatibleFieldOrderDiffers(tupledArg_2[0], tupledArg_2[1])));
        return false;
      }
    } else {
      return false;
    }
  }

  checkVirtualSlots(denv, m, implTycon, implAbstractSlots, sigAbstractSlots) {
    const m1 = NameMapModule.ofKeyedList(v => v.DisplayName, implAbstractSlots);
    const m2 = NameMapModule.ofKeyedList(v_1 => v_1.DisplayName, sigAbstractSlots);

    if (NameMapModule.suball2((_s, vref) => {
      errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleAbstractMemberMissingInImpl(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, stringValOrMember(denv, vref.Deref)), m));
      return false;
    }, (_x, _y) => true, m1, m2)) {
      return NameMapModule.suball2((_s_1, vref_1) => {
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleAbstractMemberMissingInSig(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, stringValOrMember(denv, vref_1.Deref)), m));
        return false;
      }, (_x_1, _y_1) => true, m2, m1);
    } else {
      return false;
    }
  }

  checkClassFields(isStruct, m, aenv, implTycon, implFields, sigFields) {
    const implFields_1 = implFields.TrueFieldsAsList;
    const sigFields_1 = sigFields.TrueFieldsAsList;
    const m1 = NameMapModule.ofKeyedList(rfld => rfld.Name, implFields_1);
    const m2 = NameMapModule.ofKeyedList(rfld_1 => rfld_1.Name, sigFields_1);

    if (NameMapModule.suball2((fieldName, _arg7) => {
      errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleFieldRequiredButNotSpecified(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, fieldName), m));
      return false;
    }, CurriedLambda((aenv_1, implField, sigField) => this.checkField(aenv_1, implField, sigField))(aenv), m1, m2)) {
      if (isStruct) {
        return NameMapModule.suball2((fieldName_1, _arg8) => {
          warning(new _Error(SR.DefinitionsInSigAndImplNotCompatibleFieldIsInImplButNotSig(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, fieldName_1), m));
          return true;
        }, (x, y) => ((aenv_2, implField_1, sigField_1) => this.checkField(aenv_2, implField_1, sigField_1))(aenv, y, x), m2, m1);
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  checkTypeRepr(m, aenv, implTycon, sigTypeRepr) {
    const reportNiceError = (k, s1, s2) => {
      const aset = NameSetModule.ofList(s1);
      const fset = NameSetModule.ofList(s2);
      const matchValue = ZsetModule.elements(ZsetModule.diff(aset, fset));

      if (matchValue.tail == null) {
        const matchValue_1 = ZsetModule.elements(ZsetModule.diff(fset, aset));

        if (matchValue_1.tail == null) {
          errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleNumbersDiffer(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, k), m));
          return false;
        } else {
          errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleSignatureDefinesButImplDoesNot(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, k, join(";", matchValue_1)), m));
          return false;
        }
      } else {
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleImplDefinesButSignatureDoesNot(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, k, join(";", matchValue)), m));
        return false;
      }
    };

    const matchValue_2 = [implTycon.TypeReprInfo, sigTypeRepr];
    const $var4 = matchValue_2[0].tag === 2 ? matchValue_2[1].tag === 6 ? [0] : matchValue_2[1].tag === 2 ? [4, matchValue_2[0].data, matchValue_2[1].data] : [11] : matchValue_2[0].tag === 3 ? matchValue_2[1].tag === 6 ? [0] : [11] : matchValue_2[0].tag === 0 ? matchValue_2[1].tag === 6 ? [1, matchValue_2[0].data] : matchValue_2[1].tag === 0 ? [6, matchValue_2[0].data, matchValue_2[1].data] : [11] : matchValue_2[0].tag === 4 ? matchValue_2[1].tag === 6 ? [2] : matchValue_2[1].tag === 4 ? [7, matchValue_2[0].data, matchValue_2[1].data] : [11] : matchValue_2[0].tag === 5 ? matchValue_2[1].tag === 6 ? [3] : matchValue_2[1].tag === 5 ? [8, matchValue_2[0].data, matchValue_2[1].data] : [11] : matchValue_2[0].tag === 6 ? matchValue_2[1].tag === 6 ? [9] : [10] : matchValue_2[1].tag === 6 ? [0] : matchValue_2[1].tag === 1 ? [5, matchValue_2[0].data, matchValue_2[1].data] : [11];

    switch ($var4[0]) {
      case 0:
        return true;

      case 1:
        const $var5 = $var4[1].fsobjmodel_kind.tag === 2 ? [0] : $var4[1].fsobjmodel_kind.tag === 4 ? [0] : [1];

        switch ($var5[0]) {
          case 0:
            errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleImplDefinesStruct(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
            return false;

          case 1:
            return true;
        }

      case 2:
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleDotNetTypeRepresentationIsHidden(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
        return false;

      case 3:
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleTypeIsHidden(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
        return false;

      case 4:
        const ucases1 = $var4[1].UnionCasesAsList;
        const ucases2 = $var4[2].UnionCasesAsList;

        if (ucases1.length !== ucases2.length) {
          const names = l => {
            return map(c => c.Id.idText, l);
          };

          return reportNiceError("union case", names(ucases1), names(ucases2));
        } else {
          return forAll2(CurriedLambda((aenv_1, implUnionCase, sigUnionCase) => this.checkUnionCase(aenv_1, implUnionCase, sigUnionCase))(aenv), ucases1, ucases2);
        }

      case 5:
        return ((m_1, aenv_2, implTycon_1, implFields, sigFields) => this.checkRecordFields(m_1, aenv_2, implTycon_1, implFields, sigFields))(m, aenv, implTycon, $var4[1], $var4[2]);

      case 6:
        if (!(() => {
          var p;
          const matchValue_3 = [$var4[1].fsobjmodel_kind, $var4[2].fsobjmodel_kind];
          const $var6 = matchValue_3[0].tag === 1 ? matchValue_3[1].tag === 1 ? [1] : [5] : matchValue_3[0].tag === 2 ? matchValue_3[1].tag === 2 ? [2] : [5] : matchValue_3[0].tag === 4 ? matchValue_3[1].tag === 4 ? [3] : [5] : matchValue_3[0].tag === 3 ? matchValue_3[1].tag === 3 ? [4, matchValue_3[0].data.data[2], matchValue_3[1].data.data[2], matchValue_3[0].data.data[3], matchValue_3[1].data.data[3], matchValue_3[0].data.data[4], matchValue_3[1].data.data[4], matchValue_3[0].data.data[5], matchValue_3[1].data.data[5], matchValue_3[0].data.data[1], matchValue_3[1].data.data[1]] : [5] : matchValue_3[1].tag === 0 ? [0] : [5];

          switch ($var6[0]) {
            case 0:
              return true;

            case 1:
              return true;

            case 2:
              return true;

            case 3:
              return true;

            case 4:
              if (typeAEquiv(this.g, aenv, $var6[9], $var6[10]) ? $var6[1].length === $var6[2].length : false) {
                const aenv_3 = ((arg00, arg10) => aenv.BindEquivTypars(arg00, arg10))($var6[1], $var6[2]);

                if (typarsAEquiv(this.g, aenv_3, $var6[1], $var6[2]) ? $var6[3].length === $var6[4].length : false) {
                  const aenv_4 = ((arg00_1, arg10_1) => aenv_3.BindEquivTypars(arg00_1, arg10_1))($var6[3], $var6[4]);

                  if (typarsAEquiv(this.g, aenv_4, $var6[3], $var6[4]) ? List.lengthsEqAndForall2((p = (p1, p2) => typeAEquiv(this.g, aenv_4, p1.Type, p2.Type), (l1, l2) => List.lengthsEqAndForall2(p, l1, l2)), $var6[5], $var6[6]) : false) {
                    return returnTypesAEquiv(this.g, aenv_4, $var6[7], $var6[8]);
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }

            case 5:
              return false;
          }
        })()) {
          errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleTypeIsDifferentKind(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          return false;
        } else {
          const isStruct = $var4[1].fsobjmodel_kind.tag === 2 ? true : false;

          if (((isStruct_1, m_2, aenv_5, implTycon_2, implFields_1, sigFields_1) => this.checkClassFields(isStruct_1, m_2, aenv_5, implTycon_2, implFields_1, sigFields_1))(isStruct, m, aenv, implTycon, $var4[1].fsobjmodel_rfields, $var4[2].fsobjmodel_rfields)) {
            return ((denv, m_3, implTycon_3, implAbstractSlots, sigAbstractSlots) => this.checkVirtualSlots(denv, m_3, implTycon_3, implAbstractSlots, sigAbstractSlots))(this.denv, m, implTycon, $var4[1].fsobjmodel_vslots, $var4[2].fsobjmodel_vslots);
          } else {
            return false;
          }
        }

      case 7:
        if (!$var4[1].Equals($var4[2])) {
          errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleILDiffer(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          return false;
        } else {
          return true;
        }

      case 8:
        if (typeAEquiv(this.g, aenv, $var4[1], $var4[2])) {
          return true;
        } else {
          errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleRepresentationsDiffer(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          return false;
        }

      case 9:
        return true;

      case 10:
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleRepresentationsDiffer(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
        return false;

      case 11:
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleRepresentationsDiffer(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
        return false;
    }
  }

  checkTypeAbbrev(m, aenv, implTycon, sigTycon) {
    const kind1 = implTycon.TypeOrMeasureKind;
    const kind2 = sigTycon.TypeOrMeasureKind;

    if (!kind1.Equals(kind2)) {
      errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleSignatureDeclaresDiffer(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, toString(kind2), toString(kind1)), m));
      return false;
    } else {
      const matchValue = [implTycon.TypeAbbrev, sigTycon.TypeAbbrev];

      if (matchValue[0] == null) {
        if (matchValue[1] != null) {
          errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleSigHasAbbreviation(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
          return false;
        } else {
          return true;
        }
      } else if (matchValue[1] == null) {
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleAbbreviationHiddenBySig(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName), m));
        return false;
      } else if (!typeAEquiv(this.g, aenv, getValue(matchValue[0]), getValue(matchValue[1]))) {
        const patternInput = minimalStringsOfTwoTypes(this.denv, getValue(matchValue[0]), getValue(matchValue[1]));
        errorR(new _Error(SR.DefinitionsInSigAndImplNotCompatibleAbbreviationsDiffer(toString(implTycon.TypeOrMeasureKind), implTycon.DisplayName, patternInput[0], patternInput[1]), m));
        return false;
      } else {
        return true;
      }
    }
  }

  checkModuleOrNamespaceContents(m, aenv, implModRef, signModType) {
    const implModType = implModRef.ModuleOrNamespaceType;

    if (!implModType.ModuleOrNamespaceKind.Equals(signModType.ModuleOrNamespaceKind)) {
      errorR(new _Error(SR.typrelModuleNamespaceAttributesDifferInSigAndImpl(), m));
    }

    if (NameMapModule.suball2((s, _fx) => {
      errorR(new RequiredButNotSpecified(this.denv, implModRef, "type", os => {
        var clo1;
        (clo1 = Microsoft.FSharp.Core.Printf.bprintf(os), CurriedLambda(arg10 => CurriedLambda(clo1)(arg10)))(printf("%s"), s);
      }, m));
      return false;
    }, CurriedLambda((aenv_1, implTycon, sigTycon) => this.checkTypeDef(aenv_1, implTycon, sigTycon))(aenv), implModType.TypesByMangledName, signModType.TypesByMangledName) ? NameMapModule.suball2((s_1, fx) => {
      errorR(new RequiredButNotSpecified(this.denv, implModRef, fx.IsModule ? "module" : "namespace", os_1 => {
        var clo1_1;
        (clo1_1 = Microsoft.FSharp.Core.Printf.bprintf(os_1), CurriedLambda(arg10_1 => CurriedLambda(clo1_1)(arg10_1)))(printf("%s"), s_1);
      }, m));
      return false;
    }, (x1, x2) => ((aenv_2, implModRef_1, sigModRef) => this.checkModuleOrNamespace(aenv_2, implModRef_1, sigModRef))(aenv, mkLocalModRef(x1), x2), implModType.ModulesAndNamespacesByDemangledName, signModType.ModulesAndNamespacesByDemangledName) : false) {
      const sigValHadNoMatchingImplementation = (fx_1, _closeActualVal) => {
        errorR(new RequiredButNotSpecified(this.denv, implModRef, "value", os_2 => {
          var clo1_2;

          if (fx_1.IsMember) {
            outputQualifiedValOrMember(this.denv, os_2, fx_1);
          } else {
            (clo1_2 = Microsoft.FSharp.Core.Printf.bprintf(os_2), CurriedLambda(arg10_2 => CurriedLambda(clo1_2)(arg10_2)))(printf("%s"), fx_1.DisplayName);
          }
        }, m));
      };

      const valuesPartiallyMatch = (av, fv) => {
        if (equals(av.LinkagePartialKey.MemberParentMangledName, fv.LinkagePartialKey.MemberParentMangledName) ? av.LinkagePartialKey.LogicalName === fv.LinkagePartialKey.LogicalName : false) {
          return av.LinkagePartialKey.TotalArgCount === fv.LinkagePartialKey.TotalArgCount;
        } else {
          return false;
        }
      };

      return NameMapModule.suball2((_s, fxs) => {
        sigValHadNoMatchingImplementation(fxs.head, null);
        return false;
      }, (avs, fvs) => {
        const matchValue = [avs, fvs];
        const $var7 = matchValue[0].tail != null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[0].tail.tail == null ? [1, matchValue[0].head, matchValue[1].head] : [2] : [2] : [0] : [0];

        switch ($var7[0]) {
          case 0:
            throw new Error("unreachable");

          case 1:
            if (valuesPartiallyMatch($var7[1], $var7[2])) {
              return ((implModRef_2, aenv_3, implVal, sigVal) => this.checkVal(implModRef_2, aenv_3, implVal, sigVal))(implModRef, aenv, $var7[1], $var7[2]);
            } else {
              sigValHadNoMatchingImplementation($var7[2], null);
              return false;
            }

          case 2:
            const matchingPairs = choose(fv_1 => {
              const matchValue_1 = tryFind(av_1 => {
                const res = valLinkageAEquiv(this.g, aenv, av_1, fv_1);
                return res;
              }, avs);

              if (matchValue_1 != null) {
                return [fv_1, getValue(matchValue_1)];
              } else {
                return null;
              }
            }, fvs);
            const allPairsOk = forAll(x => x, map(tupledArg => ((implModRef_3, aenv_4, implVal_1, sigVal_1) => this.checkVal(implModRef_3, aenv_4, implVal_1, sigVal_1))(implModRef, aenv, tupledArg[1], tupledArg[0]), matchingPairs));
            const someNotOk = matchingPairs.length < fvs.length;

            if (someNotOk) {
              const patternInput = List.splitChoose(fv_2 => {
                const matchValue_2 = tryFind(av_2 => valuesPartiallyMatch(av_2, fv_2), avs);

                if (matchValue_2 != null) {
                  return new Choice(1, [fv_2, getValue(matchValue_2)]);
                } else {
                  return new Choice(0, fv_2);
                }
              }, fvs);

              for (let forLoopVar of patternInput[1]) {
                ((implModRef_4, aenv_5, implVal_2, sigVal_2) => this.checkVal(implModRef_4, aenv_5, implVal_2, sigVal_2))(implModRef, aenv, forLoopVar[1], forLoopVar[0]);
              }

              for (let fv_3 of patternInput[0]) {
                sigValHadNoMatchingImplementation(fv_3, null);
              }
            }

            if (allPairsOk) {
              return !someNotOk;
            } else {
              return false;
            }

        }
      }, implModType.AllValsAndMembersByLogicalNameUncached, signModType.AllValsAndMembersByLogicalNameUncached);
    } else {
      return false;
    }
  }

  checkModuleOrNamespace(aenv, implModRef, sigModRef) {
    sigModRef.SetOtherRange([implModRef.Range, true]);
    implModRef.Deref.SetOtherRange([sigModRef.Range, false]);

    if (((m, aenv_1, implModRef_1, signModType) => this.checkModuleOrNamespaceContents(m, aenv_1, implModRef_1, signModType))(implModRef.Range, aenv, implModRef, sigModRef.ModuleOrNamespaceType)) {
      const implAttribs = implModRef.Attribs;
      const sigAttribs = sigModRef.Attribs;
      let fixup;
      const objectArg = implModRef.Deref;

      fixup = arg00 => {
        objectArg.SetAttribs(arg00);
      };

      return this.checkAttribs(aenv, implAttribs, sigAttribs, fixup);
    } else {
      return false;
    }
  }

}
setType("Microsoft.FSharp.Compiler.SignatureConformance.Checker", Checker);
export function CheckNamesOfModuleOrNamespaceContents(denv, implModRef, signModType) {
  const m = implModRef.Range;
  const implModType = implModRef.ModuleOrNamespaceType;

  if (NameMapModule.suball2(function (s, _fx) {
    errorR(new RequiredButNotSpecified(denv, implModRef, "type", function (os) {
      var clo1;
      (clo1 = Microsoft.FSharp.Core.Printf.bprintf(os), CurriedLambda(function (arg10) {
        return CurriedLambda(clo1)(arg10);
      }))(printf("%s"), s);
    }, m));
    return false;
  }, function (_arg10, _arg9) {
    return true;
  }, implModType.TypesByMangledName, signModType.TypesByMangledName) ? NameMapModule.suball2(function (s_1, fx) {
    errorR(new RequiredButNotSpecified(denv, implModRef, fx.IsModule ? "module" : "namespace", function (os_1) {
      var clo1_1;
      (clo1_1 = Microsoft.FSharp.Core.Printf.bprintf(os_1), CurriedLambda(function (arg10_1) {
        return CurriedLambda(clo1_1)(arg10_1);
      }))(printf("%s"), s_1);
    }, m));
    return false;
  }, function (x1, x2) {
    return CheckNamesOfModuleOrNamespace(denv, mkLocalModRef(x1), x2.ModuleOrNamespaceType);
  }, implModType.ModulesAndNamespacesByDemangledName, signModType.ModulesAndNamespacesByDemangledName) : false) {
    return NameMapModule.suball2(function (_s, fxs) {
      const fx_1 = fxs.head;
      errorR(new RequiredButNotSpecified(denv, implModRef, "value", function (os_2) {
        var clo1_2;

        if (fx_1.MemberInfo != null) {
          outputQualifiedValOrMember(denv, os_2, fx_1);
        } else {
          (clo1_2 = Microsoft.FSharp.Core.Printf.bprintf(os_2), CurriedLambda(function (arg10_2) {
            return CurriedLambda(clo1_2)(arg10_2);
          }))(printf("%s"), fx_1.DisplayName);
        }
      }, m));
      return false;
    }, function (_arg12, _arg11) {
      return true;
    }, implModType.AllValsAndMembersByLogicalNameUncached, signModType.AllValsAndMembersByLogicalNameUncached);
  } else {
    return false;
  }
}
export function CheckNamesOfModuleOrNamespace(denv, implModRef, signModType) {
  return CheckNamesOfModuleOrNamespaceContents(denv, implModRef, signModType);
}