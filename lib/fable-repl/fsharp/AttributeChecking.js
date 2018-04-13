import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { range } from "./range";
import { equalsRecords } from "../fable-core/Util";
import { zip, singleton, collect, toList, map, delay } from "../fable-core/Seq";
import { makeSome, defaultArg, getValue } from "../fable-core/Option";
import { isAnyTupleTy, HasFSharpAttribute, $7C$ExtractAttribNamedArg$7C$_$7C$ as _ExtractAttribNamedArg___, $7C$AttribInt32Arg$7C$_$7C$ as _AttribInt32Arg___, $7C$AttribBoolArg$7C$_$7C$ as _AttribBoolArg___, $7C$AttribStringArg$7C$_$7C$ as _AttribStringArg___, TryDecodeILAttribute, TryFindFSharpAttribute, metadataOfTycon, tyOfExpr, tcrefOfAppTy, $7C$TypeOfExpr$7C$_$7C$ as _TypeOfExpr___ } from "./TastOps";
import { TcGlobals } from "./TcGlobals";
import { Attrib } from "./tast";
import { ImportMap } from "./import";
import { decodeILAttribData, ILAttribute, ILScopeRef } from "../absil/il";
import { ImportILType } from "./infos";
import { map as map_1 } from "../fable-core/List";
import List from "../fable-core/List";
import { Error as _Error, CommitOperationResult, PossibleUnverifiableCode, Experimental, UserCompilerMessage, op_PlusPlus, CompleteD, ErrorD, WarnD } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
export class ObsoleteWarning extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, ObsoleteWarning.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AttributeChecking.ObsoleteWarning",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.AttributeChecking.ObsoleteWarning", ObsoleteWarning);
export class ObsoleteError extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, ObsoleteError.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AttributeChecking.ObsoleteError",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.AttributeChecking.ObsoleteError", ObsoleteError);
export function fail() {
  throw new Error("This custom attribute has an argument that can not yet be converted using this API");
}

function evalILAttribElem(e) {
  if (e.tag === 1) {
    return e.data;
  } else if (e.tag === 2) {
    return e.data;
  } else if (e.tag === 3) {
    return e.data;
  } else if (e.tag === 4) {
    return e.data;
  } else if (e.tag === 5) {
    return e.data;
  } else if (e.tag === 6) {
    return e.data;
  } else if (e.tag === 7) {
    return e.data;
  } else if (e.tag === 8) {
    return e.data;
  } else if (e.tag === 9) {
    return e.data;
  } else if (e.tag === 10) {
    return e.data;
  } else if (e.tag === 11) {
    return e.data;
  } else if (e.tag === 12) {
    return e.data;
  } else if (e.tag === 13) {
    return null;
  } else if (e.tag === 16) {
    return Array.from(delay(function () {
      return map(function (i) {
        return evalILAttribElem(i);
      }, e.data[1]);
    }));
  } else if (e.tag === 14) {
    if (e.data == null) {
      return null;
    } else {
      return fail();
    }
  } else if (e.tag === 15) {
    if (e.data == null) {
      return null;
    } else {
      return fail();
    }
  } else if (e.data == null) {
    return null;
  } else {
    return getValue(e.data);
  }
}

function evalFSharpAttribArg(g, e) {
  let $var1;

  if (e.tag === 0) {
    $var1 = [0, e.data[0]];
  } else if (e.tag === 11) {
    if (e.data[0].tag === 3) {
      $var1 = [1, e.data[2]];
    } else {
      const activePatternResult32183 = function (arg10_) {
        return _TypeOfExpr___(g, arg10_);
      }(e);

      if (activePatternResult32183 != null) {
        $var1 = [2, getValue(activePatternResult32183)];
      } else {
        $var1 = [3];
      }
    }
  } else {
    const activePatternResult32184 = function (arg10__1) {
      return _TypeOfExpr___(g, arg10__1);
    }(e);

    if (activePatternResult32184 != null) {
      $var1 = [2, getValue(activePatternResult32184)];
    } else {
      $var1 = [3];
    }
  }

  switch ($var1[0]) {
    case 0:
      switch ($var1[1].tag) {
        case 0:
          return $var1[1].data;

        case 1:
          return $var1[1].data;

        case 3:
          return $var1[1].data;

        case 5:
          return $var1[1].data;

        case 7:
          return $var1[1].data;

        case 2:
          return $var1[1].data;

        case 4:
          return $var1[1].data;

        case 6:
          return $var1[1].data;

        case 8:
          return $var1[1].data;

        case 11:
          return $var1[1].data;

        case 12:
          return $var1[1].data;

        case 13:
          return $var1[1].data;

        case 17:
          return null;

        case 14:
          return $var1[1].data;

        default:
          return fail();
      }

    case 1:
      return Array.from(delay(function () {
        return map(function (i) {
          return evalFSharpAttribArg(g, i);
        }, $var1[1]);
      }));

    case 2:
      return $var1[1];

    case 3:
      return fail();
  }
}

