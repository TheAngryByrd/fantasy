import { EcmaMscorlibILGlobals, ILType, ILInstr, splitNamespace } from "../absil/il";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import Lazy from "../fable-core/Lazy";
import { forAll, exists, empty, singleton, collect, delay, foldBack, last, toList, takeWhile, sortWith } from "../fable-core/Seq";
import { List as List_1, Array as _Array } from "../absil/illib";
import { mkFileIndexRange, mkPos, rangeN, mkRange, unionRanges, range as range_1, pos as pos_1, posEq, posGeq } from "./range";
import { mapIndexed, map } from "../fable-core/Array";
import { Function as _Function, equalsRecords, Any, Tuple, Option, makeGeneric, comparePrimitives, compareUnions, equals, Array as _Array_1 } from "../fable-core/Util";
import { join, trim } from "../fable-core/String";
import { choose, replicate, map as map_1, ofArray, append } from "../fable-core/List";
import List from "../fable-core/List";
import { Microsoft } from "../fcs-fable/adapters";
import Long from "../fable-core/Long";
import { defaultArg, makeSome, getValue } from "../fable-core/Option";
import { Deprecated, Error as _Error, errorR } from "./ErrorLogger";
import { CompilerGeneratedNameSuffix, GetBasicNameOfPossibleCompilerGeneratedName, CompileOpName } from "./PrettyNaming";
import { SR } from "../codegen/FSComp";
import { create } from "../fable-core/Map";
export const FsiDynamicModulePrefix = "FSI_";
export const FSharpLib = function (__exports) {
  const Root = __exports.Root = "Microsoft.FSharp";
  const RootPath = __exports.RootPath = splitNamespace(Root);
  const Core = __exports.Core = Root + ".Core";
  const CorePath = __exports.CorePath = splitNamespace(Core);
  return __exports;
}({});
export class XmlDocCollector {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.XmlDocCollector",
      properties: {}
    };
  }

  constructor() {
    this.savedLines = [];
    this.savedGrabPoints = [];
    this.savedGrabPointsAsArray = new Lazy(() => Array.from(sortWith((p1, p2) => this.posCompare(p1, p2), Array.from(this.savedGrabPoints))));
    this.savedLinesAsArray = new Lazy(() => Array.from(sortWith((tupledArg, tupledArg_1) => this.posCompare(tupledArg[1], tupledArg_1[1]), Array.from(this.savedLines))));
  }

  AddGrabPoint(pos) {
    this.check();
    this.savedGrabPoints.push(pos);
  }

  AddXmlDocLine(line, pos) {
    this.check();
    this.savedLines.push([line, pos]);
  }

  LinesBefore(grabPointPos) {
    try {
      const lines = this.savedLinesAsArray.value;
      const grabPoints = this.savedGrabPointsAsArray.value;
      const firstLineIndexAfterGrabPoint = _Array.findFirstIndexWhereTrue(lines, tupledArg => posGeq(tupledArg[1], grabPointPos)) | 0;
      const grabPointIndex = _Array.findFirstIndexWhereTrue(grabPoints, pos => posGeq(pos, grabPointPos)) | 0;
      let firstLineIndexAfterPrevGrabPoint;

      if (grabPointIndex === 0) {
        firstLineIndexAfterPrevGrabPoint = 0;
      } else {
        const prevGrabPointPos = grabPoints[grabPointIndex - 1];
        firstLineIndexAfterPrevGrabPoint = _Array.findFirstIndexWhereTrue(lines, tupledArg_1 => posGeq(tupledArg_1[1], prevGrabPointPos)) | 0;
      }

      const lines_1 = lines.slice(firstLineIndexAfterPrevGrabPoint, firstLineIndexAfterGrabPoint - 1 + 1).slice().reverse();

      if (lines_1.length === 0) {
        return [];
      } else {
        let firstLineNumber;
        let copyOfStruct = lines_1[0][1];
        firstLineNumber = copyOfStruct.Line | 0;
        return map(tupledArg_2 => tupledArg_2[1][0], Array.from(takeWhile(tupledArg_3 => tupledArg_3[0] === tupledArg_3[1][1].Line, mapIndexed((i, x) => [firstLineNumber - i, x], lines_1, Array))), Array).slice().reverse();
      }
    } catch (e) {
      return [];
    }
  }

  posCompare(p1, p2) {
    if (posGeq(p1, p2)) {
      return 1;
    } else if (posEq(p1, p2)) {
      return 0;
    } else {
      return -1 | 0;
    }
  }

  check() {}

}
setType("Microsoft.FSharp.Compiler.Ast.XmlDocCollector", XmlDocCollector);
export class XmlDoc {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.XmlDoc",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["XmlDoc", _Array_1("string")]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  static get Empty() {
    return XmlDocStatics.Empty;
  }

  get NonEmpty() {
    return this.data.length !== 0;
  }

  static Merge(_arg2, _arg1) {
    return new XmlDoc(0, _arg2.data.concat(_arg1.data));
  }

  static Process(_arg3) {
    const processLines = function (lines) {
      processLines: while (true) {
        if (lines.tail != null) {
          const lineAT = trim(lines.head, "start", " ");

          if (lineAT === "") {
            lines = lines.tail;
            continue processLines;
          } else if (lineAT.indexOf("<") === 0) {
            return lines;
          } else {
            return append(ofArray(["<summary>"]), append(map_1(function (line) {
              return Microsoft.FSharp.Core.XmlAdapters.escape(line);
            }, lines), ofArray(["</summary>"])));
          }
        } else {
          return new List();
        }
      }
    };

    const lines_1 = processLines(toList(_arg3.data));

    if (lines_1.tail == null) {
      return XmlDoc.Empty;
    } else {
      return new XmlDoc(0, Array.from(lines_1));
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.XmlDoc", XmlDoc);
export class XmlDocStatics {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.XmlDocStatics",
      properties: {
        Empty: XmlDoc
      }
    };
  }

  constructor() {}

  static [".cctor"]() {
    XmlDocStatics.empty = new XmlDoc(0, []);
  }

  static get Empty() {
    return XmlDocStatics.empty;
  }

}
setType("Microsoft.FSharp.Compiler.Ast.XmlDocStatics", XmlDocStatics);
XmlDocStatics[".cctor"]();
export class PreXmlDoc {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.PreXmlDoc",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["PreXmlMerge", PreXmlDoc, PreXmlDoc], ["PreXmlDoc", pos_1, XmlDocCollector], ["PreXmlDocEmpty"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  ToXmlDoc() {
    if (this.tag === 2) {
      return XmlDoc.Empty;
    } else if (this.tag === 1) {
      const lines = this.data[1].LinesBefore(this.data[0]);

      if (lines.length === 0) {
        return XmlDoc.Empty;
      } else {
        return new XmlDoc(0, lines);
      }
    } else {
      return ((arg00, arg10) => XmlDoc.Merge(arg00, arg10))(this.data[0].ToXmlDoc(), this.data[1].ToXmlDoc());
    }
  }

  static CreateFromGrabPoint(collector, grabPointPos) {
    collector.AddGrabPoint(grabPointPos);
    return new PreXmlDoc(1, [grabPointPos, collector]);
  }

  static get Empty() {
    return new PreXmlDoc(2);
  }

  static Merge(a, b) {
    return new PreXmlDoc(0, [a, b]);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.PreXmlDoc", PreXmlDoc);
export class ParserDetail {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ParserDetail",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Ok"], ["ThereWereSignificantParseErrorsSoDoNotTypecheckThisNode"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ParserDetail", ParserDetail);
export class Ident {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.Ident",
      interfaces: ["FSharpRecord"],
      properties: {
        text: "string",
        range: range_1
      }
    };
  }

  constructor(text, range) {
    this.text = text;
    this.range = range;
  }

  get idText() {
    return this.text;
  }

  get idRange() {
    return this.range;
  }

  ToString() {
    return this.text;
  }

}
setType("Microsoft.FSharp.Compiler.Ast.Ident", Ident);
export class LongIdentWithDots {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.LongIdentWithDots",
      interfaces: ["FSharpUnion"],
      cases: [["LongIdentWithDots", makeGeneric(List, {
        T: Ident
      }), makeGeneric(List, {
        T: range_1
      })]]
    };
  }

  get Range() {
    var copyOfStruct;
    var copyOfStruct_1;
    const $var1 = this.data[0].tail != null ? this.data[0].tail.tail == null ? this.data[1].tail != null ? this.data[1].tail.tail == null ? [2, this.data[0].head, this.data[1].head] : [4, this.data[1], this.data[0].head, this.data[0].tail] : [1, this.data[0].head] : this.data[1].tail == null ? [3, this.data[0].head, this.data[0].tail] : [4, this.data[1], this.data[0].head, this.data[0].tail] : [0];

    switch ($var1[0]) {
      case 0:
        throw new Error("rangeOfLidwd");

      case 1:
        return $var1[1].idRange;

      case 2:
        return unionRanges($var1[1].idRange, $var1[2]);

      case 3:
        return unionRanges($var1[1].idRange, (copyOfStruct = last($var1[2]), copyOfStruct.idRange));

      case 4:
        return unionRanges(last($var1[1]), unionRanges($var1[2].idRange, (copyOfStruct_1 = last($var1[3]), copyOfStruct_1.idRange)));
    }
  }

  get Lid() {
    return this.data[0];
  }

  get ThereIsAnExtraDotAtTheEnd() {
    return this.data[0].length === this.data[1].length;
  }

  get RangeSansAnyExtraDot() {
    var copyOfStruct;

    if (this.data[0].tail != null) {
      if (this.data[0].tail.tail == null) {
        return this.data[0].head.idRange;
      } else {
        const nonExtraDots = this.data[1].length === this.data[0].tail.length ? this.data[1] : List_1.take(this.data[0].tail.length, this.data[1]);
        return unionRanges(last(nonExtraDots), unionRanges(this.data[0].head.idRange, (copyOfStruct = last(this.data[0].tail), copyOfStruct.idRange)));
      }
    } else {
      throw new Error("rangeOfLidwd");
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.LongIdentWithDots", LongIdentWithDots);
export class TyparStaticReq {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.TyparStaticReq",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NoStaticReq"], ["HeadTypeStaticReq"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.TyparStaticReq", TyparStaticReq);
export class SynTypar {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynTypar",
      interfaces: ["FSharpUnion"],
      cases: [["Typar", Ident, TyparStaticReq, "boolean"]]
    };
  }

  get Range() {
    return this.data[0].idRange;
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynTypar", SynTypar);
export class SynConst {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynConst",
      interfaces: ["FSharpUnion"],
      cases: [["Unit"], ["Bool", "boolean"], ["SByte", "number"], ["Byte", "number"], ["Int16", "number"], ["UInt16", "number"], ["Int32", "number"], ["UInt32", "number"], ["Int64", Long], ["UInt64", Long], ["IntPtr", Long], ["UIntPtr", Long], ["Single", "number"], ["Double", "number"], ["Char", "string"], ["Decimal", "number"], ["UserNum", "string", "string"], ["String", "string", range_1], ["Bytes", _Array_1(Uint8Array, true), range_1], ["UInt16s", _Array_1(Uint16Array, true)], ["Measure", SynConst, SynMeasure]]
    };
  }

  Range(dflt) {
    const $var2 = this.tag === 17 ? [0, this.data[1]] : this.tag === 18 ? [0, this.data[1]] : [1];

    switch ($var2[0]) {
      case 0:
        return $var2[1];

      case 1:
        return dflt;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynConst", SynConst);
export class SynMeasure {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynMeasure",
      interfaces: ["FSharpUnion"],
      cases: [["Named", makeGeneric(List, {
        T: Ident
      }), range_1], ["Product", SynMeasure, SynMeasure, range_1], ["Seq", makeGeneric(List, {
        T: SynMeasure
      }), range_1], ["Divide", SynMeasure, SynMeasure, range_1], ["Power", SynMeasure, SynRationalConst, range_1], ["One"], ["Anon", range_1], ["Var", SynTypar, range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynMeasure", SynMeasure);
export class SynRationalConst {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynRationalConst",
      interfaces: ["FSharpUnion"],
      cases: [["Integer", "number"], ["Rational", "number", "number", range_1], ["Negate", SynRationalConst]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynRationalConst", SynRationalConst);
export class SynAccess {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynAccess",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Public"], ["Internal"], ["Private"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynAccess", SynAccess);
export class SequencePointInfoForTarget {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SequencePointInfoForTarget",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["SequencePointAtTarget"], ["SuppressSequencePointAtTarget"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SequencePointInfoForTarget", SequencePointInfoForTarget);
export class SequencePointInfoForSeq {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SequencePointInfoForSeq",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["SequencePointsAtSeq"], ["SuppressSequencePointOnExprOfSequential"], ["SuppressSequencePointOnStmtOfSequential"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SequencePointInfoForSeq", SequencePointInfoForSeq);
export class SequencePointInfoForTry {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SequencePointInfoForTry",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["SequencePointAtTry", range_1], ["SequencePointInBodyOfTry"], ["NoSequencePointAtTry"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SequencePointInfoForTry", SequencePointInfoForTry);
export class SequencePointInfoForWith {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SequencePointInfoForWith",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["SequencePointAtWith", range_1], ["NoSequencePointAtWith"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SequencePointInfoForWith", SequencePointInfoForWith);
export class SequencePointInfoForFinally {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SequencePointInfoForFinally",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["SequencePointAtFinally", range_1], ["NoSequencePointAtFinally"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SequencePointInfoForFinally", SequencePointInfoForFinally);
export class SequencePointInfoForForLoop {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SequencePointInfoForForLoop",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["SequencePointAtForLoop", range_1], ["NoSequencePointAtForLoop"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SequencePointInfoForForLoop", SequencePointInfoForForLoop);
export class SequencePointInfoForWhileLoop {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SequencePointInfoForWhileLoop",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["SequencePointAtWhileLoop", range_1], ["NoSequencePointAtWhileLoop"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SequencePointInfoForWhileLoop", SequencePointInfoForWhileLoop);
export class SequencePointInfoForBinding {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SequencePointInfoForBinding",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["SequencePointAtBinding", range_1], ["NoSequencePointAtDoBinding"], ["NoSequencePointAtLetBinding"], ["NoSequencePointAtStickyBinding"], ["NoSequencePointAtInvisibleBinding"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  Combine(y) {
    const matchValue = [this, y];

    if (matchValue[0].tag === 0) {
      return matchValue[0];
    } else if (matchValue[1].tag === 0) {
      return matchValue[1];
    } else {
      return this;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SequencePointInfoForBinding", SequencePointInfoForBinding);
export class SeqExprOnly {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SeqExprOnly",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["SeqExprOnly", "boolean"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SeqExprOnly", SeqExprOnly);
export class SynBindingKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynBindingKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["StandaloneExpression"], ["NormalBinding"], ["DoBinding"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynBindingKind", SynBindingKind);
export class SynTyparDecl {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynTyparDecl",
      interfaces: ["FSharpUnion"],
      cases: [["TyparDecl", makeGeneric(List, {
        T: SynAttribute
      }), SynTypar]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynTyparDecl", SynTyparDecl);
export class SynTypeConstraint {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynTypeConstraint",
      interfaces: ["FSharpUnion"],
      cases: [["WhereTyparIsValueType", SynTypar, range_1], ["WhereTyparIsReferenceType", SynTypar, range_1], ["WhereTyparIsUnmanaged", SynTypar, range_1], ["WhereTyparSupportsNull", SynTypar, range_1], ["WhereTyparIsComparable", SynTypar, range_1], ["WhereTyparIsEquatable", SynTypar, range_1], ["WhereTyparDefaultsToType", SynTypar, SynType, range_1], ["WhereTyparSubtypeOfType", SynTypar, SynType, range_1], ["WhereTyparSupportsMember", makeGeneric(List, {
        T: SynType
      }), SynMemberSig, range_1], ["WhereTyparIsEnum", SynTypar, makeGeneric(List, {
        T: SynType
      }), range_1], ["WhereTyparIsDelegate", SynTypar, makeGeneric(List, {
        T: SynType
      }), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynTypeConstraint", SynTypeConstraint);
export class SynType {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynType",
      interfaces: ["FSharpUnion"],
      cases: [["LongIdent", LongIdentWithDots], ["App", SynType, Option(range_1), makeGeneric(List, {
        T: SynType
      }), makeGeneric(List, {
        T: range_1
      }), Option(range_1), "boolean", range_1], ["LongIdentApp", SynType, LongIdentWithDots, Option(range_1), makeGeneric(List, {
        T: SynType
      }), makeGeneric(List, {
        T: range_1
      }), Option(range_1), range_1], ["Tuple", makeGeneric(List, {
        T: Tuple(["boolean", SynType])
      }), range_1], ["StructTuple", makeGeneric(List, {
        T: Tuple(["boolean", SynType])
      }), range_1], ["Array", "number", SynType, range_1], ["Fun", SynType, SynType, range_1], ["Var", SynTypar, range_1], ["Anon", range_1], ["WithGlobalConstraints", SynType, makeGeneric(List, {
        T: SynTypeConstraint
      }), range_1], ["HashConstraint", SynType, range_1], ["MeasureDivide", SynType, SynType, range_1], ["MeasurePower", SynType, SynRationalConst, range_1], ["StaticConstant", SynConst, range_1], ["StaticConstantExpr", SynExpr, range_1], ["StaticConstantNamed", SynType, SynType, range_1]]
    };
  }

  get Range() {
    const $var3 = this.tag === 2 ? [0, this.data[6]] : this.tag === 3 ? [0, this.data[1]] : this.tag === 4 ? [0, this.data[1]] : this.tag === 5 ? [0, this.data[2]] : this.tag === 6 ? [0, this.data[2]] : this.tag === 7 ? [0, this.data[1]] : this.tag === 8 ? [0, this.data] : this.tag === 9 ? [0, this.data[2]] : this.tag === 13 ? [0, this.data[1]] : this.tag === 14 ? [0, this.data[1]] : this.tag === 15 ? [0, this.data[2]] : this.tag === 10 ? [0, this.data[1]] : this.tag === 11 ? [0, this.data[2]] : this.tag === 12 ? [0, this.data[2]] : this.tag === 0 ? [1] : [0, this.data[6]];

    switch ($var3[0]) {
      case 0:
        return $var3[1];

      case 1:
        return this.data.Range;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynType", SynType);
export class SynExpr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynExpr",
      interfaces: ["FSharpUnion"],
      cases: [["Paren", SynExpr, range_1, Option(range_1), range_1], ["Quote", SynExpr, "boolean", SynExpr, "boolean", range_1], ["Const", SynConst, range_1], ["Typed", SynExpr, SynType, range_1], ["Tuple", makeGeneric(List, {
        T: SynExpr
      }), makeGeneric(List, {
        T: range_1
      }), range_1], ["StructTuple", makeGeneric(List, {
        T: SynExpr
      }), makeGeneric(List, {
        T: range_1
      }), range_1], ["ArrayOrList", "boolean", makeGeneric(List, {
        T: SynExpr
      }), range_1], ["Record", Option(Tuple([SynType, SynExpr, range_1, Option(Tuple([range_1, Option(pos_1)])), range_1])), Option(Tuple([SynExpr, Tuple([range_1, Option(pos_1)])])), makeGeneric(List, {
        T: Tuple([Tuple([LongIdentWithDots, "boolean"]), Option(SynExpr), Option(Tuple([range_1, Option(pos_1)]))])
      }), range_1], ["New", "boolean", SynType, SynExpr, range_1], ["ObjExpr", SynType, Option(Tuple([SynExpr, Option(Ident)])), makeGeneric(List, {
        T: SynBinding
      }), makeGeneric(List, {
        T: SynInterfaceImpl
      }), range_1, range_1], ["While", SequencePointInfoForWhileLoop, SynExpr, SynExpr, range_1], ["For", SequencePointInfoForForLoop, Ident, SynExpr, "boolean", SynExpr, SynExpr, range_1], ["ForEach", SequencePointInfoForForLoop, SeqExprOnly, "boolean", SynPat, SynExpr, SynExpr, range_1], ["ArrayOrListOfSeqExpr", "boolean", SynExpr, range_1], ["CompExpr", "boolean", Any, SynExpr, range_1], ["Lambda", "boolean", "boolean", SynSimplePats, SynExpr, range_1], ["MatchLambda", "boolean", range_1, makeGeneric(List, {
        T: SynMatchClause
      }), SequencePointInfoForBinding, range_1], ["Match", SequencePointInfoForBinding, SynExpr, makeGeneric(List, {
        T: SynMatchClause
      }), "boolean", range_1], ["Do", SynExpr, range_1], ["Assert", SynExpr, range_1], ["App", "number", "boolean", SynExpr, SynExpr, range_1], ["TypeApp", SynExpr, range_1, makeGeneric(List, {
        T: SynType
      }), makeGeneric(List, {
        T: range_1
      }), Option(range_1), range_1, range_1], ["LetOrUse", "boolean", "boolean", makeGeneric(List, {
        T: SynBinding
      }), SynExpr, range_1], ["TryWith", SynExpr, range_1, makeGeneric(List, {
        T: SynMatchClause
      }), range_1, range_1, SequencePointInfoForTry, SequencePointInfoForWith], ["TryFinally", SynExpr, SynExpr, range_1, SequencePointInfoForTry, SequencePointInfoForFinally], ["Lazy", SynExpr, range_1], ["Sequential", SequencePointInfoForSeq, "boolean", SynExpr, SynExpr, range_1], ["IfThenElse", SynExpr, SynExpr, Option(SynExpr), SequencePointInfoForBinding, "boolean", range_1, range_1], ["Ident", Ident], ["LongIdent", "boolean", LongIdentWithDots, Option(Any), range_1], ["LongIdentSet", LongIdentWithDots, SynExpr, range_1], ["DotGet", SynExpr, range_1, LongIdentWithDots, range_1], ["DotSet", SynExpr, LongIdentWithDots, SynExpr, range_1], ["DotIndexedGet", SynExpr, makeGeneric(List, {
        T: SynIndexerArg
      }), range_1, range_1], ["DotIndexedSet", SynExpr, makeGeneric(List, {
        T: SynIndexerArg
      }), SynExpr, range_1, range_1, range_1], ["NamedIndexedPropertySet", LongIdentWithDots, SynExpr, SynExpr, range_1], ["DotNamedIndexedPropertySet", SynExpr, LongIdentWithDots, SynExpr, SynExpr, range_1], ["TypeTest", SynExpr, SynType, range_1], ["Upcast", SynExpr, SynType, range_1], ["Downcast", SynExpr, SynType, range_1], ["InferredUpcast", SynExpr, range_1], ["InferredDowncast", SynExpr, range_1], ["Null", range_1], ["AddressOf", "boolean", SynExpr, range_1, range_1], ["TraitCall", makeGeneric(List, {
        T: SynTypar
      }), SynMemberSig, SynExpr, range_1], ["JoinIn", SynExpr, range_1, SynExpr, range_1], ["ImplicitZero", range_1], ["YieldOrReturn", Tuple(["boolean", "boolean"]), SynExpr, range_1], ["YieldOrReturnFrom", Tuple(["boolean", "boolean"]), SynExpr, range_1], ["LetOrUseBang", SequencePointInfoForBinding, "boolean", "boolean", SynPat, SynExpr, SynExpr, range_1], ["DoBang", SynExpr, range_1], ["LibraryOnlyILAssembly", _Array_1(ILInstr), makeGeneric(List, {
        T: SynType
      }), makeGeneric(List, {
        T: SynExpr
      }), makeGeneric(List, {
        T: SynType
      }), range_1], ["LibraryOnlyStaticOptimization", makeGeneric(List, {
        T: SynStaticOptimizationConstraint
      }), SynExpr, SynExpr, range_1], ["LibraryOnlyUnionCaseFieldGet", SynExpr, makeGeneric(List, {
        T: Ident
      }), "number", range_1], ["LibraryOnlyUnionCaseFieldSet", SynExpr, makeGeneric(List, {
        T: Ident
      }), "number", SynExpr, range_1], ["ArbitraryAfterError", "string", range_1], ["FromParseError", SynExpr, range_1], ["DiscardAfterMissingQualificationAfterDot", SynExpr, range_1], ["Fixed", SynExpr, range_1]]
    };
  }

  get Range() {
    const $var4 = this.tag === 1 ? [0, this.data[4]] : this.tag === 2 ? [0, this.data[1]] : this.tag === 3 ? [0, this.data[2]] : this.tag === 4 ? [0, this.data[2]] : this.tag === 5 ? [0, this.data[2]] : this.tag === 6 ? [0, this.data[2]] : this.tag === 7 ? [0, this.data[3]] : this.tag === 8 ? [0, this.data[3]] : this.tag === 9 ? [0, this.data[5]] : this.tag === 10 ? [0, this.data[3]] : this.tag === 11 ? [0, this.data[6]] : this.tag === 12 ? [0, this.data[6]] : this.tag === 14 ? [0, this.data[3]] : this.tag === 13 ? [0, this.data[2]] : this.tag === 15 ? [0, this.data[4]] : this.tag === 17 ? [0, this.data[4]] : this.tag === 16 ? [0, this.data[4]] : this.tag === 18 ? [0, this.data[1]] : this.tag === 19 ? [0, this.data[1]] : this.tag === 20 ? [0, this.data[4]] : this.tag === 21 ? [0, this.data[6]] : this.tag === 22 ? [0, this.data[4]] : this.tag === 23 ? [0, this.data[4]] : this.tag === 24 ? [0, this.data[2]] : this.tag === 26 ? [0, this.data[4]] : this.tag === 55 ? [0, this.data[1]] : this.tag === 56 ? [0, this.data[1]] : this.tag === 57 ? [0, this.data[1]] : this.tag === 27 ? [0, this.data[6]] : this.tag === 29 ? [0, this.data[3]] : this.tag === 30 ? [0, this.data[2]] : this.tag === 35 ? [0, this.data[3]] : this.tag === 33 ? [0, this.data[3]] : this.tag === 34 ? [0, this.data[5]] : this.tag === 31 ? [0, this.data[3]] : this.tag === 32 ? [0, this.data[3]] : this.tag === 36 ? [0, this.data[4]] : this.tag === 53 ? [0, this.data[3]] : this.tag === 54 ? [0, this.data[4]] : this.tag === 51 ? [0, this.data[4]] : this.tag === 52 ? [0, this.data[3]] : this.tag === 37 ? [0, this.data[2]] : this.tag === 38 ? [0, this.data[2]] : this.tag === 43 ? [0, this.data[3]] : this.tag === 39 ? [0, this.data[2]] : this.tag === 45 ? [0, this.data[3]] : this.tag === 40 ? [0, this.data[1]] : this.tag === 41 ? [0, this.data[1]] : this.tag === 42 ? [0, this.data] : this.tag === 25 ? [0, this.data[1]] : this.tag === 44 ? [0, this.data[3]] : this.tag === 46 ? [0, this.data] : this.tag === 47 ? [0, this.data[2]] : this.tag === 48 ? [0, this.data[2]] : this.tag === 49 ? [0, this.data[6]] : this.tag === 50 ? [0, this.data[1]] : this.tag === 58 ? [0, this.data[1]] : this.tag === 28 ? [1] : [0, this.data[3]];

    switch ($var4[0]) {
      case 0:
        return $var4[1];

      case 1:
        return this.data.idRange;
    }
  }

  get RangeSansAnyExtraDot() {
    const $var5 = this.tag === 1 ? [0, this.data[4]] : this.tag === 2 ? [0, this.data[1]] : this.tag === 3 ? [0, this.data[2]] : this.tag === 4 ? [0, this.data[2]] : this.tag === 5 ? [0, this.data[2]] : this.tag === 6 ? [0, this.data[2]] : this.tag === 7 ? [0, this.data[3]] : this.tag === 8 ? [0, this.data[3]] : this.tag === 9 ? [0, this.data[5]] : this.tag === 10 ? [0, this.data[3]] : this.tag === 11 ? [0, this.data[6]] : this.tag === 12 ? [0, this.data[6]] : this.tag === 14 ? [0, this.data[3]] : this.tag === 13 ? [0, this.data[2]] : this.tag === 15 ? [0, this.data[4]] : this.tag === 17 ? [0, this.data[4]] : this.tag === 16 ? [0, this.data[4]] : this.tag === 18 ? [0, this.data[1]] : this.tag === 19 ? [0, this.data[1]] : this.tag === 20 ? [0, this.data[4]] : this.tag === 21 ? [0, this.data[6]] : this.tag === 22 ? [0, this.data[4]] : this.tag === 23 ? [0, this.data[4]] : this.tag === 24 ? [0, this.data[2]] : this.tag === 26 ? [0, this.data[4]] : this.tag === 55 ? [0, this.data[1]] : this.tag === 56 ? [0, this.data[1]] : this.tag === 27 ? [0, this.data[6]] : this.tag === 30 ? [0, this.data[2]] : this.tag === 35 ? [0, this.data[3]] : this.tag === 33 ? [0, this.data[3]] : this.tag === 34 ? [0, this.data[5]] : this.tag === 32 ? [0, this.data[3]] : this.tag === 36 ? [0, this.data[4]] : this.tag === 53 ? [0, this.data[3]] : this.tag === 54 ? [0, this.data[4]] : this.tag === 51 ? [0, this.data[4]] : this.tag === 52 ? [0, this.data[3]] : this.tag === 37 ? [0, this.data[2]] : this.tag === 38 ? [0, this.data[2]] : this.tag === 43 ? [0, this.data[3]] : this.tag === 39 ? [0, this.data[2]] : this.tag === 45 ? [0, this.data[3]] : this.tag === 40 ? [0, this.data[1]] : this.tag === 41 ? [0, this.data[1]] : this.tag === 42 ? [0, this.data] : this.tag === 25 ? [0, this.data[1]] : this.tag === 44 ? [0, this.data[3]] : this.tag === 46 ? [0, this.data] : this.tag === 47 ? [0, this.data[2]] : this.tag === 48 ? [0, this.data[2]] : this.tag === 49 ? [0, this.data[6]] : this.tag === 50 ? [0, this.data[1]] : this.tag === 31 ? [1] : this.tag === 29 ? [2] : this.tag === 57 ? [3] : this.tag === 58 ? [4] : this.tag === 28 ? [5] : [0, this.data[3]];

    switch ($var5[0]) {
      case 0:
        return $var5[1];

      case 1:
        if (this.data[2].ThereIsAnExtraDotAtTheEnd) {
          return unionRanges(this.data[0].Range, this.data[2].RangeSansAnyExtraDot);
        } else {
          return this.data[3];
        }

      case 2:
        return this.data[1].RangeSansAnyExtraDot;

      case 3:
        return this.data[0].Range;

      case 4:
        return this.data[1];

      case 5:
        return this.data.idRange;
    }
  }

  get RangeOfFirstPortion() {
    const $var6 = this.tag === 2 ? [0, this.data[1]] : this.tag === 3 ? [0, this.data[2]] : this.tag === 4 ? [0, this.data[2]] : this.tag === 5 ? [0, this.data[2]] : this.tag === 6 ? [0, this.data[2]] : this.tag === 7 ? [0, this.data[3]] : this.tag === 8 ? [0, this.data[3]] : this.tag === 9 ? [0, this.data[5]] : this.tag === 10 ? [0, this.data[3]] : this.tag === 11 ? [0, this.data[6]] : this.tag === 14 ? [0, this.data[3]] : this.tag === 13 ? [0, this.data[2]] : this.tag === 15 ? [0, this.data[4]] : this.tag === 17 ? [0, this.data[4]] : this.tag === 16 ? [0, this.data[4]] : this.tag === 18 ? [0, this.data[1]] : this.tag === 19 ? [0, this.data[1]] : this.tag === 21 ? [0, this.data[6]] : this.tag === 22 ? [0, this.data[4]] : this.tag === 23 ? [0, this.data[4]] : this.tag === 24 ? [0, this.data[2]] : this.tag === 55 ? [0, this.data[1]] : this.tag === 56 ? [0, this.data[1]] : this.tag === 57 ? [0, this.data[1]] : this.tag === 27 ? [0, this.data[6]] : this.tag === 29 ? [0, this.data[3]] : this.tag === 30 ? [0, this.data[2]] : this.tag === 35 ? [0, this.data[3]] : this.tag === 33 ? [0, this.data[3]] : this.tag === 34 ? [0, this.data[5]] : this.tag === 31 ? [0, this.data[3]] : this.tag === 32 ? [0, this.data[3]] : this.tag === 36 ? [0, this.data[4]] : this.tag === 53 ? [0, this.data[3]] : this.tag === 54 ? [0, this.data[4]] : this.tag === 51 ? [0, this.data[4]] : this.tag === 52 ? [0, this.data[3]] : this.tag === 37 ? [0, this.data[2]] : this.tag === 38 ? [0, this.data[2]] : this.tag === 43 ? [0, this.data[3]] : this.tag === 39 ? [0, this.data[2]] : this.tag === 45 ? [0, this.data[3]] : this.tag === 40 ? [0, this.data[1]] : this.tag === 41 ? [0, this.data[1]] : this.tag === 42 ? [0, this.data] : this.tag === 25 ? [0, this.data[1]] : this.tag === 44 ? [0, this.data[3]] : this.tag === 46 ? [0, this.data] : this.tag === 47 ? [0, this.data[2]] : this.tag === 48 ? [0, this.data[2]] : this.tag === 49 ? [0, this.data[6]] : this.tag === 50 ? [0, this.data[1]] : this.tag === 0 ? [1] : this.tag === 26 ? [2, this.data[2]] : this.tag === 20 ? [2, this.data[2]] : this.tag === 12 ? [3] : this.tag === 28 ? [4] : this.tag === 58 ? [5] : [0, this.data[4]];

    switch ($var6[0]) {
      case 0:
        return $var6[1];

      case 1:
        return this.data[1];

      case 2:
        return $var6[1].RangeOfFirstPortion;

      case 3:
        const start = this.data[6].Start;
        let e;
        let copyOfStruct = this.data[3].Range;
        e = copyOfStruct.Start;
        return mkRange(this.data[6].FileName, start, e);

      case 4:
        return this.data.idRange;

      case 5:
        return this.data[1];
    }
  }

  get IsArbExprAndThusAlreadyReportedError() {
    return this.tag === 55 ? true : false;
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynExpr", SynExpr);
export class SynIndexerArg {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynIndexerArg",
      interfaces: ["FSharpUnion"],
      cases: [["Two", SynExpr, SynExpr], ["One", SynExpr]]
    };
  }

  get Range() {
    return this.tag === 1 ? this.data.Range : unionRanges(this.data[0].Range, this.data[1].Range);
  }

  get Exprs() {
    return this.tag === 1 ? ofArray([this.data]) : ofArray([this.data[0], this.data[1]]);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynIndexerArg", SynIndexerArg);
export class SynSimplePat {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynSimplePat",
      interfaces: ["FSharpUnion"],
      cases: [["Id", Ident, Option(Any), "boolean", "boolean", "boolean", range_1], ["Typed", SynSimplePat, SynType, range_1], ["Attrib", SynSimplePat, makeGeneric(List, {
        T: SynAttribute
      }), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynSimplePat", SynSimplePat);
export class SynSimplePatAlternativeIdInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynSimplePatAlternativeIdInfo",
      interfaces: ["FSharpUnion"],
      cases: [["Undecided", Ident], ["Decided", Ident]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynSimplePatAlternativeIdInfo", SynSimplePatAlternativeIdInfo);
export class SynStaticOptimizationConstraint {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynStaticOptimizationConstraint",
      interfaces: ["FSharpUnion"],
      cases: [["WhenTyparTyconEqualsTycon", SynTypar, SynType, range_1], ["WhenTyparIsStruct", SynTypar, range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynStaticOptimizationConstraint", SynStaticOptimizationConstraint);
export class SynSimplePats {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynSimplePats",
      interfaces: ["FSharpUnion"],
      cases: [["SimplePats", makeGeneric(List, {
        T: SynSimplePat
      }), range_1], ["Typed", SynSimplePats, SynType, range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynSimplePats", SynSimplePats);
export class SynConstructorArgs {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynConstructorArgs",
      interfaces: ["FSharpUnion"],
      cases: [["Pats", makeGeneric(List, {
        T: SynPat
      })], ["NamePatPairs", makeGeneric(List, {
        T: Tuple([Ident, SynPat])
      }), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynConstructorArgs", SynConstructorArgs);
export class SynPat {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynPat",
      interfaces: ["FSharpUnion"],
      cases: [["Const", SynConst, range_1], ["Wild", range_1], ["Named", SynPat, Ident, "boolean", Option(SynAccess), range_1], ["Typed", SynPat, SynType, range_1], ["Attrib", SynPat, makeGeneric(List, {
        T: SynAttribute
      }), range_1], ["Or", SynPat, SynPat, range_1], ["Ands", makeGeneric(List, {
        T: SynPat
      }), range_1], ["LongIdent", LongIdentWithDots, Option(Ident), Option(SynValTyparDecls), SynConstructorArgs, Option(SynAccess), range_1], ["Tuple", makeGeneric(List, {
        T: SynPat
      }), range_1], ["StructTuple", makeGeneric(List, {
        T: SynPat
      }), range_1], ["Paren", SynPat, range_1], ["ArrayOrList", "boolean", makeGeneric(List, {
        T: SynPat
      }), range_1], ["Record", makeGeneric(List, {
        T: Tuple([Tuple([makeGeneric(List, {
          T: Ident
        }), Ident]), SynPat])
      }), range_1], ["Null", range_1], ["OptionalVal", Ident, range_1], ["IsInst", SynType, range_1], ["QuoteExpr", SynExpr, range_1], ["DeprecatedCharRange", "string", "string", range_1], ["InstanceMember", Ident, Ident, Option(Ident), Option(SynAccess), range_1], ["FromParseError", SynPat, range_1]]
    };
  }

  get Range() {
    const $var7 = this.tag === 1 ? [0, this.data] : this.tag === 2 ? [0, this.data[4]] : this.tag === 5 ? [0, this.data[2]] : this.tag === 6 ? [0, this.data[1]] : this.tag === 7 ? [0, this.data[5]] : this.tag === 11 ? [0, this.data[2]] : this.tag === 8 ? [0, this.data[1]] : this.tag === 9 ? [0, this.data[1]] : this.tag === 3 ? [0, this.data[2]] : this.tag === 4 ? [0, this.data[2]] : this.tag === 12 ? [0, this.data[1]] : this.tag === 17 ? [0, this.data[2]] : this.tag === 13 ? [0, this.data] : this.tag === 15 ? [0, this.data[1]] : this.tag === 16 ? [0, this.data[1]] : this.tag === 18 ? [0, this.data[4]] : this.tag === 14 ? [0, this.data[1]] : this.tag === 10 ? [0, this.data[1]] : this.tag === 19 ? [0, this.data[1]] : [0, this.data[1]];

    switch ($var7[0]) {
      case 0:
        return $var7[1];
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynPat", SynPat);
export class SynInterfaceImpl {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynInterfaceImpl",
      interfaces: ["FSharpUnion"],
      cases: [["InterfaceImpl", SynType, makeGeneric(List, {
        T: SynBinding
      }), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynInterfaceImpl", SynInterfaceImpl);
export class SynMatchClause {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynMatchClause",
      interfaces: ["FSharpUnion"],
      cases: [["Clause", SynPat, Option(SynExpr), SynExpr, range_1, SequencePointInfoForTarget]]
    };
  }

  get RangeOfGuardAndRhs() {
    return this.data[1] != null ? unionRanges(this.data[2].Range, getValue(this.data[1]).Range) : this.data[2].Range;
  }

  get Range() {
    return this.data[1] != null ? unionRanges(unionRanges(this.data[2].Range, this.data[3]), getValue(this.data[1]).Range) : unionRanges(this.data[2].Range, this.data[3]);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynMatchClause", SynMatchClause);
export class SynAttribute {
  constructor(typeName, argExpr, target, appliesToGetterAndSetter, range) {
    this.TypeName = typeName;
    this.ArgExpr = argExpr;
    this.Target = target;
    this.AppliesToGetterAndSetter = appliesToGetterAndSetter;
    this.Range = range;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynAttribute",
      interfaces: ["FSharpRecord"],
      properties: {
        TypeName: LongIdentWithDots,
        ArgExpr: SynExpr,
        Target: Option(Ident),
        AppliesToGetterAndSetter: "boolean",
        Range: range_1
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynAttribute", SynAttribute);
export class SynValData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynValData",
      interfaces: ["FSharpUnion"],
      cases: [["SynValData", Option(MemberFlags), SynValInfo, Option(Ident)]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynValData", SynValData);
export class SynBinding {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynBinding",
      interfaces: ["FSharpUnion"],
      cases: [["Binding", Option(SynAccess), SynBindingKind, "boolean", "boolean", makeGeneric(List, {
        T: SynAttribute
      }), PreXmlDoc, SynValData, SynPat, Option(SynBindingReturnInfo), SynExpr, range_1, SequencePointInfoForBinding]]
    };
  }

  get RangeOfBindingSansRhs() {
    return this.data[10];
  }

  get RangeOfBindingAndRhs() {
    return unionRanges(this.data[9].Range, this.data[10]);
  }

  get RangeOfHeadPat() {
    return this.data[7].Range;
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynBinding", SynBinding);
export class SynBindingReturnInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynBindingReturnInfo",
      interfaces: ["FSharpUnion"],
      cases: [["SynBindingReturnInfo", SynType, range_1, makeGeneric(List, {
        T: SynAttribute
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynBindingReturnInfo", SynBindingReturnInfo);
export class MemberFlags {
  constructor(isInstance, isDispatchSlot, isOverrideOrExplicitImpl, isFinal, memberKind) {
    this.IsInstance = isInstance;
    this.IsDispatchSlot = isDispatchSlot;
    this.IsOverrideOrExplicitImpl = isOverrideOrExplicitImpl;
    this.IsFinal = isFinal;
    this.MemberKind = memberKind;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.MemberFlags",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        IsInstance: "boolean",
        IsDispatchSlot: "boolean",
        IsOverrideOrExplicitImpl: "boolean",
        IsFinal: "boolean",
        MemberKind: MemberKind
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.MemberFlags", MemberFlags);
export class MemberKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.MemberKind",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ClassConstructor"], ["Constructor"], ["Member"], ["PropertyGet"], ["PropertySet"], ["PropertyGetSet"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

}
setType("Microsoft.FSharp.Compiler.Ast.MemberKind", MemberKind);
export class SynMemberSig {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynMemberSig",
      interfaces: ["FSharpUnion"],
      cases: [["Member", SynValSig, MemberFlags, range_1], ["Interface", SynType, range_1], ["Inherit", SynType, range_1], ["ValField", SynField, range_1], ["NestedType", SynTypeDefnSig, range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynMemberSig", SynMemberSig);
export class SynTypeDefnKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynTypeDefnKind",
      interfaces: ["FSharpUnion"],
      cases: [["TyconUnspecified"], ["TyconClass"], ["TyconInterface"], ["TyconStruct"], ["TyconRecord"], ["TyconUnion"], ["TyconAbbrev"], ["TyconHiddenRepr"], ["TyconAugmentation"], ["TyconILAssemblyCode"], ["TyconDelegate", SynType, SynValInfo]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynTypeDefnKind", SynTypeDefnKind);
export class SynTypeDefnSimpleRepr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynTypeDefnSimpleRepr",
      interfaces: ["FSharpUnion"],
      cases: [["Union", Option(SynAccess), makeGeneric(List, {
        T: SynUnionCase
      }), range_1], ["Enum", makeGeneric(List, {
        T: SynEnumCase
      }), range_1], ["Record", Option(SynAccess), makeGeneric(List, {
        T: SynField
      }), range_1], ["General", SynTypeDefnKind, makeGeneric(List, {
        T: Tuple([SynType, range_1, Option(Ident)])
      }), makeGeneric(List, {
        T: Tuple([SynValSig, MemberFlags])
      }), makeGeneric(List, {
        T: SynField
      }), "boolean", "boolean", Option(makeGeneric(List, {
        T: SynSimplePat
      })), range_1], ["LibraryOnlyILAssembly", ILType, range_1], ["TypeAbbrev", ParserDetail, SynType, range_1], ["None", range_1], ["Exception", SynExceptionDefnRepr]]
    };
  }

  get Range() {
    const $var8 = this.tag === 1 ? [0, this.data[1]] : this.tag === 2 ? [0, this.data[2]] : this.tag === 3 ? [0, this.data[7]] : this.tag === 4 ? [0, this.data[1]] : this.tag === 5 ? [0, this.data[2]] : this.tag === 6 ? [0, this.data] : this.tag === 7 ? [1] : [0, this.data[2]];

    switch ($var8[0]) {
      case 0:
        return $var8[1];

      case 1:
        return this.data.Range;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynTypeDefnSimpleRepr", SynTypeDefnSimpleRepr);
export class SynEnumCase {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynEnumCase",
      interfaces: ["FSharpUnion"],
      cases: [["EnumCase", makeGeneric(List, {
        T: SynAttribute
      }), Ident, SynConst, PreXmlDoc, range_1]]
    };
  }

  get Range() {
    return this.data[4];
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynEnumCase", SynEnumCase);
export class SynUnionCase {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynUnionCase",
      interfaces: ["FSharpUnion"],
      cases: [["UnionCase", makeGeneric(List, {
        T: SynAttribute
      }), Ident, SynUnionCaseType, PreXmlDoc, Option(SynAccess), range_1]]
    };
  }

  get Range() {
    return this.data[5];
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynUnionCase", SynUnionCase);
export class SynUnionCaseType {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynUnionCaseType",
      interfaces: ["FSharpUnion"],
      cases: [["UnionCaseFields", makeGeneric(List, {
        T: SynField
      })], ["UnionCaseFullType", Tuple([SynType, SynValInfo])]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynUnionCaseType", SynUnionCaseType);
export class SynTypeDefnSigRepr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynTypeDefnSigRepr",
      interfaces: ["FSharpUnion"],
      cases: [["ObjectModel", SynTypeDefnKind, makeGeneric(List, {
        T: SynMemberSig
      }), range_1], ["Simple", SynTypeDefnSimpleRepr, range_1], ["Exception", SynExceptionDefnRepr]]
    };
  }

  get Range() {
    const $var9 = this.tag === 1 ? [0, this.data[1]] : this.tag === 2 ? [1] : [0, this.data[2]];

    switch ($var9[0]) {
      case 0:
        return $var9[1];

      case 1:
        return this.data.Range;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynTypeDefnSigRepr", SynTypeDefnSigRepr);
export class SynTypeDefnSig {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynTypeDefnSig",
      interfaces: ["FSharpUnion"],
      cases: [["TypeDefnSig", SynComponentInfo, SynTypeDefnSigRepr, makeGeneric(List, {
        T: SynMemberSig
      }), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynTypeDefnSig", SynTypeDefnSig);
export class SynField {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynField",
      interfaces: ["FSharpUnion"],
      cases: [["Field", makeGeneric(List, {
        T: SynAttribute
      }), "boolean", Option(Ident), SynType, "boolean", PreXmlDoc, Option(SynAccess), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynField", SynField);
export class SynComponentInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynComponentInfo",
      interfaces: ["FSharpUnion"],
      cases: [["ComponentInfo", makeGeneric(List, {
        T: SynAttribute
      }), makeGeneric(List, {
        T: SynTyparDecl
      }), makeGeneric(List, {
        T: SynTypeConstraint
      }), makeGeneric(List, {
        T: Ident
      }), PreXmlDoc, "boolean", Option(SynAccess), range_1]]
    };
  }

  get Range() {
    return this.data[7];
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynComponentInfo", SynComponentInfo);
export class SynValSig {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynValSig",
      interfaces: ["FSharpUnion"],
      cases: [["ValSpfn", makeGeneric(List, {
        T: SynAttribute
      }), Ident, SynValTyparDecls, SynType, SynValInfo, "boolean", "boolean", PreXmlDoc, Option(SynAccess), Option(SynExpr), range_1]]
    };
  }

  get RangeOfId() {
    return this.data[1].idRange;
  }

  get SynInfo() {
    return this.data[4];
  }

  get SynType() {
    return this.data[3];
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynValSig", SynValSig);
export class SynValInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynValInfo",
      interfaces: ["FSharpUnion"],
      cases: [["SynValInfo", makeGeneric(List, {
        T: makeGeneric(List, {
          T: SynArgInfo
        })
      }), SynArgInfo]]
    };
  }

  get ArgInfos() {
    return this.data[0];
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynValInfo", SynValInfo);
export class SynArgInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynArgInfo",
      interfaces: ["FSharpUnion"],
      cases: [["SynArgInfo", makeGeneric(List, {
        T: SynAttribute
      }), "boolean", Option(Ident)]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynArgInfo", SynArgInfo);
export class SynValTyparDecls {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynValTyparDecls",
      interfaces: ["FSharpUnion"],
      cases: [["SynValTyparDecls", makeGeneric(List, {
        T: SynTyparDecl
      }), "boolean", makeGeneric(List, {
        T: SynTypeConstraint
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynValTyparDecls", SynValTyparDecls);
export class SynExceptionDefnRepr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynExceptionDefnRepr",
      interfaces: ["FSharpUnion"],
      cases: [["SynExceptionDefnRepr", makeGeneric(List, {
        T: SynAttribute
      }), SynUnionCase, Option(makeGeneric(List, {
        T: Ident
      })), PreXmlDoc, Option(SynAccess), range_1]]
    };
  }

  get Range() {
    return this.data[5];
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynExceptionDefnRepr", SynExceptionDefnRepr);
export class SynExceptionDefn {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynExceptionDefn",
      interfaces: ["FSharpUnion"],
      cases: [["SynExceptionDefn", SynExceptionDefnRepr, makeGeneric(List, {
        T: SynMemberDefn
      }), range_1]]
    };
  }

  get Range() {
    return this.data[2];
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynExceptionDefn", SynExceptionDefn);
export class SynTypeDefnRepr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynTypeDefnRepr",
      interfaces: ["FSharpUnion"],
      cases: [["ObjectModel", SynTypeDefnKind, makeGeneric(List, {
        T: SynMemberDefn
      }), range_1], ["Simple", SynTypeDefnSimpleRepr, range_1], ["Exception", SynExceptionDefnRepr]]
    };
  }

  get Range() {
    const $var10 = this.tag === 1 ? [0, this.data[1]] : this.tag === 2 ? [1] : [0, this.data[2]];

    switch ($var10[0]) {
      case 0:
        return $var10[1];

      case 1:
        return this.data.Range;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynTypeDefnRepr", SynTypeDefnRepr);
export class SynTypeDefn {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynTypeDefn",
      interfaces: ["FSharpUnion"],
      cases: [["TypeDefn", SynComponentInfo, SynTypeDefnRepr, makeGeneric(List, {
        T: SynMemberDefn
      }), range_1]]
    };
  }

  get Range() {
    return this.data[3];
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynTypeDefn", SynTypeDefn);
export class SynMemberDefn {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynMemberDefn",
      interfaces: ["FSharpUnion"],
      cases: [["Open", makeGeneric(List, {
        T: Ident
      }), range_1], ["Member", SynBinding, range_1], ["ImplicitCtor", Option(SynAccess), makeGeneric(List, {
        T: SynAttribute
      }), makeGeneric(List, {
        T: SynSimplePat
      }), Option(Ident), range_1], ["ImplicitInherit", SynType, SynExpr, Option(Ident), range_1], ["LetBindings", makeGeneric(List, {
        T: SynBinding
      }), "boolean", "boolean", range_1], ["AbstractSlot", SynValSig, MemberFlags, range_1], ["Interface", SynType, Option(makeGeneric(List, {
        T: SynMemberDefn
      })), range_1], ["Inherit", SynType, Option(Ident), range_1], ["ValField", SynField, range_1], ["NestedType", SynTypeDefn, Option(SynAccess), range_1], ["AutoProperty", makeGeneric(List, {
        T: SynAttribute
      }), "boolean", Ident, Option(SynType), MemberKind, _Function([MemberKind, MemberFlags]), PreXmlDoc, Option(SynAccess), SynExpr, Option(range_1), range_1]]
    };
  }

  get Range() {
    const $var11 = this.tag === 6 ? [0, this.data[2]] : this.tag === 0 ? [0, this.data[1]] : this.tag === 4 ? [0, this.data[3]] : this.tag === 2 ? [0, this.data[4]] : this.tag === 3 ? [0, this.data[3]] : this.tag === 5 ? [0, this.data[2]] : this.tag === 7 ? [0, this.data[2]] : this.tag === 8 ? [0, this.data[1]] : this.tag === 10 ? [0, this.data[10]] : this.tag === 9 ? [0, this.data[2]] : [0, this.data[1]];

    switch ($var11[0]) {
      case 0:
        return $var11[1];
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynMemberDefn", SynMemberDefn);
export class SynModuleDecl {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynModuleDecl",
      interfaces: ["FSharpUnion"],
      cases: [["ModuleAbbrev", Ident, makeGeneric(List, {
        T: Ident
      }), range_1], ["NestedModule", SynComponentInfo, "boolean", makeGeneric(List, {
        T: SynModuleDecl
      }), "boolean", range_1], ["Let", "boolean", makeGeneric(List, {
        T: SynBinding
      }), range_1], ["DoExpr", SequencePointInfoForBinding, SynExpr, range_1], ["Types", makeGeneric(List, {
        T: SynTypeDefn
      }), range_1], ["Exception", SynExceptionDefn, range_1], ["Open", LongIdentWithDots, range_1], ["Attributes", makeGeneric(List, {
        T: SynAttribute
      }), range_1], ["HashDirective", ParsedHashDirective, range_1], ["NamespaceFragment", SynModuleOrNamespace]]
    };
  }

  get Range() {
    const $var12 = this.tag === 1 ? [0, this.data[4]] : this.tag === 2 ? [0, this.data[2]] : this.tag === 3 ? [0, this.data[2]] : this.tag === 4 ? [0, this.data[1]] : this.tag === 5 ? [0, this.data[1]] : this.tag === 6 ? [0, this.data[1]] : this.tag === 8 ? [0, this.data[1]] : this.tag === 9 ? [0, this.data.data[7]] : this.tag === 7 ? [0, this.data[1]] : [0, this.data[2]];

    switch ($var12[0]) {
      case 0:
        return $var12[1];
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynModuleDecl", SynModuleDecl);
export class SynExceptionSig {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynExceptionSig",
      interfaces: ["FSharpUnion"],
      cases: [["SynExceptionSig", SynExceptionDefnRepr, makeGeneric(List, {
        T: SynMemberSig
      }), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynExceptionSig", SynExceptionSig);
export class SynModuleSigDecl {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynModuleSigDecl",
      interfaces: ["FSharpUnion"],
      cases: [["ModuleAbbrev", Ident, makeGeneric(List, {
        T: Ident
      }), range_1], ["NestedModule", SynComponentInfo, "boolean", makeGeneric(List, {
        T: SynModuleSigDecl
      }), range_1], ["Val", SynValSig, range_1], ["Types", makeGeneric(List, {
        T: SynTypeDefnSig
      }), range_1], ["Exception", SynExceptionSig, range_1], ["Open", makeGeneric(List, {
        T: Ident
      }), range_1], ["HashDirective", ParsedHashDirective, range_1], ["NamespaceFragment", SynModuleOrNamespaceSig]]
    };
  }

  get Range() {
    const $var13 = this.tag === 1 ? [0, this.data[3]] : this.tag === 2 ? [0, this.data[1]] : this.tag === 3 ? [0, this.data[1]] : this.tag === 4 ? [0, this.data[1]] : this.tag === 5 ? [0, this.data[1]] : this.tag === 7 ? [0, this.data.data[7]] : this.tag === 6 ? [0, this.data[1]] : [0, this.data[2]];

    switch ($var13[0]) {
      case 0:
        return $var13[1];
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynModuleSigDecl", SynModuleSigDecl);
export class SynModuleOrNamespace {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynModuleOrNamespace",
      interfaces: ["FSharpUnion"],
      cases: [["SynModuleOrNamespace", makeGeneric(List, {
        T: Ident
      }), "boolean", "boolean", makeGeneric(List, {
        T: SynModuleDecl
      }), PreXmlDoc, makeGeneric(List, {
        T: SynAttribute
      }), Option(SynAccess), range_1]]
    };
  }

  get Range() {
    return this.data[7];
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynModuleOrNamespace", SynModuleOrNamespace);
export class SynModuleOrNamespaceSig {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynModuleOrNamespaceSig",
      interfaces: ["FSharpUnion"],
      cases: [["SynModuleOrNamespaceSig", makeGeneric(List, {
        T: Ident
      }), "boolean", "boolean", makeGeneric(List, {
        T: SynModuleSigDecl
      }), PreXmlDoc, makeGeneric(List, {
        T: SynAttribute
      }), Option(SynAccess), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynModuleOrNamespaceSig", SynModuleOrNamespaceSig);
export class ParsedHashDirective {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ParsedHashDirective",
      interfaces: ["FSharpUnion"],
      cases: [["ParsedHashDirective", "string", makeGeneric(List, {
        T: "string"
      }), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ParsedHashDirective", ParsedHashDirective);
export class ParsedImplFileFragment {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ParsedImplFileFragment",
      interfaces: ["FSharpUnion"],
      cases: [["AnonModule", makeGeneric(List, {
        T: SynModuleDecl
      }), range_1], ["NamedModule", SynModuleOrNamespace], ["NamespaceFragment", makeGeneric(List, {
        T: Ident
      }), "boolean", "boolean", makeGeneric(List, {
        T: SynModuleDecl
      }), PreXmlDoc, makeGeneric(List, {
        T: SynAttribute
      }), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ParsedImplFileFragment", ParsedImplFileFragment);
export class ParsedSigFileFragment {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ParsedSigFileFragment",
      interfaces: ["FSharpUnion"],
      cases: [["AnonModule", makeGeneric(List, {
        T: SynModuleSigDecl
      }), range_1], ["NamedModule", SynModuleOrNamespaceSig], ["NamespaceFragment", makeGeneric(List, {
        T: Ident
      }), "boolean", "boolean", makeGeneric(List, {
        T: SynModuleSigDecl
      }), PreXmlDoc, makeGeneric(List, {
        T: SynAttribute
      }), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ParsedSigFileFragment", ParsedSigFileFragment);
export class ParsedFsiInteraction {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ParsedFsiInteraction",
      interfaces: ["FSharpUnion"],
      cases: [["IDefns", makeGeneric(List, {
        T: SynModuleDecl
      }), range_1], ["IHash", ParsedHashDirective, range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ParsedFsiInteraction", ParsedFsiInteraction);
export class ParsedImplFile {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ParsedImplFile",
      interfaces: ["FSharpUnion"],
      cases: [["ParsedImplFile", makeGeneric(List, {
        T: ParsedHashDirective
      }), makeGeneric(List, {
        T: ParsedImplFileFragment
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ParsedImplFile", ParsedImplFile);
export class ParsedSigFile {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ParsedSigFile",
      interfaces: ["FSharpUnion"],
      cases: [["ParsedSigFile", makeGeneric(List, {
        T: ParsedHashDirective
      }), makeGeneric(List, {
        T: ParsedSigFileFragment
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ParsedSigFile", ParsedSigFile);
export function ident(s, r) {
  return new Ident(s, r);
}
export function textOfId(id) {
  return id.idText;
}
export function pathOfLid(lid) {
  return map_1(function (id) {
    return textOfId(id);
  }, lid);
}
export function arrPathOfLid(lid) {
  return Array.from(pathOfLid(lid));
}
export function textOfPath(path) {
  return join(".", path);
}
export function textOfLid(lid) {
  return textOfPath(pathOfLid(lid));
}
export function rangeOfLid(lid) {
  var copyOfStruct;

  if (lid.tail != null) {
    if (lid.tail.tail == null) {
      return lid.head.idRange;
    } else {
      return unionRanges(lid.head.idRange, (copyOfStruct = last(lid.tail), copyOfStruct.idRange));
    }
  } else {
    throw new Error("rangeOfLid");
  }
}
export class ScopedPragma {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ScopedPragma",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["WarningOff", range_1, "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ScopedPragma", ScopedPragma);
export class QualifiedNameOfFile {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.QualifiedNameOfFile",
      interfaces: ["FSharpUnion"],
      cases: [["QualifiedNameOfFile", Ident]]
    };
  }

  get Text() {
    return this.data.idText;
  }

  get Id() {
    return this.data;
  }

  get Range() {
    return this.data.idRange;
  }

}
setType("Microsoft.FSharp.Compiler.Ast.QualifiedNameOfFile", QualifiedNameOfFile);
export class ParsedImplFileInput {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ParsedImplFileInput",
      interfaces: ["FSharpUnion"],
      cases: [["ParsedImplFileInput", "string", "boolean", QualifiedNameOfFile, makeGeneric(List, {
        T: ScopedPragma
      }), makeGeneric(List, {
        T: ParsedHashDirective
      }), makeGeneric(List, {
        T: SynModuleOrNamespace
      }), Tuple(["boolean", "boolean"])]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ParsedImplFileInput", ParsedImplFileInput);
export class ParsedSigFileInput {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ParsedSigFileInput",
      interfaces: ["FSharpUnion"],
      cases: [["ParsedSigFileInput", "string", QualifiedNameOfFile, makeGeneric(List, {
        T: ScopedPragma
      }), makeGeneric(List, {
        T: ParsedHashDirective
      }), makeGeneric(List, {
        T: SynModuleOrNamespaceSig
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ParsedSigFileInput", ParsedSigFileInput);
export class ParsedInput {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.ParsedInput",
      interfaces: ["FSharpUnion"],
      cases: [["ImplFile", ParsedImplFileInput], ["SigFile", ParsedSigFileInput]]
    };
  }

  get Range() {
    const $var14 = this.tag === 1 ? this.data.data[4].tail != null ? [0, this.data.data[4].head.data[7]] : [1, this.data.data[0]] : this.data.data[5].tail != null ? [0, this.data.data[5].head.data[7]] : [1, this.data.data[0]];

    switch ($var14[0]) {
      case 0:
        return $var14[1];

      case 1:
        return rangeN($var14[1], 0);
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.ParsedInput", ParsedInput);
export class SynArgNameGenerator {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynArgNameGenerator",
      properties: {}
    };
  }

  constructor() {
    this.count = 0;
    this.generatedArgNamePrefix = "_arg";
  }

  New() {
    this.count = this.count + 1 | 0;
    return this.generatedArgNamePrefix + this.count.toString();
  }

  Reset() {
    this.count = 0;
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynArgNameGenerator", SynArgNameGenerator);
export function mkSynId(m, s) {
  return new Ident(s, m);
}
export function pathToSynLid(m, p) {
  return map_1(function (s) {
    return mkSynId(m, s);
  }, p);
}
export function mkSynIdGet(m, n) {
  return new SynExpr(28, mkSynId(m, n));
}
export function mkSynLidGet(m, path, n) {
  const lid = append(pathToSynLid(m, path), ofArray([mkSynId(m, n)]));
  const dots = replicate(lid.length - 1, m);
  return new SynExpr(29, [false, new LongIdentWithDots(0, [lid, dots]), null, m]);
}
export function mkSynIdGetWithAlt(m, id, altInfo) {
  if (altInfo == null) {
    return new SynExpr(28, id);
  } else {
    return new SynExpr(29, [false, new LongIdentWithDots(0, [ofArray([id]), new List()]), altInfo, m]);
  }
}
export function mkSynSimplePatVar(isOpt, id) {
  return new SynSimplePat(0, [id, null, false, false, isOpt, id.idRange]);
}
export function mkSynCompGenSimplePatVar(id) {
  return new SynSimplePat(0, [id, null, true, false, false, id.idRange]);
}

function _LongOrSingleIdent___(inp) {
  if (inp.tag === 29) {
    return [inp.data[0], inp.data[1], inp.data[2], inp.data[1].RangeSansAnyExtraDot];
  } else if (inp.tag === 28) {
    return [false, new LongIdentWithDots(0, [ofArray([inp.data]), new List()]), null, inp.data.idRange];
  } else {
    return null;
  }
}

export { _LongOrSingleIdent___ as $7C$LongOrSingleIdent$7C$_$7C$ };

function _SingleIdent___(inp) {
  const $var15 = inp.tag === 29 ? inp.data[0] ? [2] : inp.data[1].data[0].tail != null ? inp.data[1].data[0].tail.tail == null ? inp.data[2] == null ? [0, inp.data[1].data[0].head] : [2] : [2] : [2] : inp.tag === 28 ? [1, inp.data] : [2];

  switch ($var15[0]) {
    case 0:
      return $var15[1];

    case 1:
      return $var15[1];

    case 2:
      return null;
  }
}

export { _SingleIdent___ as $7C$SingleIdent$7C$_$7C$ };
export function IsControlFlowExpression(e) {
  IsControlFlowExpression: while (true) {
    const $var16 = e.tag === 9 ? [0] : e.tag === 15 ? [0] : e.tag === 22 ? [0] : e.tag === 26 ? [0] : e.tag === 20 ? e.data[2].tag === 28 ? e.data[3].tag === 14 ? [0] : [2] : [2] : e.tag === 27 ? [0] : e.tag === 49 ? [0] : e.tag === 17 ? [0] : e.tag === 23 ? [0] : e.tag === 24 ? [0] : e.tag === 11 ? [0] : e.tag === 12 ? [0] : e.tag === 10 ? [0] : e.tag === 3 ? [1, e.data[0]] : [2];

    switch ($var16[0]) {
      case 0:
        return true;

      case 1:
        e = $var16[1];
        continue IsControlFlowExpression;

      case 2:
        return false;
    }
  }
}
export function mkAnonField(ty) {
  return new SynField(0, [new List(), false, null, ty, false, PreXmlDoc.Empty, null, ty.Range]);
}
export function mkNamedField(ident_1, ty) {
  return new SynField(0, [new List(), false, ident_1, ty, false, PreXmlDoc.Empty, null, ty.Range]);
}
export function mkSynPatVar(vis, id) {
  return new SynPat(2, [new SynPat(1, id.idRange), id, false, vis, id.idRange]);
}
export function mkSynThisPatVar(id) {
  return new SynPat(2, [new SynPat(1, id.idRange), id, true, null, id.idRange]);
}
export function mkSynPatMaybeVar(lidwd, vis, m) {
  return new SynPat(7, [lidwd, null, null, new SynConstructorArgs(0, new List()), vis, m]);
}

function _SynPatForConstructorDecl___(x) {
  const $var17 = x.tag === 7 ? x.data[0].data[0].tail != null ? x.data[0].data[0].tail.tail == null ? x.data[3].tag === 0 ? x.data[3].data.tail != null ? x.data[3].data.tail.tail == null ? [0, x.data[3].data.head] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var17[0]) {
    case 0:
      return $var17[1];

    case 1:
      return null;
  }
}

export { _SynPatForConstructorDecl___ as $7C$SynPatForConstructorDecl$7C$_$7C$ };

function _SynPatForNullaryArgs___(x) {
  const $var18 = x.tag === 10 ? x.data[0].tag === 0 ? x.data[0].data[0].tag === 0 ? [0] : [1] : [1] : [1];

  switch ($var18[0]) {
    case 0:
      return makeSome();

    case 1:
      return null;
  }
}

export { _SynPatForNullaryArgs___ as $7C$SynPatForNullaryArgs$7C$_$7C$ };

function _SynExprErrorSkip_(p) {
  if (p.tag === 56) {
    return p.data[0];
  } else {
    return p;
  }
}

export { _SynExprErrorSkip_ as $7C$SynExprErrorSkip$7C$ };

function _SynExprParen___(e) {
  if (e.tag === 0) {
    const activePatternResult15514 = _SynExprErrorSkip_(e.data[0]);

    return [activePatternResult15514, e.data[1], e.data[2], e.data[3]];
  } else {
    return null;
  }
}

export { _SynExprParen___ as $7C$SynExprParen$7C$_$7C$ };

function _SynPatErrorSkip_(p) {
  if (p.tag === 19) {
    return p.data[0];
  } else {
    return p;
  }
}

export { _SynPatErrorSkip_ as $7C$SynPatErrorSkip$7C$ };
export function SimplePatOfPat(synArgNameGenerator, p) {
  SimplePatOfPat: while (true) {
    const $var19 = p.tag === 3 ? [0, p.data[2], p.data[0], p.data[1]] : p.tag === 4 ? [1, p.data[1], p.data[2], p.data[0]] : p.tag === 2 ? p.data[0].tag === 1 ? [2, p.data[4], p.data[2], p.data[1]] : [6] : p.tag === 14 ? [3, p.data[1], p.data[0]] : p.tag === 10 ? [4, p.data[0]] : p.tag === 19 ? [5, p.data[0]] : [6];

    switch ($var19[0]) {
      case 0:
        const patternInput = SimplePatOfPat(synArgNameGenerator, $var19[2]);
        return [new SynSimplePat(1, [patternInput[0], $var19[3], $var19[1]]), patternInput[1]];

      case 1:
        const patternInput_1 = SimplePatOfPat(synArgNameGenerator, $var19[3]);
        return [new SynSimplePat(2, [patternInput_1[0], $var19[1], $var19[2]]), patternInput_1[1]];

      case 2:
        return [new SynSimplePat(0, [$var19[3], null, false, $var19[2], false, $var19[1]]), null];

      case 3:
        return [new SynSimplePat(0, [$var19[2], null, false, false, true, $var19[1]]), null];

      case 4:
        synArgNameGenerator = synArgNameGenerator;
        p = $var19[1];
        continue SimplePatOfPat;

      case 5:
        synArgNameGenerator = synArgNameGenerator;
        p = $var19[1];
        continue SimplePatOfPat;

      case 6:
        const m = p.Range;
        let patternInput_2;
        const $var20 = p.tag === 7 ? p.data[0].data[0].tail != null ? p.data[0].data[0].tail.tail == null ? p.data[2] == null ? p.data[3].tag === 0 ? p.data[3].data.tail == null ? p.data[4] == null ? [0, p.data[0].data[0].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

        switch ($var20[0]) {
          case 0:
            const altNameRefCell = {
              contents: new SynSimplePatAlternativeIdInfo(0, mkSynId(m, synArgNameGenerator.New()))
            };
            const item = mkSynIdGetWithAlt(m, $var20[1], altNameRefCell);
            patternInput_2 = [false, altNameRefCell, $var20[1], item];
            break;

          case 1:
            const nm = synArgNameGenerator.New();
            const id = mkSynId(m, nm);
            const item_1 = mkSynIdGet(m, nm);
            patternInput_2 = [true, null, id, item_1];
            break;
        }

        return [new SynSimplePat(0, [patternInput_2[2], patternInput_2[1], patternInput_2[0], false, false, patternInput_2[2].idRange]), function (e) {
          const clause = new SynMatchClause(0, [p, null, e, m, new SequencePointInfoForTarget(1)]);
          return new SynExpr(17, [new SequencePointInfoForBinding(4), patternInput_2[3], ofArray([clause]), false, clause.Range]);
        }];
    }
  }
}
export function appFunOpt(funOpt, x) {
  if (funOpt != null) {
    return getValue(funOpt)(x);
  } else {
    return x;
  }
}
export function composeFunOpt(funOpt1, funOpt2) {
  if (funOpt2 != null) {
    return function (x) {
      return appFunOpt(funOpt1, getValue(funOpt2)(x));
    };
  } else {
    return funOpt1;
  }
}
export function SimplePatsOfPat(synArgNameGenerator, p) {
  SimplePatsOfPat: while (true) {
    const $var21 = p.tag === 19 ? [0, p.data[0]] : p.tag === 3 ? [1, p.data[2], p.data[0], p.data[1]] : p.tag === 8 ? [2, p.data[1], p.data[0]] : p.tag === 10 ? p.data[0].tag === 8 ? [2, p.data[0].data[1], p.data[0].data[0]] : p.data[0].tag === 0 ? p.data[0].data[0].tag === 0 ? [3, p.data[0].data[1]] : [4] : [4] : p.tag === 0 ? p.data[0].tag === 0 ? [3, p.data[1]] : [4] : [4];

    switch ($var21[0]) {
      case 0:
        synArgNameGenerator = synArgNameGenerator;
        p = $var21[1];
        continue SimplePatsOfPat;

      case 1:
        const patternInput = SimplePatsOfPat(synArgNameGenerator, $var21[2]);
        return [new SynSimplePats(1, [patternInput[0], $var21[3], $var21[1]]), patternInput[1]];

      case 2:
        const patternInput_1 = foldBack(function (tupledArg, tupledArg_1) {
          return [new List(tupledArg[0], tupledArg_1[0]), composeFunOpt(tupledArg[1], tupledArg_1[1])];
        }, map_1(function (p_1) {
          return SimplePatOfPat(synArgNameGenerator, p_1);
        }, $var21[2]), [new List(), null]);
        return [new SynSimplePats(0, [patternInput_1[0], $var21[1]]), patternInput_1[1]];

      case 3:
        return [new SynSimplePats(0, [new List(), $var21[1]]), null];

      case 4:
        const m = p.Range;
        const patternInput_2 = SimplePatOfPat(synArgNameGenerator, p);
        return [new SynSimplePats(0, [ofArray([patternInput_2[0]]), m]), patternInput_2[1]];
    }
  }
}
export function PushPatternToExpr(synArgNameGenerator, isMember, pat, rhs) {
  const patternInput = SimplePatsOfPat(synArgNameGenerator, pat);
  return [patternInput[0], new SynExpr(15, [isMember, false, patternInput[0], appFunOpt(patternInput[1], rhs), rhs.Range])];
}

function isSimplePattern(pat) {
  const patternInput = SimplePatsOfPat(new SynArgNameGenerator(), pat);
  return patternInput[1] == null;
}

export function PushCurriedPatternsToExpr(synArgNameGenerator, wholem, isMember, pats, rhs) {
  const patternInput_1 = foldBack(function (arg, tupledArg) {
    const patternInput = SimplePatsOfPat(synArgNameGenerator, arg);
    const body = appFunOpt(patternInput[1], tupledArg[1]);
    const spatsl = new List(patternInput[0], tupledArg[0]);
    return [spatsl, body];
  }, pats, [new List(), rhs]);
  let expr_2;

  if (patternInput_1[0].tail != null) {
    const expr = foldBack(function (spats, e) {
      return new SynExpr(15, [isMember, true, spats, e, wholem]);
    }, patternInput_1[0].tail, patternInput_1[1]);
    const expr_1 = new SynExpr(15, [isMember, false, patternInput_1[0].head, expr, wholem]);
    expr_2 = expr_1;
  } else {
    expr_2 = patternInput_1[1];
  }

  return [patternInput_1[0], expr_2];
}
export function ParseAssemblyCodeInstructions(_s, m) {
  errorR(new _Error([193, "Inline IL not valid in a hosted environment"], m));
  return [];
}
export function ParseAssemblyCodeType(_s, m) {
  errorR(new _Error([193, "Inline IL not valid in a hosted environment"], m));
  return EcmaMscorlibILGlobals.typ_Object;
}
export const opNameParenGet = CompileOpName(".()");
export const opNameQMark = CompileOpName("?");
export function mkSynOperator(opm, oper) {
  return mkSynIdGet(opm, CompileOpName(oper));
}
export function mkSynInfix(opm, l, oper, r) {
  const firstTwoRange = unionRanges(l.Range, opm);
  const wholeRange = unionRanges(l.Range, r.Range);
  return new SynExpr(20, [1, false, new SynExpr(20, [1, true, mkSynOperator(opm, oper), l, firstTwoRange]), r, wholeRange]);
}
export function mkSynBifix(m, oper, x1, x2) {
  return new SynExpr(20, [1, false, new SynExpr(20, [1, true, mkSynOperator(m, oper), x1, m]), x2, m]);
}
export function mkSynTrifix(m, oper, x1, x2, x3) {
  return new SynExpr(20, [1, false, new SynExpr(20, [1, false, new SynExpr(20, [1, true, mkSynOperator(m, oper), x1, m]), x2, m]), x3, m]);
}
export function mkSynQuadfix(m, oper, x1, x2, x3, x4) {
  return new SynExpr(20, [1, false, new SynExpr(20, [1, false, new SynExpr(20, [1, false, new SynExpr(20, [1, true, mkSynOperator(m, oper), x1, m]), x2, m]), x3, m]), x4, m]);
}
export function mkSynQuinfix(m, oper, x1, x2, x3, x4, x5) {
  return new SynExpr(20, [1, false, new SynExpr(20, [1, false, new SynExpr(20, [1, false, new SynExpr(20, [1, false, new SynExpr(20, [1, true, mkSynOperator(m, oper), x1, m]), x2, m]), x3, m]), x4, m]), x5, m]);
}
export function mkSynPrefix(opm, m, oper, x) {
  return new SynExpr(20, [1, false, mkSynOperator(opm, oper), x, m]);
}
export function mkSynCaseName(m, n) {
  return ofArray([mkSynId(m, CompileOpName(n))]);
}
export function mkSynApp1(f, x1, m) {
  return new SynExpr(20, [1, false, f, x1, m]);
}
export function mkSynApp2(f, x1, x2, m) {
  return mkSynApp1(mkSynApp1(f, x1, m), x2, m);
}
export function mkSynApp3(f, x1, x2, x3, m) {
  return mkSynApp1(mkSynApp2(f, x1, x2, m), x3, m);
}
export function mkSynApp4(f, x1, x2, x3, x4, m) {
  return mkSynApp1(mkSynApp3(f, x1, x2, x3, m), x4, m);
}
export function mkSynApp5(f, x1, x2, x3, x4, x5, m) {
  return mkSynApp1(mkSynApp4(f, x1, x2, x3, x4, m), x5, m);
}
export function mkSynDotParenSet(m, a, b, c) {
  return mkSynTrifix(m, ".()<-", a, b, c);
}
export function mkSynDotBrackGet(m, mDot, a, b) {
  return new SynExpr(33, [a, ofArray([new SynIndexerArg(1, b)]), mDot, m]);
}
export function mkSynQMarkSet(m, a, b, c) {
  return mkSynTrifix(m, "?<-", a, b, c);
}
export function mkSynDotBrackSliceGet(m, mDot, arr, sliceArg) {
  return new SynExpr(33, [arr, ofArray([sliceArg]), mDot, m]);
}
export function mkSynDotBrackSeqSliceGet(m, mDot, arr, argslist) {
  const notsliced = toList(delay(function () {
    return collect(function (arg) {
      return arg.tag === 1 ? singleton(arg.data) : empty();
    }, argslist);
  }));

  if (notsliced.length === argslist.length) {
    return new SynExpr(33, [arr, ofArray([new SynIndexerArg(1, new SynExpr(4, [notsliced, new List(), unionRanges(notsliced.head.Range, last(notsliced).Range)]))]), mDot, m]);
  } else {
    return new SynExpr(33, [arr, argslist, mDot, m]);
  }
}
export function mkSynDotParenGet(lhsm, dotm, a, b) {
  const $var22 = b.tag === 4 ? b.data[0].tail != null ? b.data[0].tail.tail != null ? b.data[0].tail.tail.tail != null ? b.data[0].tail.tail.tail.tail == null ? [1] : [2] : [0] : [2] : [2] : [2];

  switch ($var22[0]) {
    case 0:
      errorR(new Deprecated(SR.astDeprecatedIndexerNotation(), lhsm));
      return new SynExpr(2, [new SynConst(0), lhsm]);

    case 1:
      errorR(new Deprecated(SR.astDeprecatedIndexerNotation(), lhsm));
      return new SynExpr(2, [new SynConst(0), lhsm]);

    case 2:
      return mkSynInfix(dotm, a, ".()", b);
  }
}
export function mkSynUnit(m) {
  return new SynExpr(2, [new SynConst(0), m]);
}
export function mkSynUnitPat(m) {
  return new SynPat(0, [new SynConst(0), m]);
}
export function mkSynDelay(m, e) {
  return new SynExpr(15, [false, false, new SynSimplePats(0, [ofArray([mkSynCompGenSimplePatVar(mkSynId(m, "unitVar"))]), m]), e, m]);
}
export function mkSynAssign(l, r) {
  var a_1;
  var a;
  const m = unionRanges(l.Range, r.Range);
  let $var23;

  const activePatternResult15642 = _LongOrSingleIdent___(l);

  if (activePatternResult15642 != null) {
    if (getValue(activePatternResult15642)[0]) {
      $var23 = [1];
    } else if (getValue(activePatternResult15642)[2] == null) {
      $var23 = [0, getValue(activePatternResult15642)[1]];
    } else {
      $var23 = [1];
    }
  } else {
    $var23 = [1];
  }

  switch ($var23[0]) {
    case 0:
      return new SynExpr(30, [$var23[1], r, m]);

    case 1:
      let $var24;

      if (l.tag === 31) {
        $var24 = [0, l.data[0], l.data[2]];
      } else if (l.tag === 33) {
        $var24 = [1, l.data[0], l.data[1], l.data[2], l.data[3]];
      } else if (l.tag === 53) {
        $var24 = [2, l.data[0], l.data[1], l.data[2]];
      } else if (l.tag === 20) {
        if (l.data[2].tag === 20) {
          const activePatternResult15641 = _SingleIdent___(l.data[2].data[2]);

          if (activePatternResult15641 != null) {
            if (a_1 = l.data[2].data[3], getValue(activePatternResult15641).idText === opNameQMark) {
              $var24 = [3, l.data[2].data[3], l.data[3], getValue(activePatternResult15641)];
            } else {
              $var24 = [4];
            }
          } else {
            $var24 = [4];
          }
        } else {
          $var24 = [4];
        }
      } else {
        $var24 = [4];
      }

      switch ($var24[0]) {
        case 0:
          return new SynExpr(32, [$var24[1], $var24[2], r, m]);

        case 1:
          return new SynExpr(34, [$var24[1], $var24[2], r, $var24[4], $var24[3], m]);

        case 2:
          return new SynExpr(54, [$var24[1], $var24[2], $var24[3], r, m]);

        case 3:
          return mkSynQMarkSet(m, $var24[1], $var24[2], r);

        case 4:
          let $var25;

          if (l.tag === 20) {
            if (l.data[2].tag === 20) {
              const activePatternResult15640 = _SingleIdent___(l.data[2].data[2]);

              if (activePatternResult15640 != null) {
                if (a = l.data[2].data[3], getValue(activePatternResult15640).idText === opNameParenGet) {
                  $var25 = [0, l.data[2].data[3], l.data[3], getValue(activePatternResult15640)];
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

          switch ($var25[0]) {
            case 0:
              return mkSynDotParenSet(m, $var25[1], $var25[2], r);

            case 1:
              const $var26 = l.tag === 20 ? l.data[2].tag === 29 ? l.data[2].data[0] ? [2] : l.data[2].data[2] == null ? [0, l.data[2].data[1], l.data[3]] : [2] : l.data[2].tag === 31 ? [1, l.data[2].data[0], l.data[2].data[2], l.data[3]] : [2] : [2];

              switch ($var26[0]) {
                case 0:
                  return new SynExpr(35, [$var26[1], $var26[2], r, m]);

                case 1:
                  return new SynExpr(36, [$var26[1], $var26[2], $var26[3], r, m]);

                case 2:
                  errorR(new _Error(SR.astInvalidExprLeftHandOfAssignment(), m));
                  return l;
              }

          }

      }

  }
}
export function mkSynDot(dotm, m, l, r) {
  const $var27 = l.tag === 29 ? l.data[2] == null ? [0, l.data[1].data[1], l.data[0], l.data[1].data[0]] : [3, l] : l.tag === 28 ? [1, l.data] : l.tag === 31 ? [2, l.data[1], l.data[2].data[1], l.data[0], l.data[2].data[0]] : [3, l];

  switch ($var27[0]) {
    case 0:
      return new SynExpr(29, [$var27[2], new LongIdentWithDots(0, [append($var27[3], ofArray([r])), append($var27[1], ofArray([dotm]))]), null, m]);

    case 1:
      return new SynExpr(29, [false, new LongIdentWithDots(0, [ofArray([$var27[1], r]), ofArray([dotm])]), null, m]);

    case 2:
      return new SynExpr(31, [$var27[3], $var27[1], new LongIdentWithDots(0, [append($var27[4], ofArray([r])), append($var27[2], ofArray([dotm]))]), m]);

    case 3:
      return new SynExpr(31, [$var27[1], dotm, new LongIdentWithDots(0, [ofArray([r]), new List()]), m]);
  }
}
export function mkSynDotMissing(dotm, m, l) {
  const $var28 = l.tag === 29 ? l.data[2] == null ? [0, l.data[1].data[1], l.data[0], l.data[1].data[0]] : [3, l] : l.tag === 28 ? [1, l.data] : l.tag === 31 ? [2, l.data[1], l.data[2].data[1], l.data[0], l.data[2].data[0]] : [3, l];

  switch ($var28[0]) {
    case 0:
      return new SynExpr(29, [$var28[2], new LongIdentWithDots(0, [$var28[3], append($var28[1], ofArray([dotm]))]), null, m]);

    case 1:
      return new SynExpr(29, [false, new LongIdentWithDots(0, [ofArray([$var28[1]]), ofArray([dotm])]), null, m]);

    case 2:
      return new SynExpr(31, [$var28[3], $var28[1], new LongIdentWithDots(0, [$var28[4], append($var28[2], ofArray([dotm]))]), m]);

    case 3:
      return new SynExpr(57, [$var28[1], m]);
  }
}
export function mkSynFunMatchLambdas(synArgNameGenerator, isMember, wholem, ps, e) {
  const patternInput = PushCurriedPatternsToExpr(synArgNameGenerator, wholem, isMember, ps, e);
  return patternInput[1];
}
export function arbExpr(debugStr, range) {
  return new SynExpr(55, [debugStr, range.MakeSynthetic()]);
}
export class SynReturnInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SynReturnInfo",
      interfaces: ["FSharpUnion"],
      cases: [["SynReturnInfo", Tuple([SynType, SynArgInfo]), range_1]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SynReturnInfo", SynReturnInfo);
export const SynInfo = function (__exports) {
  const unnamedTopArg1 = __exports.unnamedTopArg1 = new SynArgInfo(0, [new List(), false, null]);
  const unnamedTopArg = __exports.unnamedTopArg = ofArray([unnamedTopArg1]);
  const unitArgData = __exports.unitArgData = unnamedTopArg;
  const unnamedRetVal = __exports.unnamedRetVal = new SynArgInfo(0, [new List(), false, null]);
  const selfMetadata = __exports.selfMetadata = unnamedTopArg;

  const HasNoArgs = __exports.HasNoArgs = function (_arg1) {
    return _arg1.data[0].tail == null;
  };

  const IsOptionalArg = __exports.IsOptionalArg = function (_arg1) {
    return _arg1.data[1];
  };

  const HasOptionalArgs = __exports.HasOptionalArgs = function (_arg1) {
    return exists(function (list) {
      return exists(function (arg00_) {
        return IsOptionalArg(arg00_);
      }, list);
    }, _arg1.data[0]);
  };

  const IncorporateEmptyTupledArgForPropertyGetter = __exports.IncorporateEmptyTupledArgForPropertyGetter = function (_arg1) {
    return new SynValInfo(0, [new List(new List(), _arg1.data[0]), _arg1.data[1]]);
  };

  const IncorporateSelfArg = __exports.IncorporateSelfArg = function (_arg1) {
    return new SynValInfo(0, [new List(selfMetadata, _arg1.data[0]), _arg1.data[1]]);
  };

  const IncorporateSetterArg = __exports.IncorporateSetterArg = function (_arg1) {
    let args;

    if (_arg1.data[0].tail != null) {
      if (_arg1.data[0].tail.tail == null) {
        args = ofArray([append(_arg1.data[0].head, ofArray([unnamedTopArg1]))]);
      } else {
        throw new Error("invalid setter type");
      }
    } else {
      args = ofArray([unnamedTopArg]);
    }

    return new SynValInfo(0, [args, _arg1.data[1]]);
  };

  const AritiesOfArgs = __exports.AritiesOfArgs = function (_arg1) {
    return map_1(function (list) {
      return list.length;
    }, _arg1.data[0]);
  };

  const AttribsOfArgData = __exports.AttribsOfArgData = function (_arg1) {
    return _arg1.data[0];
  };

  const InferSynArgInfoFromSimplePat = __exports.InferSynArgInfoFromSimplePat = function (attribs, p) {
    InferSynArgInfoFromSimplePat: while (true) {
      if (p.tag === 1) {
        attribs = attribs;
        p = p.data[0];
        continue InferSynArgInfoFromSimplePat;
      } else if (p.tag === 2) {
        attribs = append(attribs, p.data[1]);
        p = p.data[0];
        continue InferSynArgInfoFromSimplePat;
      } else {
        return new SynArgInfo(0, [attribs, p.data[4], p.data[2] ? null : p.data[0]]);
      }
    }
  };

  const InferSynArgInfoFromSimplePats = __exports.InferSynArgInfoFromSimplePats = function (x) {
    var attribs;

    InferSynArgInfoFromSimplePats: while (true) {
      if (x.tag === 1) {
        x = x.data[0];
        continue InferSynArgInfoFromSimplePats;
      } else {
        return map_1((attribs = new List(), function (p) {
          return InferSynArgInfoFromSimplePat(attribs, p);
        }), x.data[0]);
      }
    }
  };

  const InferSynArgInfoFromPat = __exports.InferSynArgInfoFromPat = function (p) {
    const patternInput = SimplePatsOfPat(new SynArgNameGenerator(), p);
    return InferSynArgInfoFromSimplePats(patternInput[0]);
  };

  const AdjustArgsForUnitElimination = __exports.AdjustArgsForUnitElimination = function (infosForArgs) {
    const $var29 = infosForArgs.tail != null ? infosForArgs.head.tail == null ? infosForArgs.tail.tail == null ? [0] : [1] : [1] : [1];

    switch ($var29[0]) {
      case 0:
        return infosForArgs;

      case 1:
        return map_1(function (_arg1) {
          return _arg1.tail == null ? unitArgData : _arg1;
        }, infosForArgs);
    }
  };

  const AdjustMemberArgs = __exports.AdjustMemberArgs = function (memFlags, infosForArgs) {
    const $var30 = infosForArgs.tail == null ? memFlags.Equals(new MemberKind(2)) ? [0] : [1] : [1];

    switch ($var30[0]) {
      case 0:
        return new List(new List(), infosForArgs);

      case 1:
        return infosForArgs;
    }
  };

  const InferLambdaArgs = __exports.InferLambdaArgs = function (origRhsExpr) {
    const loop = function (e) {
      const $var31 = e.tag === 15 ? e.data[0] ? [1] : [0, e.data[3], e.data[2]] : [1];

      switch ($var31[0]) {
        case 0:
          return new List(InferSynArgInfoFromSimplePats($var31[2]), loop($var31[1]));

        case 1:
          return new List();
      }
    };

    return loop(origRhsExpr);
  };

  const InferSynReturnData = __exports.InferSynReturnData = function (retInfo) {
    if (retInfo != null) {
      const retInfo_1 = getValue(retInfo).data[0][1];
      return retInfo_1;
    } else {
      return unnamedRetVal;
    }
  };

  const emptySynValInfo = new SynValInfo(0, [new List(), unnamedRetVal]);
  const emptySynValData = __exports.emptySynValData = new SynValData(0, [null, emptySynValInfo, null]);

  const InferSynValData = __exports.InferSynValData = function (memberFlagsOpt, pat, retInfo, origRhsExpr) {
    let infosForExplicitArgs;
    const $var32 = pat != null ? getValue(pat).tag === 7 ? getValue(pat).data[3].tag === 0 ? [0, getValue(pat).data[3].data] : [1] : [1] : [1];

    switch ($var32[0]) {
      case 0:
        infosForExplicitArgs = map_1(function (p) {
          return InferSynArgInfoFromPat(p);
        }, $var32[1]);
        break;

      case 1:
        infosForExplicitArgs = new List();
        break;
    }

    let explicitArgsAreSimple;
    const $var33 = pat != null ? getValue(pat).tag === 7 ? getValue(pat).data[3].tag === 0 ? [0, getValue(pat).data[3].data] : [1] : [1] : [1];

    switch ($var33[0]) {
      case 0:
        explicitArgsAreSimple = forAll(function (pat_1) {
          return isSimplePattern(pat_1);
        }, $var33[1]);
        break;

      case 1:
        explicitArgsAreSimple = true;
        break;
    }

    const retInfo_1 = InferSynReturnData(retInfo);

    if (memberFlagsOpt != null) {
      const infosForObjArgs = getValue(memberFlagsOpt).IsInstance ? ofArray([selfMetadata]) : new List();
      const infosForArgs = AdjustMemberArgs(getValue(memberFlagsOpt).MemberKind, infosForExplicitArgs);
      const infosForArgs_1 = AdjustArgsForUnitElimination(infosForArgs);
      const argInfos = append(infosForObjArgs, infosForArgs_1);
      return new SynValData(0, [getValue(memberFlagsOpt), new SynValInfo(0, [argInfos, retInfo_1]), null]);
    } else {
      const infosForLambdaArgs = InferLambdaArgs(origRhsExpr);
      const infosForArgs_2 = append(infosForExplicitArgs, explicitArgsAreSimple ? infosForLambdaArgs : new List());
      const infosForArgs_3 = AdjustArgsForUnitElimination(infosForArgs_2);
      return new SynValData(0, [null, new SynValInfo(0, [infosForArgs_3, retInfo_1]), null]);
    }
  };

  return __exports;
}({});
export function mkSynBindingRhs(staticOptimizations, rhsExpr, mRhs, retInfo) {
  const rhsExpr_1 = foldBack(function (tupledArg, e2) {
    return new SynExpr(52, [tupledArg[0], tupledArg[1], e2, mRhs]);
  }, staticOptimizations, rhsExpr);
  let patternInput;

  if (retInfo == null) {
    patternInput = [rhsExpr_1, null];
  } else {
    const tym = getValue(retInfo).data[1];
    const ty = getValue(retInfo).data[0][0];
    const rattribs = getValue(retInfo).data[0][1].data[0];
    patternInput = [new SynExpr(3, [rhsExpr_1, ty, rhsExpr_1.Range]), new SynBindingReturnInfo(0, [ty, tym, rattribs])];
  }

  return [patternInput[0], patternInput[1]];
}
export function mkSynBinding(xmlDoc, headPat, vis, isInline, isMutable, mBind, spBind, retInfo, origRhsExpr, mRhs, staticOptimizations, attrs, memberFlagsOpt) {
  const info = SynInfo.InferSynValData(memberFlagsOpt, headPat, retInfo, origRhsExpr);
  const patternInput = mkSynBindingRhs(staticOptimizations, origRhsExpr, mRhs, retInfo);
  return new SynBinding(0, [vis, new SynBindingKind(1), isInline, isMutable, attrs, xmlDoc, info, headPat, patternInput[1], patternInput[0], mBind, spBind]);
}
export function NonVirtualMemberFlags(k) {
  return new MemberFlags(true, false, false, false, k);
}
export const CtorMemberFlags = (() => {
  const MemberKind_1 = new MemberKind(1);
  return new MemberFlags(false, false, false, false, MemberKind_1);
})();
export const ClassCtorMemberFlags = (() => {
  const MemberKind_1 = new MemberKind(0);
  return new MemberFlags(false, false, false, false, MemberKind_1);
})();
export function OverrideMemberFlags(k) {
  return new MemberFlags(true, false, true, false, k);
}
export function AbstractMemberFlags(k) {
  return new MemberFlags(true, true, false, false, k);
}
export function StaticMemberFlags(k) {
  return new MemberFlags(false, false, false, false, k);
}
export const inferredTyparDecls = new SynValTyparDecls(0, [new List(), true, new List()]);
export const noInferredTypars = new SynValTyparDecls(0, [new List(), false, new List()]);
export class LexerIfdefStackEntry {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.LexerIfdefStackEntry",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["IfDefIf"], ["IfDefElse"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.LexerIfdefStackEntry", LexerIfdefStackEntry);
export class LexerEndlineContinuation {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.LexerEndlineContinuation",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Token", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      })], ["Skip", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), "number", range_1]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get LexerIfdefStack() {
    const $var34 = this.tag === 1 ? [0, this.data[0]] : [0, this.data];

    switch ($var34[0]) {
      case 0:
        return $var34[1];
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.LexerEndlineContinuation", LexerEndlineContinuation);
export class LexerIfdefExpression {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.LexerIfdefExpression",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["IfdefAnd", LexerIfdefExpression, LexerIfdefExpression], ["IfdefOr", LexerIfdefExpression, LexerIfdefExpression], ["IfdefNot", LexerIfdefExpression], ["IfdefId", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Ast.LexerIfdefExpression", LexerIfdefExpression);
export function LexerIfdefEval($var38, $var39) {
  LexerIfdefEval: while (true) {
    const lookup = $var38;
    const _arg1 = $var39;

    if (_arg1.tag === 1) {
      if (LexerIfdefEval(lookup, _arg1.data[0])) {
        return true;
      } else {
        $var38 = lookup;
        $var39 = _arg1.data[1];
        continue LexerIfdefEval;
      }
    } else if (_arg1.tag === 2) {
      return !LexerIfdefEval(lookup, _arg1.data);
    } else if (_arg1.tag === 3) {
      return lookup(_arg1.data);
    } else if (LexerIfdefEval(lookup, _arg1.data[0])) {
      $var38 = lookup;
      $var39 = _arg1.data[1];
      continue LexerIfdefEval;
    } else {
      return false;
    }
  }
}
export class LexerWhitespaceContinuation {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.LexerWhitespaceContinuation",
      interfaces: ["FSharpUnion"],
      cases: [["Token", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      })], ["IfDefSkip", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), "number", range_1], ["String", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), range_1], ["VerbatimString", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), range_1], ["TripleQuoteString", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), range_1], ["Comment", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), "number", range_1], ["SingleLineComment", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), "number", range_1], ["StringInComment", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), "number", range_1], ["VerbatimStringInComment", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), "number", range_1], ["TripleQuoteStringInComment", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), "number", range_1], ["MLOnly", makeGeneric(List, {
        T: Tuple([LexerIfdefStackEntry, range_1])
      }), range_1], ["EndLine", LexerEndlineContinuation]]
    };
  }

  get LexerIfdefStack() {
    const $var35 = this.tag === 1 ? [0, this.data[0]] : this.tag === 2 ? [0, this.data[0]] : this.tag === 3 ? [0, this.data[0]] : this.tag === 5 ? [0, this.data[0]] : this.tag === 6 ? [0, this.data[0]] : this.tag === 4 ? [0, this.data[0]] : this.tag === 7 ? [0, this.data[0]] : this.tag === 8 ? [0, this.data[0]] : this.tag === 9 ? [0, this.data[0]] : this.tag === 10 ? [0, this.data[0]] : this.tag === 11 ? [1] : [0, this.data];

    switch ($var35[0]) {
      case 0:
        return $var35[1];

      case 1:
        return this.data.LexerIfdefStack;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Ast.LexerWhitespaceContinuation", LexerWhitespaceContinuation);
export class SyntaxError extends Error {
  constructor(data0, range) {
    super();
    Object.setPrototypeOf(this, SyntaxError.prototype);
    this.Data0 = data0;
    this.range = range;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.SyntaxError",
      interfaces: ["FSharpException"],
      properties: {
        Data0: Any,
        range: range_1
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Ast.SyntaxError", SyntaxError);
export function posOfLexPosition(p) {
  return mkPos(p.Line, p.Column);
}
export function mkSynRange(p1, p2) {
  return mkFileIndexRange(p1.FileIndex, posOfLexPosition(p1), posOfLexPosition(p2));
}

function LexBuffer_1_get_LexemeRange() {
  return mkSynRange(this.StartPos, this.EndPos);
}

export { LexBuffer_1_get_LexemeRange as LexBuffer$60$1$2E$get_LexemeRange };
export function lhs(parseState) {
  const p1 = parseState.ResultStartPosition;
  const p2 = parseState.ResultEndPosition;
  return mkSynRange(p1, p2);
}
export function rhs2(parseState, i, j) {
  const p1 = parseState.InputStartPosition(i);
  const p2 = parseState.InputEndPosition(j);
  return mkSynRange(p1, p2);
}
export function rhs(parseState, i) {
  return rhs2(parseState, i, i);
}

function IParseState_get_SynArgNameGenerator() {
  const bls = this.LexBuffer.BufferLocalStore;

  if (!bls.has("SynArgNameGenerator")) {
    bls.set("SynArgNameGenerator", new SynArgNameGenerator());
  }

  return bls.get("SynArgNameGenerator");
}

export { IParseState_get_SynArgNameGenerator as IParseState$2E$get_SynArgNameGenerator };

function IParseState_ResetSynArgNameGenerator() {
  IParseState_get_SynArgNameGenerator.bind(this)().Reset();
}

export { IParseState_ResetSynArgNameGenerator as IParseState$2E$ResetSynArgNameGenerator };
export const LexbufLocalXmlDocStore = function (__exports) {
  const xmlDocKey = "XmlDoc";

  const ClearXmlDoc = __exports.ClearXmlDoc = function (lexbuf) {
    lexbuf.BufferLocalStore.set(xmlDocKey, new XmlDocCollector());
  };

  const SaveXmlDocLine = __exports.SaveXmlDocLine = function (lexbuf, lineText, pos) {
    if (!lexbuf.BufferLocalStore.has(xmlDocKey)) {
      lexbuf.BufferLocalStore.set(xmlDocKey, new XmlDocCollector());
    }

    const collector = lexbuf.BufferLocalStore.get(xmlDocKey);
    collector.AddXmlDocLine(lineText, pos);
  };

  const GrabXmlDocBeforeMarker = __exports.GrabXmlDocBeforeMarker = function (lexbuf, markerRange) {
    if (lexbuf.BufferLocalStore.has(xmlDocKey)) {
      return PreXmlDoc.CreateFromGrabPoint(lexbuf.BufferLocalStore.get(xmlDocKey), markerRange.End);
    } else {
      return PreXmlDoc.Empty;
    }
  };

  return __exports;
}({});
export class NiceNameGenerator {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.NiceNameGenerator",
      properties: {}
    };
  }

  constructor() {
    this.lockObj = {};
    this.basicNameCounts = new Map();
  }

  FreshCompilerGeneratedName(name, m) {
    return Microsoft.FSharp.Core.Operators.lock(this.lockObj, () => {
      const basicName = GetBasicNameOfPossibleCompilerGeneratedName(name);
      const n = (this.basicNameCounts.has(basicName) ? this.basicNameCounts.get(basicName) : 0) | 0;
      const nm = CompilerGeneratedNameSuffix(basicName, m.StartLine.toString() + (n === 0 ? "" : "-" + n.toString()));
      this.basicNameCounts.set(basicName, n + 1);
      return nm;
    });
  }

  Reset() {
    Microsoft.FSharp.Core.Operators.lock(this.lockObj, () => {
      this.basicNameCounts.clear();
    });
  }

}
setType("Microsoft.FSharp.Compiler.Ast.NiceNameGenerator", NiceNameGenerator);
export class StableNiceNameGenerator {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Ast.StableNiceNameGenerator",
      properties: {}
    };
  }

  constructor() {
    this.lockObj = {};
    this.names = create();
    this.basicNameCounts = new Map();
  }

  GetUniqueCompilerGeneratedName(name, m, uniq) {
    return Microsoft.FSharp.Core.Operators.lock(this.lockObj, () => {
      const basicName = GetBasicNameOfPossibleCompilerGeneratedName(name);

      if (this.names.has([basicName, uniq])) {
        return this.names.get([basicName, uniq]);
      } else {
        const n = (this.basicNameCounts.has(basicName) ? this.basicNameCounts.get(basicName) : 0) | 0;
        const nm = CompilerGeneratedNameSuffix(basicName, m.StartLine.toString() + (n === 0 ? "" : "-" + n.toString()));
        this.names.set([basicName, uniq], nm);
        this.basicNameCounts.set(basicName, n + 1);
        return nm;
      }
    });
  }

  Reset() {
    Microsoft.FSharp.Core.Operators.lock(this.lockObj, () => {
      this.basicNameCounts.clear();
      this.names.clear();
    });
  }

}
setType("Microsoft.FSharp.Compiler.Ast.StableNiceNameGenerator", StableNiceNameGenerator);
export function synExprContainsError(inpExpr) {
  const walkBind = function (_arg1) {
    return walkExpr(_arg1.data[9]);
  };

  const walkExprs = function (es) {
    return exists(walkExpr, es);
  };

  const walkBinds = function (es_1) {
    return exists(walkBind, es_1);
  };

  const walkMatchClauses = function (cl) {
    return exists(function (_arg1_1) {
      return walkExprOpt(_arg1_1.data[1]) ? true : walkExpr(_arg1_1.data[2]);
    }, cl);
  };

  const walkExprOpt = function (eOpt) {
    return exists(walkExpr, defaultArg(eOpt, [], $var36 => [$var36]));
  };

  const walkExpr = function (e) {
    walkExpr: while (true) {
      const $var37 = e.tag === 57 ? [0] : e.tag === 55 ? [0] : e.tag === 29 ? [1] : e.tag === 1 ? [1] : e.tag === 51 ? [1] : e.tag === 52 ? [1] : e.tag === 42 ? [1] : e.tag === 28 ? [1] : e.tag === 46 ? [1] : e.tag === 2 ? [1] : e.tag === 37 ? [2, e.data[0]] : e.tag === 38 ? [2, e.data[0]] : e.tag === 43 ? [2, e.data[1]] : e.tag === 14 ? [2, e.data[2]] : e.tag === 13 ? [2, e.data[1]] : e.tag === 3 ? [2, e.data[0]] : e.tag === 18 ? [2, e.data[0]] : e.tag === 19 ? [2, e.data[0]] : e.tag === 31 ? [2, e.data[0]] : e.tag === 30 ? [2, e.data[1]] : e.tag === 8 ? [2, e.data[2]] : e.tag === 21 ? [2, e.data[0]] : e.tag === 53 ? [2, e.data[0]] : e.tag === 39 ? [2, e.data[0]] : e.tag === 40 ? [2, e.data[0]] : e.tag === 41 ? [2, e.data[0]] : e.tag === 25 ? [2, e.data[0]] : e.tag === 44 ? [2, e.data[2]] : e.tag === 47 ? [2, e.data[1]] : e.tag === 48 ? [2, e.data[1]] : e.tag === 50 ? [2, e.data[0]] : e.tag === 58 ? [2, e.data[0]] : e.tag === 0 ? [2, e.data[0]] : e.tag === 35 ? [3, e.data[1], e.data[2]] : e.tag === 32 ? [3, e.data[0], e.data[2]] : e.tag === 54 ? [3, e.data[0], e.data[3]] : e.tag === 45 ? [3, e.data[0], e.data[2]] : e.tag === 20 ? [3, e.data[2], e.data[3]] : e.tag === 6 ? [4, e.data[1]] : e.tag === 4 ? [4, e.data[0]] : e.tag === 5 ? [4, e.data[0]] : e.tag === 7 ? [5] : e.tag === 9 ? [6] : e.tag === 12 ? [7, e.data[4], e.data[5]] : e.tag === 10 ? [7, e.data[1], e.data[2]] : e.tag === 11 ? [8] : e.tag === 16 ? [9] : e.tag === 15 ? [10] : e.tag === 17 ? [11] : e.tag === 22 ? [12] : e.tag === 23 ? [13] : e.tag === 24 ? [14] : e.tag === 26 ? [15] : e.tag === 27 ? [16] : e.tag === 33 ? [17] : e.tag === 34 ? [18] : e.tag === 36 ? [19] : e.tag === 49 ? [20] : [0];

      switch ($var37[0]) {
        case 0:
          return true;

        case 1:
          return false;

        case 2:
          e = $var37[1];
          continue walkExpr;

        case 3:
          if (walkExpr($var37[1])) {
            return true;
          } else {
            e = $var37[2];
            continue walkExpr;
          }

        case 4:
          return walkExprs($var37[1]);

        case 5:
          const flds = choose(function (tupledArg) {
            return tupledArg[1];
          }, e.data[2]);
          return walkExprs(flds);

        case 6:
          if (walkBinds(e.data[2])) {
            return true;
          } else {
            return walkBinds(toList(delay(function () {
              return collect(function (matchValue) {
                return matchValue.data[1];
              }, e.data[3]);
            })));
          }

        case 7:
          if (walkExpr($var37[1])) {
            return true;
          } else {
            e = $var37[2];
            continue walkExpr;
          }

        case 8:
          if (walkExpr(e.data[2]) ? true : walkExpr(e.data[4])) {
            return true;
          } else {
            e = e.data[5];
            continue walkExpr;
          }

        case 9:
          return walkMatchClauses(e.data[2]);

        case 10:
          e = e.data[3];
          continue walkExpr;

        case 11:
          if (walkExpr(e.data[1])) {
            return true;
          } else {
            return walkMatchClauses(e.data[2]);
          }

        case 12:
          if (walkBinds(e.data[2])) {
            return true;
          } else {
            e = e.data[3];
            continue walkExpr;
          }

        case 13:
          if (walkExpr(e.data[0])) {
            return true;
          } else {
            return walkMatchClauses(e.data[2]);
          }

        case 14:
          if (walkExpr(e.data[0])) {
            return true;
          } else {
            e = e.data[1];
            continue walkExpr;
          }

        case 15:
          if (walkExpr(e.data[2])) {
            return true;
          } else {
            e = e.data[3];
            continue walkExpr;
          }

        case 16:
          if (walkExpr(e.data[0]) ? true : walkExpr(e.data[1])) {
            return true;
          } else {
            return walkExprOpt(e.data[2]);
          }

        case 17:
          if (walkExpr(e.data[0])) {
            return true;
          } else {
            return walkExprs(toList(delay(function () {
              return collect(function (e_1) {
                return e_1.Exprs;
              }, e.data[1]);
            })));
          }

        case 18:
          if (walkExpr(e.data[0]) ? true : walkExprs(toList(delay(function () {
            return collect(function (e_2) {
              return e_2.Exprs;
            }, e.data[1]);
          })))) {
            return true;
          } else {
            e = e.data[2];
            continue walkExpr;
          }

        case 19:
          if (walkExpr(e.data[0]) ? true : walkExpr(e.data[2])) {
            return true;
          } else {
            e = e.data[3];
            continue walkExpr;
          }

        case 20:
          if (walkExpr(e.data[4])) {
            return true;
          } else {
            e = e.data[5];
            continue walkExpr;
          }

      }
    }
  };

  return walkExpr(inpExpr);
}