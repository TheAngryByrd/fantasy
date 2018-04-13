import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives } from "../fable-core/Util";
export class NumberKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.NumberKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Int8"], ["UInt8"], ["Int16"], ["UInt16"], ["Int32"], ["UInt32"], ["Float32"], ["Float64"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.NumberKind", NumberKind);
export class ExtendedNumberKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.ExtendedNumberKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Int64"], ["UInt64"], ["Decimal"], ["BigInt"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.ExtendedNumberKind", ExtendedNumberKind);
export class RegexFlag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.RegexFlag",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["RegexGlobal"], ["RegexIgnoreCase"], ["RegexMultiline"], ["RegexSticky"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.RegexFlag", RegexFlag);
export class UnaryOperator {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.UnaryOperator",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["UnaryMinus"], ["UnaryPlus"], ["UnaryNot"], ["UnaryNotBitwise"], ["UnaryTypeof"], ["UnaryVoid"], ["UnaryDelete"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.UnaryOperator", UnaryOperator);
export class UpdateOperator {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.UpdateOperator",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["UpdateMinus"], ["UpdatePlus"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.UpdateOperator", UpdateOperator);
export class BinaryOperator {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.BinaryOperator",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["BinaryEqual"], ["BinaryUnequal"], ["BinaryEqualStrict"], ["BinaryUnequalStrict"], ["BinaryLess"], ["BinaryLessOrEqual"], ["BinaryGreater"], ["BinaryGreaterOrEqual"], ["BinaryShiftLeft"], ["BinaryShiftRightSignPropagating"], ["BinaryShiftRightZeroFill"], ["BinaryMinus"], ["BinaryPlus"], ["BinaryMultiply"], ["BinaryDivide"], ["BinaryModulus"], ["BinaryExponent"], ["BinaryOrBitwise"], ["BinaryXorBitwise"], ["BinaryAndBitwise"], ["BinaryIn"], ["BinaryInstanceOf"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.BinaryOperator", BinaryOperator);
export class LogicalOperator {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.LogicalOperator",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["LogicalOr"], ["LogicalAnd"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.LogicalOperator", LogicalOperator);
export class AssignmentOperator {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.AssignmentOperator",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["AssignEqual"], ["AssignMinus"], ["AssignPlus"], ["AssignMultiply"], ["AssignDivide"], ["AssignModulus"], ["AssignShiftLeft"], ["AssignShiftRightSignPropagating"], ["AssignShiftRightZeroFill"], ["AssignOrBitwise"], ["AssignXorBitwise"], ["AssignAndBitwise"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.AssignmentOperator", AssignmentOperator);