export class AttribInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AttributeChecking.AttribInfo",
      interfaces: ["FSharpUnion"],
      cases: [["FSAttribInfo", TcGlobals, Attrib], ["ILAttribInfo", TcGlobals, ImportMap, ILScopeRef, ILAttribute, range]]
    };
  }

  get TyconRef() {
    if (this.tag === 1) {
      const ty = ImportILType(this.data[2], this.data[1], this.data[4], new List(), this.data[3].Method.DeclaringType);
      return tcrefOfAppTy(this.data[0], ty);
    } else {
      const tcref = this.data[1].data[0];
      return tcref;
    }
  }

  get ConstructorArguments() {
    if (this.tag === 1) {
      const patternInput = decodeILAttribData(this.data[0].ilg, this.data[3]);
      return toList(delay(() => collect(matchValue => {
        var ty;
        var obj;
        return singleton((ty = ImportILType(this.data[2], this.data[1], this.data[4], new List(), matchValue[0]), obj = evalILAttribElem(matchValue[1]), [ty, obj]));
      }, zip(this.data[3].Method.FormalArgTypes, patternInput[0]))));
    } else {
      const unnamedArgs = this.data[1].data[2];
      return map_1(_arg1 => {
        const ty_1 = tyOfExpr(this.data[0], _arg1.data[0]);
        const obj_1 = evalFSharpAttribArg(this.data[0], _arg1.data[1]);
        return [ty_1, obj_1];
      }, unnamedArgs);
    }
  }

  get NamedArguments() {
    if (this.tag === 1) {
      const patternInput = decodeILAttribData(this.data[0].ilg, this.data[3]);
      return toList(delay(() => collect(matchValue => {
        var ty;
        var obj;
        var isField;
        return singleton((ty = ImportILType(this.data[2], this.data[1], this.data[4], new List(), matchValue[1]), obj = evalILAttribElem(matchValue[3]), isField = !matchValue[2], [ty, matchValue[0], isField, obj]));
      }, patternInput[1])));
    } else {
      const namedArgs = this.data[1].data[3];
      return map_1(_arg2 => {
        const origExpr = _arg2.data[3].data[0];
        const nm = _arg2.data[0];
        const isField_1 = _arg2.data[2];
        const evaluatedExpr = _arg2.data[3].data[1];
        const ty_1 = tyOfExpr(this.data[0], origExpr);
        const obj_1 = evalFSharpAttribArg(this.data[0], evaluatedExpr);
        return [ty_1, nm, isField_1, obj_1];
      }, namedArgs);
    }
  }

}
setType("Microsoft.FSharp.Compiler.AttributeChecking.AttribInfo", AttribInfo);
export function AttribInfosOfIL(g, amap, scoref, m, attribs) {
  return map_1(function (a) {
    return new AttribInfo(1, [g, amap, scoref, a, m]);
  }, attribs.AsList);
}
export function AttribInfosOfFS(g, attribs) {
  return map_1(function (a) {
    return new AttribInfo(0, [g, a]);
  }, attribs);
}
export function GetAttribInfosOfEntity(g, amap, m, tcref) {
  const matchValue = metadataOfTycon(tcref.Deref);

  if (matchValue.tag === 1) {
    return map_1(function (a) {
      return new AttribInfo(0, [g, a]);
    }, tcref.Attribs);
  } else {
    const tdef = matchValue.data.data[2];
    const scoref = matchValue.data.data[0];
    return function (attribs) {
      return AttribInfosOfIL(g, amap, scoref, m, attribs);
    }(tdef.CustomAttrs);
  }
}
export function GetAttribInfosOfMethod(amap, m, minfo) {
  var scoref;

  if (minfo.tag === 0) {
    return function (attribs) {
      return AttribInfosOfFS(minfo.data[0], attribs);
    }(minfo.data[2].Attribs);
  } else if (minfo.tag === 2) {
    return new List();
  } else {
    return (scoref = minfo.data[1].MetadataScope, function (attribs_1) {
      return AttribInfosOfIL(minfo.data[0], amap, scoref, m, attribs_1);
    })(minfo.data[1].RawMetadata.CustomAttrs);
  }
}
export function GetAttribInfosOfProp(amap, m, pinfo) {
  var g;
  var scoref;
  const $var2 = pinfo.tag === 0 ? pinfo.data[2] != null ? [1, pinfo.data[0], getValue(pinfo.data[2])] : pinfo.data[3] != null ? [1, pinfo.data[0], getValue(pinfo.data[3])] : [2] : [0, pinfo.data];

  switch ($var2[0]) {
    case 0:
      return (g = $var2[1].TcGlobals, scoref = $var2[1].ILTypeInfo.ILScopeRef, function (attribs) {
        return AttribInfosOfIL(g, amap, scoref, m, attribs);
      })($var2[1].RawMetadata.CustomAttrs);

    case 1:
      return function (attribs_1) {
        return AttribInfosOfFS($var2[1], attribs_1);
      }($var2[2].Attribs);

    case 2:
      throw new Error("GetAttribInfosOfProp: unreachable");
  }
}
export function GetAttribInfosOfEvent(amap, m, einfo) {
  var g;
  var scoref;

  if (einfo.tag === 0) {
    return GetAttribInfosOfProp(amap, m, einfo.data[1]);
  } else {
    return (g = einfo.TcGlobals, scoref = einfo.data.ILTypeInfo.ILScopeRef, function (attribs) {
      return AttribInfosOfIL(g, amap, scoref, m, attribs);
    })(einfo.data.RawMetadata.CustomAttrs);
  }
}
export function TryBindTyconRefAttribute(g, m, _arg1, tcref, f1, f2, f3) {
  m;
  f3;
  const matchValue = metadataOfTycon(tcref.Deref);

  if (matchValue.tag === 1) {
    const matchValue_1 = TryFindFSharpAttribute(g, _arg1, tcref.Attribs);

    if (matchValue_1 != null) {
      return f2(getValue(matchValue_1));
    } else {
      return null;
    }
  } else {
    const tdef = matchValue.data.data[2];
    const matchValue_2 = TryDecodeILAttribute(g, _arg1.data[0], tdef.CustomAttrs);

    if (matchValue_2 != null) {
      return f1(getValue(matchValue_2));
    } else {
      return null;
    }
  }
}
export function BindMethInfoAttributes(m, minfo, f1, f2, f3) {
  m;
  f3;

  if (minfo.tag === 0) {
    return f2(minfo.data[2].Attribs);
  } else if (minfo.tag === 2) {
    return f2(new List());
  } else {
    return f1(minfo.data[1].RawMetadata.CustomAttrs);
  }
}
export function TryBindMethInfoAttribute(g, m, _arg1, minfo, f1, f2, f3) {
  f3;
  return BindMethInfoAttributes(m, minfo, function (ilAttribs) {
    return function (option) {
      return defaultArg(option, null, f1);
    }(TryDecodeILAttribute(g, _arg1.data[0], ilAttribs));
  }, function (fsAttribs) {
    return function (option_1) {
      return defaultArg(option_1, null, f2);
    }(TryFindFSharpAttribute(g, _arg1, fsAttribs));
  }, function (_provAttribs) {
    return null;
  });
}
export function TryFindMethInfoStringAttribute(g, m, attribSpec, minfo) {
  return TryBindMethInfoAttribute(g, m, attribSpec, minfo, function (_arg1) {
    const $var3 = _arg1[0].tail != null ? _arg1[0].head.tag === 0 ? _arg1[0].head.data != null ? _arg1[0].tail.tail == null ? [0, getValue(_arg1[0].head.data)] : [1] : [1] : [1] : [1];

    switch ($var3[0]) {
      case 0:
        return $var3[1];

      case 1:
        return null;
    }
  }, function (_arg2) {
    let $var4;

    if (_arg2.data[2].tail != null) {
      const activePatternResult32248 = _AttribStringArg___(_arg2.data[2].head);

      if (activePatternResult32248 != null) {
        if (_arg2.data[2].tail.tail == null) {
          $var4 = [0, getValue(activePatternResult32248)];
        } else {
          $var4 = [1];
        }
      } else {
        $var4 = [1];
      }
    } else {
      $var4 = [1];
    }

    switch ($var4[0]) {
      case 0:
        return $var4[1];

      case 1:
        return null;
    }
  }, function (_arg3) {
    const $var5 = _arg3[0].tail != null ? _arg3[0].head != null ? typeof getValue(_arg3[0].head) === "string" ? _arg3[0].tail.tail == null ? [0, getValue(_arg3[0].head)] : [1] : [1] : [1] : [1];

    switch ($var5[0]) {
      case 0:
        return $var5[1];

      case 1:
        return null;
    }
  });
}
export function MethInfoHasAttribute(g, m, attribSpec, minfo) {
  return TryBindMethInfoAttribute(g, m, attribSpec, minfo, function (_arg1) {
    return makeSome();
  }, function (_arg2) {
    return makeSome();
  }, function (_arg3) {
    return makeSome();
  }) != null;
}

