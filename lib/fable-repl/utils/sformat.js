import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives, Tuple, makeGeneric, Interface, Any, equals as equals_1 } from "../fable-core/Util";
import { map, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { create } from "../fable-core/Set";
import Comparer from "../fable-core/Comparer";
import { fold } from "../fable-core/Seq";
import { getValue } from "../fable-core/Option";
export class LayoutTag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.StructuredFormat.LayoutTag",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ActivePatternCase"], ["ActivePatternResult"], ["Alias"], ["Class"], ["Union"], ["UnionCase"], ["Delegate"], ["Enum"], ["Event"], ["Field"], ["Interface"], ["Keyword"], ["LineBreak"], ["Local"], ["Record"], ["RecordField"], ["Method"], ["Member"], ["ModuleBinding"], ["Module"], ["Namespace"], ["NumericLiteral"], ["Operator"], ["Parameter"], ["Property"], ["Space"], ["StringLiteral"], ["Struct"], ["TypeParameter"], ["Text"], ["Punctuation"], ["UnknownType"], ["UnknownEntity"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

}
setType("Internal.Utilities.StructuredFormat.LayoutTag", LayoutTag);
export class Joint {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.StructuredFormat.Joint",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Unbreakable"], ["Breakable", "number"], ["Broken", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals_1(this.data, other.data);
  }

}
setType("Internal.Utilities.StructuredFormat.Joint", Joint);
export class Layout {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.StructuredFormat.Layout",
      interfaces: ["FSharpUnion"],
      cases: [["ObjLeaf", "boolean", Any, "boolean"], ["Leaf", "boolean", Interface("Internal.Utilities.StructuredFormat.TaggedText"), "boolean"], ["Node", "boolean", Layout, "boolean", Layout, "boolean", Joint], ["Attr", "string", makeGeneric(List, {
        T: Tuple(["string", "string"])
      }), Layout]]
    };
  }

}
setType("Internal.Utilities.StructuredFormat.Layout", Layout);
export const TaggedTextOps = function (__exports) {
  const tag = __exports.tag = function (tag_1, text) {
    return {
      get Tag() {
        return tag_1;
      },

      get Text() {
        return text;
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Internal.Utilities.StructuredFormat.TaggedText"]
        };
      }

    };
  };

  const length = __exports.length = function (tt) {
    return tt.Text.length | 0;
  };

  const toText = __exports.toText = function (tt) {
    return tt.Text;
  };

  const tagAlias = __exports.tagAlias = function (t) {
    return tag(new LayoutTag(2), t);
  };

  const keywordFunctions = __exports.keywordFunctions = create(ofArray(["raise", "reraise", "typeof", "typedefof", "sizeof", "nameof"]), new Comparer(comparePrimitives));
  const keywordTypes = __exports.keywordTypes = create(ofArray(["array", "bigint", "bool", "byref", "byte", "char", "decimal", "double", "float", "float32", "int", "int8", "int16", "int32", "int64", "list", "nativeint", "obj", "sbyte", "seq", "single", "string", "unit", "uint", "uint8", "uint16", "uint32", "uint64", "unativeint"]), new Comparer(comparePrimitives));

  const tagClass = __exports.tagClass = function (name) {
    if (keywordTypes.has(name)) {
      return tag(new LayoutTag(11), name);
    } else {
      return tag(new LayoutTag(3), name);
    }
  };

  const tagUnionCase = __exports.tagUnionCase = function (t) {
    return tag(new LayoutTag(5), t);
  };

  const tagDelegate = __exports.tagDelegate = function (t) {
    return tag(new LayoutTag(6), t);
  };

  const tagEnum = __exports.tagEnum = function (t) {
    return tag(new LayoutTag(7), t);
  };

  const tagEvent = __exports.tagEvent = function (t) {
    return tag(new LayoutTag(8), t);
  };

  const tagField = __exports.tagField = function (t) {
    return tag(new LayoutTag(9), t);
  };

  const tagInterface = __exports.tagInterface = function (t) {
    return tag(new LayoutTag(10), t);
  };

  const tagKeyword = __exports.tagKeyword = function (t) {
    return tag(new LayoutTag(11), t);
  };

  const tagLineBreak = __exports.tagLineBreak = function (t) {
    return tag(new LayoutTag(12), t);
  };

  const tagLocal = __exports.tagLocal = function (t) {
    return tag(new LayoutTag(13), t);
  };

  const tagRecord = __exports.tagRecord = function (t) {
    return tag(new LayoutTag(14), t);
  };

  const tagRecordField = __exports.tagRecordField = function (t) {
    return tag(new LayoutTag(15), t);
  };

  const tagMethod = __exports.tagMethod = function (t) {
    return tag(new LayoutTag(16), t);
  };

  const tagModule = __exports.tagModule = function (t) {
    return tag(new LayoutTag(19), t);
  };

  const tagModuleBinding = __exports.tagModuleBinding = function (name) {
    if (keywordFunctions.has(name)) {
      return tag(new LayoutTag(11), name);
    } else {
      return tag(new LayoutTag(18), name);
    }
  };

  const tagNamespace = __exports.tagNamespace = function (t) {
    return tag(new LayoutTag(20), t);
  };

  const tagNumericLiteral = __exports.tagNumericLiteral = function (t) {
    return tag(new LayoutTag(21), t);
  };

  const tagOperator = __exports.tagOperator = function (t) {
    return tag(new LayoutTag(22), t);
  };

  const tagParameter = __exports.tagParameter = function (t) {
    return tag(new LayoutTag(23), t);
  };

  const tagProperty = __exports.tagProperty = function (t) {
    return tag(new LayoutTag(24), t);
  };

  const tagSpace = __exports.tagSpace = function (t) {
    return tag(new LayoutTag(25), t);
  };

  const tagStringLiteral = __exports.tagStringLiteral = function (t) {
    return tag(new LayoutTag(26), t);
  };

  const tagStruct = __exports.tagStruct = function (t) {
    return tag(new LayoutTag(27), t);
  };

  const tagTypeParameter = __exports.tagTypeParameter = function (t) {
    return tag(new LayoutTag(28), t);
  };

  const tagText = __exports.tagText = function (t) {
    return tag(new LayoutTag(29), t);
  };

  const tagPunctuation = __exports.tagPunctuation = function (t) {
    return tag(new LayoutTag(30), t);
  };

  const Literals = __exports.Literals = function (__exports) {
    const lineBreak = __exports.lineBreak = tagLineBreak("\n");
    const space = __exports.space = tagSpace(" ");
    const comma = __exports.comma = tagPunctuation(",");
    const semicolon = __exports.semicolon = tagPunctuation(";");
    const leftParen = __exports.leftParen = tagPunctuation("(");
    const rightParen = __exports.rightParen = tagPunctuation(")");
    const leftBracket = __exports.leftBracket = tagPunctuation("[");
    const rightBracket = __exports.rightBracket = tagPunctuation("]");
    const leftBrace = __exports.leftBrace = tagPunctuation("{");
    const rightBrace = __exports.rightBrace = tagPunctuation("}");
    const equals = __exports.equals = tagOperator("=");
    const arrow = __exports.arrow = tagPunctuation("->");
    const questionMark = __exports.questionMark = tagPunctuation("?");
    return __exports;
  }({});

  return __exports;
}({});
export const LayoutOps = function (__exports) {
  const juxtLeft = __exports.juxtLeft = function (_arg1) {
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
  };

  const juxtRight = __exports.juxtRight = function (_arg1) {
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
  };

  const mkNode = __exports.mkNode = function (l, r, joint) {
    const jl = juxtLeft(l);
    const jm = juxtRight(l) ? true : juxtLeft(r);
    const jr = juxtRight(r);
    return new Layout(2, [jl, l, jm, r, jr, joint]);
  };

  const objL = __exports.objL = function (value) {
    if (typeof value === "string") {
      return new Layout(1, [false, TaggedTextOps.tag(new LayoutTag(29), value), false]);
    } else {
      return new Layout(0, [false, value, false]);
    }
  };

  const sLeaf = __exports.sLeaf = function (l, t, r) {
    return new Layout(1, [l, t, r]);
  };

  const wordL = __exports.wordL = function (text) {
    return sLeaf(false, text, false);
  };

  const sepL = __exports.sepL = function (text) {
    return sLeaf(true, text, true);
  };

  const rightL = __exports.rightL = function (text) {
    return sLeaf(true, text, false);
  };

  const leftL = __exports.leftL = function (text) {
    return sLeaf(false, text, true);
  };

  const emptyL = __exports.emptyL = sLeaf(true, TaggedTextOps.tag(new LayoutTag(29), ""), true);

  const isEmptyL = __exports.isEmptyL = function (layout) {
    const $var1 = layout.tag === 1 ? layout.data[0] ? layout.data[2] ? [0, layout.data[1]] : [1] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return $var1[1].Text === "";

      case 1:
        return false;
    }
  };

  const aboveL = __exports.aboveL = function (layout1, layout2) {
    return mkNode(layout1, layout2, new Joint(2, 0));
  };

  const tagAttrL = __exports.tagAttrL = function (text, maps, layout) {
    return new Layout(3, [text, maps, layout]);
  };

  const apply2 = __exports.apply2 = function (f, l, r) {
    if (isEmptyL(l)) {
      return r;
    } else if (isEmptyL(r)) {
      return l;
    } else {
      return f(l, r);
    }
  };

  const op_HatHat = __exports.op_HatHat = function (layout1, layout2) {
    return mkNode(layout1, layout2, new Joint(0));
  };

  const op_PlusPlus = __exports.op_PlusPlus = function (layout1, layout2) {
    return mkNode(layout1, layout2, new Joint(1, 0));
  };

  const op_MinusMinus = __exports.op_MinusMinus = function (layout1, layout2) {
    return mkNode(layout1, layout2, new Joint(1, 1));
  };

  const op_MinusMinusMinus = __exports.op_MinusMinusMinus = function (layout1, layout2) {
    return mkNode(layout1, layout2, new Joint(1, 2));
  };

  const op_AtAt = __exports.op_AtAt = function (layout1, layout2) {
    return apply2(function (l, r) {
      return mkNode(l, r, new Joint(2, 0));
    }, layout1, layout2);
  };

  const op_AtAtMinus = __exports.op_AtAtMinus = function (layout1, layout2) {
    return apply2(function (l, r) {
      return mkNode(l, r, new Joint(2, 1));
    }, layout1, layout2);
  };

  const op_AtAtMinusMinus = __exports.op_AtAtMinusMinus = function (layout1, layout2) {
    return apply2(function (l, r) {
      return mkNode(l, r, new Joint(2, 2));
    }, layout1, layout2);
  };

  const tagListL = __exports.tagListL = function (tagger, _arg1) {
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
  };

  const commaListL = __exports.commaListL = function (layouts) {
    return tagListL(function (prefixL) {
      return op_HatHat(prefixL, rightL(TaggedTextOps.Literals.comma));
    }, layouts);
  };

  const semiListL = __exports.semiListL = function (layouts) {
    return tagListL(function (prefixL) {
      return op_HatHat(prefixL, rightL(TaggedTextOps.Literals.semicolon));
    }, layouts);
  };

  const spaceListL = __exports.spaceListL = function (layouts) {
    return tagListL(function (prefixL) {
      return prefixL;
    }, layouts);
  };

  const sepListL = __exports.sepListL = function (layout1, layouts) {
    return tagListL(function (prefixL) {
      return op_HatHat(prefixL, layout1);
    }, layouts);
  };

  const bracketL = __exports.bracketL = function (layout) {
    return op_HatHat(leftL(TaggedTextOps.Literals.leftParen), op_HatHat(layout, rightL(TaggedTextOps.Literals.rightParen)));
  };

  const tupleL = __exports.tupleL = function (layouts) {
    return bracketL(sepListL(sepL(TaggedTextOps.Literals.comma), layouts));
  };

  const aboveListL = __exports.aboveListL = function (layouts) {
    if (layouts.tail != null) {
      if (layouts.tail.tail == null) {
        return layouts.head;
      } else {
        return fold(function (pre, y) {
          return op_AtAt(pre, y);
        }, layouts.head, layouts.tail);
      }
    } else {
      return emptyL;
    }
  };

  const optionL = __exports.optionL = function (selector, value) {
    if (value != null) {
      return op_MinusMinus(wordL(TaggedTextOps.tagUnionCase("Some")), selector(getValue(value)));
    } else {
      return wordL(TaggedTextOps.tagUnionCase("None"));
    }
  };

  const listL = __exports.listL = function (selector, value) {
    return op_HatHat(leftL(TaggedTextOps.Literals.leftBracket), op_HatHat(sepListL(sepL(TaggedTextOps.Literals.semicolon), map(selector, value)), rightL(TaggedTextOps.Literals.rightBracket)));
  };

  const squareBracketL = __exports.squareBracketL = function (layout) {
    return op_HatHat(leftL(TaggedTextOps.Literals.leftBracket), op_HatHat(layout, rightL(TaggedTextOps.Literals.rightBracket)));
  };

  const braceL = __exports.braceL = function (layout) {
    return op_HatHat(leftL(TaggedTextOps.Literals.leftBrace), op_HatHat(layout, rightL(TaggedTextOps.Literals.rightBrace)));
  };

  const boundedUnfoldL = __exports.boundedUnfoldL = function (itemL, project, stopShort, z, maxLength) {
    const consume = function (n, z_1) {
      if (stopShort(z_1)) {
        return ofArray([wordL(TaggedTextOps.tagPunctuation("..."))]);
      } else {
        const matchValue = project(z_1);

        if (matchValue != null) {
          const z_2 = getValue(matchValue)[1];
          const x = getValue(matchValue)[0];

          if (n <= 0) {
            return ofArray([wordL(TaggedTextOps.tagPunctuation("..."))]);
          } else {
            return new List(itemL(x), consume(n - 1, z_2));
          }
        } else {
          return new List();
        }
      }
    };

    return consume(maxLength, z);
  };

  const unfoldL = __exports.unfoldL = function (selector, folder, state, count) {
    return boundedUnfoldL(selector, folder, function (_arg1) {
      return false;
    }, state, count);
  };

  return __exports;
}({});