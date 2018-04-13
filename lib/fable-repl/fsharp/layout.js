import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { range as range_1 } from "./range";
import { join, printf } from "../fable-core/String";
import { Joint, LayoutTag, TaggedTextOps as TaggedTextOps_1, Layout } from "../utils/sformat";
import CurriedLambda from "../fable-core/CurriedLambda";
import { append, replicate, fold } from "../fable-core/Seq";
import { getValue } from "../fable-core/Option";
import { reverse, ofArray, map } from "../fable-core/List";
import List from "../fable-core/List";
import { comparePrimitives, compareUnions, equals as equals_2, Array as _Array } from "../fable-core/Util";
import { Microsoft } from "../fcs-fable/adapters";
export class NavigableTaggedText {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Layout.NavigableTaggedText",
      interfaces: ["TaggedText"],
      properties: {
        Range: range_1
      }
    };
  }

  constructor(taggedText, range) {
    this.taggedText = taggedText;
    this["Range@"] = range;
  }

  get Range() {
    return this["Range@"];
  }

  get Tag() {
    return this.taggedText.Tag;
  }

  get Text() {
    return this.taggedText.Text;
  }

}
setType("Microsoft.FSharp.Compiler.Layout.NavigableTaggedText", NavigableTaggedText);
export function mkNav(r, t) {
  return new NavigableTaggedText(t, r);
}
export function spaces(n) {
  return printf(" ");
}
export function juxtLeft(_arg1) {
  juxtLeft: while (true) {
    if (_arg1.tag === 1) {
      return _arg1.data[0];
    } else if (_arg1.tag === 2) {
      return _arg1.data[0];
    } else if (_arg1.tag === 3) {
      _arg1 = _arg1.data[2];
      continue juxtLeft;
    } else {
      return _arg1.data[0];
    }
  }
}
export function juxtRight(_arg1) {
  juxtRight: while (true) {
    if (_arg1.tag === 1) {
      return _arg1.data[2];
    } else if (_arg1.tag === 2) {
      return _arg1.data[4];
    } else if (_arg1.tag === 3) {
      _arg1 = _arg1.data[2];
      continue juxtRight;
    } else {
      return _arg1.data[2];
    }
  }
}
export const emptyL = new Layout(1, [true, TaggedTextOps_1.tag(new LayoutTag(29), ""), true]);
export function isEmptyL(_arg1) {
  const $var1 = _arg1.tag === 1 ? _arg1.data[0] ? _arg1.data[2] ? _arg1.data[1].Text === "" ? [0, _arg1.data[1]] : [1] : [1] : [1] : [1];

  switch ($var1[0]) {
    case 0:
      return true;

    case 1:
      return false;
  }
}
export function mkNode(l, r, joint) {
  if (isEmptyL(l)) {
    return r;
  } else if (isEmptyL(r)) {
    return l;
  } else {
    const jl = juxtLeft(l);
    const jm = juxtRight(l) ? true : juxtLeft(r);
    const jr = juxtRight(r);
    return new Layout(2, [jl, l, jm, r, jr, joint]);
  }
}
export function wordL(str) {
  return new Layout(1, [false, str, false]);
}
export function sepL(str) {
  return new Layout(1, [true, str, true]);
}
export function rightL(str) {
  return new Layout(1, [true, str, false]);
}
export function leftL(str) {
  return new Layout(1, [false, str, true]);
}
export const TaggedTextOps = function (__exports) {
  const tagActivePatternCase = __exports.tagActivePatternCase = CurriedLambda((() => {
    const arg00_ = new LayoutTag(0);
    return function (arg10_) {
      return TaggedTextOps_1.tag(arg00_, arg10_);
    };
  })());
  const tagActivePatternResult = __exports.tagActivePatternResult = CurriedLambda((() => {
    const arg00_ = new LayoutTag(1);
    return function (arg10_) {
      return TaggedTextOps_1.tag(arg00_, arg10_);
    };
  })());
  const tagAlias = __exports.tagAlias = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagAlias(arg00_);
  });
  const tagClass = __exports.tagClass = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagClass(arg00_);
  });
  const tagUnion = __exports.tagUnion = CurriedLambda((() => {
    const arg00_ = new LayoutTag(4);
    return function (arg10_) {
      return TaggedTextOps_1.tag(arg00_, arg10_);
    };
  })());
  const tagUnionCase = __exports.tagUnionCase = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagUnionCase(arg00_);
  });
  const tagDelegate = __exports.tagDelegate = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagDelegate(arg00_);
  });
  const tagEnum = __exports.tagEnum = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagEnum(arg00_);
  });
  const tagEvent = __exports.tagEvent = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagEvent(arg00_);
  });
  const tagField = __exports.tagField = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagField(arg00_);
  });
  const tagInterface = __exports.tagInterface = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagInterface(arg00_);
  });
  const tagKeyword = __exports.tagKeyword = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagKeyword(arg00_);
  });
  const tagLineBreak = __exports.tagLineBreak = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagLineBreak(arg00_);
  });
  const tagLocal = __exports.tagLocal = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagLocal(arg00_);
  });
  const tagRecord = __exports.tagRecord = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagRecord(arg00_);
  });
  const tagRecordField = __exports.tagRecordField = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagRecordField(arg00_);
  });
  const tagMethod = __exports.tagMethod = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagMethod(arg00_);
  });
  const tagMember = __exports.tagMember = CurriedLambda((() => {
    const arg00_ = new LayoutTag(17);
    return function (arg10_) {
      return TaggedTextOps_1.tag(arg00_, arg10_);
    };
  })());
  const tagModule = __exports.tagModule = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagModule(arg00_);
  });
  const tagModuleBinding = __exports.tagModuleBinding = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagModuleBinding(arg00_);
  });
  const tagNamespace = __exports.tagNamespace = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagNamespace(arg00_);
  });
  const tagNumericLiteral = __exports.tagNumericLiteral = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagNumericLiteral(arg00_);
  });
  const tagOperator = __exports.tagOperator = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagOperator(arg00_);
  });
  const tagParameter = __exports.tagParameter = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagParameter(arg00_);
  });
  const tagProperty = __exports.tagProperty = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagProperty(arg00_);
  });
  const tagSpace = __exports.tagSpace = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagSpace(arg00_);
  });
  const tagStringLiteral = __exports.tagStringLiteral = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagStringLiteral(arg00_);
  });
  const tagStruct = __exports.tagStruct = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagStruct(arg00_);
  });
  const tagTypeParameter = __exports.tagTypeParameter = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagTypeParameter(arg00_);
  });
  const tagText = __exports.tagText = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagText(arg00_);
  });
  const tagPunctuation = __exports.tagPunctuation = CurriedLambda(function (arg00_) {
    return TaggedTextOps_1.tagPunctuation(arg00_);
  });
  const tagUnknownEntity = __exports.tagUnknownEntity = CurriedLambda((() => {
    const arg00_ = new LayoutTag(32);
    return function (arg10_) {
      return TaggedTextOps_1.tag(arg00_, arg10_);
    };
  })());
  const tagUnknownType = __exports.tagUnknownType = CurriedLambda((() => {
    const arg00_ = new LayoutTag(31);
    return function (arg10_) {
      return TaggedTextOps_1.tag(arg00_, arg10_);
    };
  })());

  const Literals = __exports.Literals = function (__exports) {
    const lineBreak = __exports.lineBreak = TaggedTextOps_1.Literals.lineBreak;
    const space = __exports.space = TaggedTextOps_1.Literals.space;
    const comma = __exports.comma = TaggedTextOps_1.Literals.comma;
    const semicolon = __exports.semicolon = TaggedTextOps_1.Literals.semicolon;
    const leftParen = __exports.leftParen = TaggedTextOps_1.Literals.leftParen;
    const rightParen = __exports.rightParen = TaggedTextOps_1.Literals.rightParen;
    const leftBracket = __exports.leftBracket = TaggedTextOps_1.Literals.leftBracket;
    const rightBracket = __exports.rightBracket = TaggedTextOps_1.Literals.rightBracket;
    const leftBrace = __exports.leftBrace = TaggedTextOps_1.Literals.leftBrace;
    const rightBrace = __exports.rightBrace = TaggedTextOps_1.Literals.rightBrace;
    const equals = __exports.equals = TaggedTextOps_1.Literals.equals;
    const arrow = __exports.arrow = TaggedTextOps_1.Literals.arrow;
    const questionMark = __exports.questionMark = TaggedTextOps_1.Literals.questionMark;
    const dot = __exports.dot = tagPunctuation(".");
    const leftAngle = __exports.leftAngle = tagPunctuation("<");
    const rightAngle = __exports.rightAngle = tagPunctuation(">");
    const star = __exports.star = tagOperator("*");
    const colon = __exports.colon = tagPunctuation(":");
    const minus = __exports.minus = tagPunctuation("-");
    const keywordNew = __exports.keywordNew = tagKeyword("new");
    const leftBracketAngle = __exports.leftBracketAngle = tagPunctuation("[<");
    const rightBracketAngle = __exports.rightBracketAngle = tagPunctuation(">]");
    const structUnit = __exports.structUnit = tagStruct("unit");
    const keywordStatic = __exports.keywordStatic = tagKeyword("static");
    const keywordMember = __exports.keywordMember = tagKeyword("member");
    const keywordVal = __exports.keywordVal = tagKeyword("val");
    const keywordEvent = __exports.keywordEvent = tagKeyword("event");
    const keywordWith = __exports.keywordWith = tagKeyword("with");
    const keywordSet = __exports.keywordSet = tagKeyword("set");
    const keywordGet = __exports.keywordGet = tagKeyword("get");
    const keywordTrue = __exports.keywordTrue = tagKeyword("true");
    const keywordFalse = __exports.keywordFalse = tagKeyword("false");
    const bar = __exports.bar = tagPunctuation("|");
    const keywordStruct = __exports.keywordStruct = tagKeyword("struct");
    const keywordInherit = __exports.keywordInherit = tagKeyword("inherit");
    const keywordEnd = __exports.keywordEnd = tagKeyword("end");
    const keywordNested = __exports.keywordNested = tagKeyword("nested");
    const keywordType = __exports.keywordType = tagKeyword("type");
    const keywordDelegate = __exports.keywordDelegate = tagKeyword("delegate");
    const keywordOf = __exports.keywordOf = tagKeyword("of");
    const keywordInternal = __exports.keywordInternal = tagKeyword("internal");
    const keywordPrivate = __exports.keywordPrivate = tagKeyword("private");
    const keywordAbstract = __exports.keywordAbstract = tagKeyword("abstract");
    const keywordOverride = __exports.keywordOverride = tagKeyword("override");
    const keywordEnum = __exports.keywordEnum = tagKeyword("enum");
    const leftBracketBar = __exports.leftBracketBar = tagPunctuation("[|");
    const rightBracketBar = __exports.rightBracketBar = tagPunctuation("|]");
    const keywordTypeof = __exports.keywordTypeof = tagKeyword("typeof");
    const keywordTypedefof = __exports.keywordTypedefof = tagKeyword("typedefof");
    return __exports;
  }({});

  return __exports;
}({});
export const SepL = function (__exports) {
  const dot_1 = __exports.dot = sepL(TaggedTextOps.Literals.dot);
  const star_1 = __exports.star = sepL(TaggedTextOps.Literals.star);
  const colon_1 = __exports.colon = sepL(TaggedTextOps.Literals.colon);
  const questionMark_1 = __exports.questionMark = sepL(TaggedTextOps.Literals.questionMark);
  const leftParen_1 = __exports.leftParen = sepL(TaggedTextOps.Literals.leftParen);
  const comma_1 = __exports.comma = sepL(TaggedTextOps.Literals.comma);
  const space_1 = __exports.space = sepL(TaggedTextOps.Literals.space);
  const leftBracket_1 = __exports.leftBracket = sepL(TaggedTextOps.Literals.leftBracket);
  const leftAngle_1 = __exports.leftAngle = sepL(TaggedTextOps.Literals.leftAngle);
  const lineBreak_1 = __exports.lineBreak = sepL(TaggedTextOps.Literals.lineBreak);
  const rightParen_1 = __exports.rightParen = sepL(TaggedTextOps.Literals.rightParen);
  return __exports;
}({});
export const WordL = function (__exports) {
  const arrow_1 = __exports.arrow = wordL(TaggedTextOps.Literals.arrow);
  const star_2 = __exports.star = wordL(TaggedTextOps.Literals.star);
  const colon_2 = __exports.colon = wordL(TaggedTextOps.Literals.colon);
  const equals_1 = __exports.equals = wordL(TaggedTextOps.Literals.equals);
  const keywordNew_1 = __exports.keywordNew = wordL(TaggedTextOps.Literals.keywordNew);
  const structUnit_1 = __exports.structUnit = wordL(TaggedTextOps.Literals.structUnit);
  const keywordStatic_1 = __exports.keywordStatic = wordL(TaggedTextOps.Literals.keywordStatic);
  const keywordMember_1 = __exports.keywordMember = wordL(TaggedTextOps.Literals.keywordMember);
  const keywordVal_1 = __exports.keywordVal = wordL(TaggedTextOps.Literals.keywordVal);
  const keywordEvent_1 = __exports.keywordEvent = wordL(TaggedTextOps.Literals.keywordEvent);
  const keywordWith_1 = __exports.keywordWith = wordL(TaggedTextOps.Literals.keywordWith);
  const keywordSet_1 = __exports.keywordSet = wordL(TaggedTextOps.Literals.keywordSet);
  const keywordGet_1 = __exports.keywordGet = wordL(TaggedTextOps.Literals.keywordGet);
  const keywordTrue_1 = __exports.keywordTrue = wordL(TaggedTextOps.Literals.keywordTrue);
  const keywordFalse_1 = __exports.keywordFalse = wordL(TaggedTextOps.Literals.keywordFalse);
  const bar_1 = __exports.bar = wordL(TaggedTextOps.Literals.bar);
  const keywordStruct_1 = __exports.keywordStruct = wordL(TaggedTextOps.Literals.keywordStruct);
  const keywordInherit_1 = __exports.keywordInherit = wordL(TaggedTextOps.Literals.keywordInherit);
  const keywordEnd_1 = __exports.keywordEnd = wordL(TaggedTextOps.Literals.keywordEnd);
  const keywordNested_1 = __exports.keywordNested = wordL(TaggedTextOps.Literals.keywordNested);
  const keywordType_1 = __exports.keywordType = wordL(TaggedTextOps.Literals.keywordType);
  const keywordDelegate_1 = __exports.keywordDelegate = wordL(TaggedTextOps.Literals.keywordDelegate);
  const keywordOf_1 = __exports.keywordOf = wordL(TaggedTextOps.Literals.keywordOf);
  const keywordInternal_1 = __exports.keywordInternal = wordL(TaggedTextOps.Literals.keywordInternal);
  const keywordPrivate_1 = __exports.keywordPrivate = wordL(TaggedTextOps.Literals.keywordPrivate);
  const keywordAbstract_1 = __exports.keywordAbstract = wordL(TaggedTextOps.Literals.keywordAbstract);
  const keywordOverride_1 = __exports.keywordOverride = wordL(TaggedTextOps.Literals.keywordOverride);
  const keywordEnum_1 = __exports.keywordEnum = wordL(TaggedTextOps.Literals.keywordEnum);
  return __exports;
}({});
export const LeftL = function (__exports) {
  const leftParen_2 = __exports.leftParen = leftL(TaggedTextOps.Literals.leftParen);
  const questionMark_2 = __exports.questionMark = leftL(TaggedTextOps.Literals.questionMark);
  const colon_3 = __exports.colon = leftL(TaggedTextOps.Literals.colon);
  const leftBracketAngle_1 = __exports.leftBracketAngle = leftL(TaggedTextOps.Literals.leftBracketAngle);
  const leftBracketBar_1 = __exports.leftBracketBar = leftL(TaggedTextOps.Literals.leftBracketBar);
  const keywordTypeof_1 = __exports.keywordTypeof = leftL(TaggedTextOps.Literals.keywordTypeof);
  const keywordTypedefof_1 = __exports.keywordTypedefof = leftL(TaggedTextOps.Literals.keywordTypedefof);
  return __exports;
}({});
export const RightL = function (__exports) {
  const comma_2 = __exports.comma = rightL(TaggedTextOps.Literals.comma);
  const rightParen_2 = __exports.rightParen = rightL(TaggedTextOps.Literals.rightParen);
  const colon_4 = __exports.colon = rightL(TaggedTextOps.Literals.colon);
  const rightBracket_1 = __exports.rightBracket = rightL(TaggedTextOps.Literals.rightBracket);
  const rightAngle_1 = __exports.rightAngle = rightL(TaggedTextOps.Literals.rightAngle);
  const rightBracketAngle_1 = __exports.rightBracketAngle = rightL(TaggedTextOps.Literals.rightBracketAngle);
  const rightBracketBar_1 = __exports.rightBracketBar = rightL(TaggedTextOps.Literals.rightBracketBar);
  return __exports;
}({});
export function aboveL(l, r) {
  return mkNode(l, r, new Joint(2, 0));
}
export function tagAttrL(str, attrs, ly) {
  return new Layout(3, [str, attrs, ly]);
}
export function apply2(f, l, r) {
  if (isEmptyL(l)) {
    return r;
  } else if (isEmptyL(r)) {
    return l;
  } else {
    return f(l, r);
  }
}
export function op_HatHat(l, r) {
  return mkNode(l, r, new Joint(0));
}
export function op_PlusPlus(l, r) {
  return mkNode(l, r, new Joint(1, 0));
}
export function op_MinusMinus(l, r) {
  return mkNode(l, r, new Joint(1, 1));
}
export function op_MinusMinusMinus(l, r) {
  return mkNode(l, r, new Joint(1, 2));
}
export function op_MinusMinusMinusMinus(l, r) {
  return mkNode(l, r, new Joint(1, 3));
}
export function op_MinusMinusMinusMinusMinus(l, r) {
  return mkNode(l, r, new Joint(1, 4));
}
export function op_AtAt(l, r) {
  return apply2(function (l_1, r_1) {
    return mkNode(l_1, r_1, new Joint(2, 0));
  }, l, r);
}
export function op_AtAtMinus(l, r) {
  return apply2(function (l_1, r_1) {
    return mkNode(l_1, r_1, new Joint(2, 1));
  }, l, r);
}
export function op_AtAtMinusMinus(l, r) {
  return apply2(function (l_1, r_1) {
    return mkNode(l_1, r_1, new Joint(2, 2));
  }, l, r);
}
export function tagListL(tagger, _arg1) {
  if (_arg1.tail != null) {
    if (_arg1.tail.tail == null) {
      return _arg1.head;
    } else {
      const process_ = function (prefixL, _arg2) {
        process_: while (true) {
          if (_arg2.tail != null) {
            prefixL = op_PlusPlus(tagger(prefixL), _arg2.head);
            _arg2 = _arg2.tail;
            continue process_;
          } else {
            return prefixL;
          }
        }
      };

      return process_(_arg1.head, _arg1.tail);
    }
  } else {
    return emptyL;
  }
}
export function commaListL(x) {
  return tagListL(function (prefixL) {
    return op_HatHat(prefixL, rightL(TaggedTextOps.Literals.comma));
  }, x);
}
export function semiListL(x) {
  return tagListL(function (prefixL) {
    return op_HatHat(prefixL, rightL(TaggedTextOps.Literals.semicolon));
  }, x);
}
export function spaceListL(x) {
  return tagListL(function (prefixL) {
    return prefixL;
  }, x);
}
export function sepListL(x, y) {
  return tagListL(function (prefixL) {
    return op_HatHat(prefixL, x);
  }, y);
}
export function bracketL(l) {
  return op_HatHat(leftL(TaggedTextOps.Literals.leftParen), op_HatHat(l, rightL(TaggedTextOps.Literals.rightParen)));
}
export function tupleL(xs) {
  return bracketL(sepListL(sepL(TaggedTextOps.Literals.comma), xs));
}
export function aboveListL(_arg1) {
  if (_arg1.tail != null) {
    if (_arg1.tail.tail == null) {
      return _arg1.head;
    } else {
      return fold(function (pre, y) {
        return op_AtAt(pre, y);
      }, _arg1.head, _arg1.tail);
    }
  } else {
    return emptyL;
  }
}
export function optionL(xL, _arg1) {
  if (_arg1 != null) {
    return op_MinusMinus(wordL(TaggedTextOps.tagUnionCase("Some")), xL(getValue(_arg1)));
  } else {
    return wordL(TaggedTextOps.tagUnionCase("None"));
  }
}
export function listL(xL, xs) {
  return op_HatHat(leftL(TaggedTextOps.Literals.leftBracket), op_HatHat(sepListL(sepL(TaggedTextOps.Literals.semicolon), map(xL, xs)), rightL(TaggedTextOps.Literals.rightBracket)));
}
export class breaks {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Layout.breaks",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Breaks", "number", "number", _Array(Int32Array, true)]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals_2(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Layout.breaks", breaks);
export const chunkN = 400;
export function breaks0() {
  return new breaks(0, [0, 0, Int32Array.from(replicate(chunkN, 0))]);
}
export function pushBreak(saving, _arg1) {
  const stack = _arg1.data[0] === _arg1.data[2].length ? Int32Array.from(append(_arg1.data[2], Int32Array.from(replicate(chunkN, 0)))) : _arg1.data[2];
  stack[_arg1.data[0]] = saving | 0;
  return new breaks(0, [_arg1.data[0] + 1, _arg1.data[1], stack]);
}
export function popBreak(_arg1) {
  if (_arg1.data[0] === 0) {
    throw Microsoft.FSharp.Core.Operators.Failure("popBreak: underflow");
  }

  const topBroke = _arg1.data[2][_arg1.data[0] - 1] < 0;
  const outer = (_arg1.data[1] === _arg1.data[0] ? _arg1.data[1] - 1 : _arg1.data[1]) | 0;
  const next = _arg1.data[0] - 1 | 0;
  return [new breaks(0, [next, outer, _arg1.data[2]]), topBroke];
}
export function forceBreak(_arg1) {
  if (_arg1.data[1] === _arg1.data[0]) {
    return null;
  } else {
    const saving = _arg1.data[2][_arg1.data[1]] | 0;
    _arg1.data[2][_arg1.data[1]] = -_arg1.data[2][_arg1.data[1]] | 0;
    const outer = _arg1.data[1] + 1 | 0;
    return [new breaks(0, [_arg1.data[0], outer, _arg1.data[2]]), saving];
  }
}
export function squashTo(maxWidth, layout) {
  const fit = function (breaks_1, tupledArg) {
    let patternInput_9;

    if (tupledArg[1].tag === 3) {
      const patternInput = fit(breaks_1, [tupledArg[0], tupledArg[1].data[2]]);
      const layout_1 = new Layout(3, [tupledArg[1].data[0], tupledArg[1].data[1], patternInput[1]]);
      patternInput_9 = [patternInput[0], layout_1, patternInput[2], patternInput[3]];
    } else if (tupledArg[1].tag === 1) {
      const textWidth = tupledArg[1].data[1].Text.length | 0;

      const fitLeaf = function (breaks_2, pos) {
        fitLeaf: while (true) {
          if (pos + textWidth <= maxWidth) {
            return [breaks_2, tupledArg[1], pos + textWidth, textWidth];
          } else {
            const matchValue = forceBreak(breaks_2);

            if (matchValue != null) {
              const saving = getValue(matchValue)[1] | 0;
              const breaks_3 = getValue(matchValue)[0];
              const pos_1 = pos - saving | 0;
              breaks_2 = breaks_3;
              pos = pos_1;
              continue fitLeaf;
            } else {
              return [breaks_2, tupledArg[1], pos + textWidth, textWidth];
            }
          }
        }
      };

      patternInput_9 = fitLeaf(breaks_1, tupledArg[0]);
    } else if (tupledArg[1].tag === 2) {
      const mid = (tupledArg[1].data[2] ? 0 : 1) | 0;

      if (tupledArg[1].data[5].tag === 2) {
        const patternInput_1 = fit(breaks_1, [tupledArg[0], tupledArg[1].data[1]]);
        const pos_2 = patternInput_1[2] - patternInput_1[3] + tupledArg[1].data[5].data | 0;
        const patternInput_2 = fit(patternInput_1[0], [pos_2, tupledArg[1].data[3]]);
        patternInput_9 = [patternInput_2[0], new Layout(2, [tupledArg[1].data[0], patternInput_1[1], tupledArg[1].data[2], patternInput_2[1], tupledArg[1].data[4], new Joint(2, tupledArg[1].data[5].data)]), patternInput_2[2], tupledArg[1].data[5].data + patternInput_2[3]];
      } else if (tupledArg[1].data[5].tag === 1) {
        const patternInput_3 = fit(breaks_1, [tupledArg[0], tupledArg[1].data[1]]);
        const saving_1 = patternInput_3[3] + mid - tupledArg[1].data[5].data | 0;
        const pos_3 = patternInput_3[2] + mid | 0;

        if (saving_1 > 0) {
          const breaks_4 = pushBreak(saving_1, patternInput_3[0]);
          const patternInput_4 = fit(breaks_4, [pos_3, tupledArg[1].data[3]]);
          const patternInput_5 = popBreak(patternInput_4[0]);

          if (patternInput_5[1]) {
            patternInput_9 = [patternInput_5[0], new Layout(2, [tupledArg[1].data[0], patternInput_3[1], tupledArg[1].data[2], patternInput_4[1], tupledArg[1].data[4], new Joint(2, tupledArg[1].data[5].data)]), patternInput_4[2], tupledArg[1].data[5].data + patternInput_4[3]];
          } else {
            patternInput_9 = [patternInput_5[0], new Layout(2, [tupledArg[1].data[0], patternInput_3[1], tupledArg[1].data[2], patternInput_4[1], tupledArg[1].data[4], new Joint(1, tupledArg[1].data[5].data)]), patternInput_4[2], patternInput_3[3] + mid + patternInput_4[3]];
          }
        } else {
          const patternInput_6 = fit(patternInput_3[0], [pos_3, tupledArg[1].data[3]]);
          patternInput_9 = [patternInput_6[0], new Layout(2, [tupledArg[1].data[0], patternInput_3[1], tupledArg[1].data[2], patternInput_6[1], tupledArg[1].data[4], new Joint(1, tupledArg[1].data[5].data)]), patternInput_6[2], patternInput_3[3] + mid + patternInput_6[3]];
        }
      } else {
        const patternInput_7 = fit(breaks_1, [tupledArg[0], tupledArg[1].data[1]]);
        const pos_4 = patternInput_7[2] + mid | 0;
        const patternInput_8 = fit(patternInput_7[0], [pos_4, tupledArg[1].data[3]]);
        patternInput_9 = [patternInput_8[0], new Layout(2, [tupledArg[1].data[0], patternInput_7[1], tupledArg[1].data[2], patternInput_8[1], tupledArg[1].data[4], new Joint(0)]), patternInput_8[2], patternInput_7[3] + mid + patternInput_8[3]];
      }
    } else {
      throw new Error("ObjLeaf should not appear here");
    }

    return [patternInput_9[0], patternInput_9[1], patternInput_9[2], patternInput_9[3]];
  };

  const breaks_5 = breaks0();
  const patternInput_10 = fit(breaks_5, [0, layout]);
  return patternInput_10[1];
}
export function renderL(rr, layout) {
  const addL = function (z, pos, i, layout_1, k) {
    if (layout_1.tag === 1) {
      return k([function (arg00, arg10) {
        return rr.AddText(arg00, arg10);
      }(z, layout_1.data[1]), i + layout_1.data[1].Text.length]);
    } else if (layout_1.tag === 2) {
      if (layout_1.data[5].tag === 2) {
        return CurriedLambda(addL)(z, pos, i, layout_1.data[1])(function (tupledArg) {
          const patternInput = [function (arg00_1, arg10_1) {
            return rr.AddBreak(arg00_1, arg10_1);
          }(tupledArg[0], pos + layout_1.data[5].data), pos + layout_1.data[5].data];
          return addL(patternInput[0], pos + layout_1.data[5].data, patternInput[1], layout_1.data[3], k);
        });
      } else {
        return CurriedLambda(addL)(z, pos, i, layout_1.data[1])(function (tupledArg_1) {
          const patternInput_1 = layout_1.data[2] ? [tupledArg_1[0], tupledArg_1[1]] : [function (arg00_2, arg10_2) {
            return rr.AddText(arg00_2, arg10_2);
          }(tupledArg_1[0], TaggedTextOps.Literals.space), tupledArg_1[1] + 1];
          return addL(patternInput_1[0], patternInput_1[1], patternInput_1[1], layout_1.data[3], k);
        });
      }
    } else if (layout_1.tag === 3) {
      const z_1 = function (arg00_3, tupledArg_2) {
        return rr.AddTag(arg00_3, tupledArg_2[0], tupledArg_2[1], tupledArg_2[2]);
      }(z, [layout_1.data[0], layout_1.data[1], true]);

      return CurriedLambda(addL)(z_1, pos, i, layout_1.data[2])(function (tupledArg_3) {
        const z_2 = function (arg00_4, tupledArg_4) {
          return rr.AddTag(arg00_4, tupledArg_4[0], tupledArg_4[1], tupledArg_4[2]);
        }(tupledArg_3[0], [layout_1.data[0], layout_1.data[1], false]);

        return k([z_2, tupledArg_3[1]]);
      });
    } else {
      throw new Error("ObjLeaf should never apper here");
    }
  };

  const patternInput_2 = [rr.Start(), 0];
  const patternInput_3 = addL(patternInput_2[0], 0, patternInput_2[1], layout, function (x) {
    return x;
  });
  return rr.Finish(patternInput_3[0]);
}
export const stringR = {
  Start() {
    return new List();
  },

  AddText(rstrs, taggedText) {
    return new List(taggedText.Text, rstrs);
  },

  AddBreak(rstrs, n) {
    return ofArray([spaces(n), "\n"], rstrs);
  },

  AddTag(z, _arg1, _arg2, _arg3) {
    return z;
  },

  Finish(rstrs) {
    return join("", ...Array.from(reverse(rstrs)));
  },

  [_Symbol.reflection]() {
    return {
      interfaces: ["Microsoft.FSharp.Compiler.Layout.LayoutRenderer"]
    };
  }

};
export class NoState {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Layout.NoState",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NoState"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Layout.NoState", NoState);
export class NoResult {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Layout.NoResult",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NoResult"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Layout.NoResult", NoResult);
export function taggedTextListR(collector) {
  return {
    Start() {
      return new NoState(0);
    },

    AddText(z, text) {
      collector(text);
      return z;
    },

    AddBreak(rstrs, n) {
      collector(TaggedTextOps.Literals.lineBreak);
      collector(TaggedTextOps.tagSpace(spaces(n)));
      return rstrs;
    },

    AddTag(z, _arg1, _arg2, _arg3) {
      return z;
    },

    Finish(rstrs) {
      return new NoResult(0);
    },

    [_Symbol.reflection]() {
      return {
        interfaces: ["Microsoft.FSharp.Compiler.Layout.LayoutRenderer"]
      };
    }

  };
}
export function bufferR(os) {
  return {
    Start() {
      return new NoState(0);
    },

    AddText(z, s) {
      var clo1;
      (clo1 = Microsoft.FSharp.Core.Printf.bprintf(os), CurriedLambda(arg10 => CurriedLambda(clo1)(arg10)))(printf("%s"), s.Text);
      return z;
    },

    AddBreak(z, n) {
      var clo1;
      Microsoft.FSharp.Core.Printf.bprintf(os)(printf("\n"));
      (clo1 = Microsoft.FSharp.Core.Printf.bprintf(os), CurriedLambda(arg10 => CurriedLambda(clo1)(arg10)))(printf("%s"), spaces(n));
      return z;
    },

    AddTag(z, tag, attrs, start) {
      return z;
    },

    Finish(z) {
      return new NoResult(0);
    },

    [_Symbol.reflection]() {
      return {
        interfaces: ["Microsoft.FSharp.Compiler.Layout.LayoutRenderer"]
      };
    }

  };
}
export function showL(layout) {
  return renderL(stringR, layout);
}
export function bufferL(os, layout) {
  renderL(bufferR(os), layout);
}