function CheckILAttributes(g, cattrs, m) {
  const patternInput = g.attrib_SystemObsolete;
  const matchValue = TryDecodeILAttribute(g, patternInput.data[0], cattrs);
  const $var6 = matchValue == null ? [4] : getValue(matchValue)[0].tail != null ? getValue(matchValue)[0].head.tag === 0 ? getValue(matchValue)[0].head.data == null ? getValue(matchValue)[0].tail.tail == null ? [2] : [3] : getValue(matchValue)[0].tail.tail != null ? getValue(matchValue)[0].tail.head.tag === 1 ? getValue(matchValue)[0].tail.tail.tail == null ? [1, getValue(matchValue)[0].tail.head.data, getValue(getValue(matchValue)[0].head.data)] : [3] : [3] : [0, getValue(getValue(matchValue)[0].head.data)] : [3] : [3];

  switch ($var6[0]) {
    case 0:
      return WarnD(new ObsoleteWarning($var6[1], m));

    case 1:
      if ($var6[1]) {
        return ErrorD(new ObsoleteError($var6[2], m));
      } else {
        return WarnD(new ObsoleteWarning($var6[2], m));
      }

    case 2:
      return WarnD(new ObsoleteWarning("", m));

    case 3:
      return WarnD(new ObsoleteWarning("", m));

    case 4:
      return CompleteD;
  }
}

export function CheckFSharpAttributes(g, attribs, m) {
  if (attribs.tail == null) {
    return CompleteD;
  } else {
    return op_PlusPlus(op_PlusPlus(op_PlusPlus((() => {
      const matchValue = TryFindFSharpAttribute(g, g.attrib_SystemObsolete, attribs);
      let $var7;

      if (matchValue != null) {
        if (getValue(matchValue).data[2].tail != null) {
          const activePatternResult32269 = _AttribStringArg___(getValue(matchValue).data[2].head);

          if (activePatternResult32269 != null) {
            if (getValue(matchValue).data[2].tail.tail == null) {
              $var7 = [0, getValue(activePatternResult32269)];
            } else {
              $var7 = [1];
            }
          } else {
            $var7 = [1];
          }
        } else {
          $var7 = [1];
        }
      } else {
        $var7 = [1];
      }

      switch ($var7[0]) {
        case 0:
          return WarnD(new ObsoleteWarning($var7[1], m));

        case 1:
          let $var8;

          if (matchValue != null) {
            if (getValue(matchValue).data[2].tail != null) {
              const activePatternResult32267 = _AttribStringArg___(getValue(matchValue).data[2].head);

              if (activePatternResult32267 != null) {
                if (getValue(matchValue).data[2].tail.tail != null) {
                  const activePatternResult32268 = _AttribBoolArg___(getValue(matchValue).data[2].tail.head);

                  if (activePatternResult32268 != null) {
                    if (getValue(matchValue).data[2].tail.tail.tail == null) {
                      $var8 = [0, getValue(activePatternResult32268), getValue(activePatternResult32267)];
                    } else {
                      $var8 = [1];
                    }
                  } else {
                    $var8 = [1];
                  }
                } else {
                  $var8 = [1];
                }
              } else {
                $var8 = [1];
              }
            } else {
              $var8 = [1];
            }
          } else {
            $var8 = [1];
          }

          switch ($var8[0]) {
            case 0:
              if ($var8[1]) {
                return ErrorD(new ObsoleteError($var8[2], m));
              } else {
                return WarnD(new ObsoleteWarning($var8[2], m));
              }

            case 1:
              if (matchValue == null) {
                return CompleteD;
              } else {
                return WarnD(new ObsoleteWarning("", m));
              }

          }

      }
    })(), function () {
      const matchValue_1 = TryFindFSharpAttribute(g, g.attrib_CompilerMessageAttribute, attribs);
      let $var9;

      if (matchValue_1 != null) {
        if (getValue(matchValue_1).data[2].tail != null) {
          const activePatternResult32273 = _AttribStringArg___(getValue(matchValue_1).data[2].head);

          if (activePatternResult32273 != null) {
            if (getValue(matchValue_1).data[2].tail.tail != null) {
              const activePatternResult32274 = _AttribInt32Arg___(getValue(matchValue_1).data[2].tail.head);

              if (activePatternResult32274 != null) {
                if (getValue(matchValue_1).data[2].tail.tail.tail == null) {
                  $var9 = [0, getValue(activePatternResult32274), getValue(matchValue_1).data[3], getValue(activePatternResult32273)];
                } else {
                  $var9 = [1];
                }
              } else {
                $var9 = [1];
              }
            } else {
              $var9 = [1];
            }
          } else {
            $var9 = [1];
          }
        } else {
          $var9 = [1];
        }
      } else {
        $var9 = [1];
      }

      switch ($var9[0]) {
        case 0:
          const msg = new UserCompilerMessage($var9[3], $var9[1], m);
          let isError;
          let $var10;

          const activePatternResult32271 = _ExtractAttribNamedArg___("IsError", $var9[2]);

          if (activePatternResult32271 != null) {
            const activePatternResult32272 = _AttribBoolArg___(getValue(activePatternResult32271));

            if (activePatternResult32272 != null) {
              $var10 = [0, getValue(activePatternResult32272)];
            } else {
              $var10 = [1];
            }
          } else {
            $var10 = [1];
          }

          switch ($var10[0]) {
            case 0:
              isError = $var10[1];
              break;

            case 1:
              isError = false;
              break;
          }

          if (isError) {
            return ErrorD(msg);
          } else {
            return WarnD(msg);
          }

        case 1:
          return CompleteD;
      }
    }), function () {
      const matchValue_2 = TryFindFSharpAttribute(g, g.attrib_ExperimentalAttribute, attribs);
      let $var11;

      if (matchValue_2 != null) {
        if (getValue(matchValue_2).data[2].tail != null) {
          const activePatternResult32276 = _AttribStringArg___(getValue(matchValue_2).data[2].head);

          if (activePatternResult32276 != null) {
            if (getValue(matchValue_2).data[2].tail.tail == null) {
              $var11 = [0, getValue(activePatternResult32276)];
            } else {
              $var11 = [1];
            }
          } else {
            $var11 = [1];
          }
        } else {
          $var11 = [1];
        }
      } else {
        $var11 = [1];
      }

      switch ($var11[0]) {
        case 0:
          return WarnD(new Experimental($var11[1], m));

        case 1:
          if (matchValue_2 != null) {
            return WarnD(new Experimental(SR.experimentalConstruct(), m));
          } else {
            return CompleteD;
          }

      }
    }), function () {
      const matchValue_3 = TryFindFSharpAttribute(g, g.attrib_UnverifiableAttribute, attribs);

      if (matchValue_3 != null) {
        return WarnD(new PossibleUnverifiableCode(m));
      } else {
        return CompleteD;
      }
    });
  }
}
export function CheckILAttributesForUnseen(g, cattrs, _m) {
  const patternInput = g.attrib_SystemObsolete;
  return TryDecodeILAttribute(g, patternInput.data[0], cattrs) != null;
}
export function CheckFSharpAttributesForHidden(g, attribs) {
  if (!(attribs.tail == null) ? (() => {
    const matchValue = TryFindFSharpAttribute(g, g.attrib_CompilerMessageAttribute, attribs);
    let $var12;

    if (matchValue != null) {
      if (getValue(matchValue).data[2].tail != null) {
        const activePatternResult32287 = _AttribStringArg___(getValue(matchValue).data[2].head);

        if (activePatternResult32287 != null) {
          if (getValue(matchValue).data[2].tail.tail != null) {
            const activePatternResult32288 = _AttribInt32Arg___(getValue(matchValue).data[2].tail.head);

            if (activePatternResult32288 != null) {
              if (getValue(matchValue).data[2].tail.tail.tail == null) {
                const activePatternResult32289 = _ExtractAttribNamedArg___("IsHidden", getValue(matchValue).data[3]);

                if (activePatternResult32289 != null) {
                  const activePatternResult32290 = _AttribBoolArg___(getValue(activePatternResult32289));

                  if (activePatternResult32290 != null) {
                    $var12 = [0, getValue(activePatternResult32288), getValue(activePatternResult32290)];
                  } else {
                    $var12 = [1];
                  }
                } else {
                  $var12 = [1];
                }
              } else {
                $var12 = [1];
              }
            } else {
              $var12 = [1];
            }
          } else {
            $var12 = [1];
          }
        } else {
          $var12 = [1];
        }
      } else {
        $var12 = [1];
      }
    } else {
      $var12 = [1];
    }

    switch ($var12[0]) {
      case 0:
        if ($var12[2]) {
          return !($var12[1] === 62 ? g.mlCompatibility : false);
        } else {
          return false;
        }

      case 1:
        return false;
    }
  })() : false) {
    return true;
  } else {
    const matchValue_1 = TryFindFSharpAttribute(g, g.attrib_ComponentModelEditorBrowsableAttribute, attribs);
    let $var13;

    if (matchValue_1 != null) {
      if (getValue(matchValue_1).data[2].tail != null) {
        const activePatternResult32291 = _AttribInt32Arg___(getValue(matchValue_1).data[2].head);

        if (activePatternResult32291 != null) {
          if (getValue(matchValue_1).data[2].tail.tail == null) {
            $var13 = [0, getValue(activePatternResult32291)];
          } else {
            $var13 = [1];
          }
        } else {
          $var13 = [1];
        }
      } else {
        $var13 = [1];
      }
    } else {
      $var13 = [1];
    }

    switch ($var13[0]) {
      case 0:
        return $var13[1] === 1;

      case 1:
        return false;
    }
  }
}
export function CheckFSharpAttributesForObsolete(g, attribs) {
  if (!(attribs.tail == null)) {
    return HasFSharpAttribute(g, g.attrib_SystemObsolete, attribs);
  } else {
    return false;
  }
}
export function CheckFSharpAttributesForUnseen(g, attribs, _m) {
  if (!(attribs.tail == null)) {
    if (CheckFSharpAttributesForObsolete(g, attribs)) {
      return true;
    } else {
      return CheckFSharpAttributesForHidden(g, attribs);
    }
  } else {
    return false;
  }
}
export function CheckPropInfoAttributes(pinfo, m) {
  const $var14 = pinfo.tag === 0 ? pinfo.data[2] != null ? [1, pinfo.data[0], getValue(pinfo.data[2])] : pinfo.data[3] != null ? [1, pinfo.data[0], getValue(pinfo.data[3])] : [2] : [0, pinfo.data.data[1]];

  switch ($var14[0]) {
    case 0:
      return CheckILAttributes(pinfo.TcGlobals, $var14[1].CustomAttrs, m);

    case 1:
      return CheckFSharpAttributes($var14[1], $var14[2].Attribs, m);

    case 2:
      throw new Error("CheckPropInfoAttributes: unreachable");
  }
}
export function CheckILFieldAttributes(g, finfo, m) {
  CommitOperationResult(CheckILAttributes(g, finfo.data[1].CustomAttrs, m));
}
export function CheckMethInfoAttributes(g, m, tyargsOpt, minfo) {
  const search = BindMethInfoAttributes(m, minfo, function (ilAttribs) {
    return CheckILAttributes(g, ilAttribs, m);
  }, function (fsAttribs) {
    const res = op_PlusPlus(CheckFSharpAttributes(g, fsAttribs, m), function () {
      return (tyargsOpt == null ? HasFSharpAttribute(g, g.attrib_RequiresExplicitTypeArgumentsAttribute, fsAttribs) : false) ? ErrorD(new _Error(SR.tcFunctionRequiresExplicitTypeArguments(minfo.LogicalName), m)) : CompleteD;
    });
    return res;
  }, function (_provAttribs) {
    return null;
  });

  if (search == null) {
    return CompleteD;
  } else {
    return getValue(search);
  }
}
export function MethInfoIsUnseen(g, m, typ, minfo) {
  const isUnseenByObsoleteAttrib = function () {
    const matchValue = BindMethInfoAttributes(m, minfo, function (ilAttribs) {
      return CheckILAttributesForUnseen(g, ilAttribs, m);
    }, function (fsAttribs) {
      return CheckFSharpAttributesForUnseen(g, fsAttribs, m);
    }, function (_provAttribs) {
      return null;
    });

    if (matchValue == null) {
      return false;
    } else {
      return getValue(matchValue);
    }
  };

  const isUnseenByHidingAttribute = function () {
    typ;
    return false;
  };

  if (isUnseenByObsoleteAttrib()) {
    return true;
  } else {
    return isUnseenByHidingAttribute();
  }
}
export function PropInfoIsUnseen(m, pinfo) {
  const $var15 = pinfo.tag === 0 ? pinfo.data[2] != null ? [1, pinfo.data[0], getValue(pinfo.data[2])] : pinfo.data[3] != null ? [1, pinfo.data[0], getValue(pinfo.data[3])] : [2] : [0, pinfo.data, pinfo.data.data[1]];

  switch ($var15[0]) {
    case 0:
      if (isAnyTupleTy(pinfo.TcGlobals, $var15[1].ILTypeInfo.ToType)) {
        return true;
      } else {
        return CheckILAttributesForUnseen(pinfo.TcGlobals, $var15[2].CustomAttrs, m);
      }

    case 1:
      return CheckFSharpAttributesForUnseen($var15[1], $var15[2].Attribs, m);

    case 2:
      throw new Error("CheckPropInfoAttributes: unreachable");
  }
}
export function CheckEntityAttributes(g, x, m) {
  if (x.IsILTycon) {
    return CheckILAttributes(g, x.ILTyconRawMetadata.CustomAttrs, m);
  } else {
    return CheckFSharpAttributes(g, x.Attribs, m);
  }
}
export function CheckUnionCaseAttributes(g, x, m) {
  return op_PlusPlus(CheckEntityAttributes(g, x.TyconRef, m), function () {
    return CheckFSharpAttributes(g, x.Attribs, m);
  });
}
export function CheckRecdFieldAttributes(g, x, m) {
  return op_PlusPlus(CheckEntityAttributes(g, x.TyconRef, m), function () {
    return CheckFSharpAttributes(g, x.PropertyAttribs, m);
  });
}
export function CheckValAttributes(g, x, m) {
  return CheckFSharpAttributes(g, x.Attribs, m);
}
export function CheckRecdFieldInfoAttributes(g, x, m) {
  return CheckRecdFieldAttributes(g, x.RecdFieldRef, m);
}