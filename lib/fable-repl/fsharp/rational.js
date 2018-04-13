import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { toInt32, abs, op_Addition, one, fromInt32, op_UnaryNegation, op_Multiply, op_Division, op_Modulus, zero } from "../fable-core/BigInt";
import BigInt from "../fable-core/BigInt";
import { toString, compareRecords, equalsRecords } from "../fable-core/Util";
import { printf, toText } from "../fable-core/String";
export class Rational {
  constructor(numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Rational.Rational",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        numerator: BigInt,
        denominator: BigInt
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
setType("Microsoft.FSharp.Compiler.Rational.Rational", Rational);
export function gcd(a, b) {
  gcd: while (true) {
    if (b.Equals(zero)) {
      return a;
    } else {
      const $var1 = b;
      b = op_Modulus(a, b);
      a = $var1;
      continue gcd;
    }
  }
}
export function lcm(a, b) {
  return op_Division(op_Multiply(a, b), gcd(a, b));
}
export function mkRational(p, q) {
  let patternInput;

  if (q.Equals(zero)) {
    throw new Error();
  }

  const g = gcd(q, p);
  patternInput = [op_Division(p, g), op_Division(q, g)];
  const patternInput_1 = patternInput[1].CompareTo(zero) > 0 ? [patternInput[0], patternInput[1]] : [op_UnaryNegation(patternInput[0]), op_UnaryNegation(patternInput[1])];
  return new Rational(patternInput_1[0], patternInput_1[1]);
}
export function intToRational(p) {
  return mkRational(fromInt32(p), one);
}
export const ZeroRational = mkRational(zero, one);
export const OneRational = mkRational(one, one);
export function AddRational(m, n) {
  const d = gcd(m.denominator, n.denominator);
  const m_ = op_Division(m.denominator, d);
  const n_ = op_Division(n.denominator, d);
  return mkRational(op_Addition(op_Multiply(m.numerator, n_), op_Multiply(n.numerator, m_)), op_Multiply(m.denominator, n_));
}
export function NegRational(m) {
  return mkRational(op_UnaryNegation(m.numerator), m.denominator);
}
export function MulRational(m, n) {
  return mkRational(op_Multiply(m.numerator, n.numerator), op_Multiply(m.denominator, n.denominator));
}
export function DivRational(m, n) {
  return mkRational(op_Multiply(m.numerator, n.denominator), op_Multiply(m.denominator, n.numerator));
}
export function AbsRational(m) {
  return mkRational(abs(m.numerator), m.denominator);
}
export function RationalToString(m) {
  if (m.denominator.Equals(one)) {
    return toString(m.numerator);
  } else {
    return toText(printf("(%A/%A)"))(m.numerator, m.denominator);
  }
}
export function GcdRational(m, n) {
  return mkRational(gcd(m.numerator, n.numerator), lcm(m.denominator, n.denominator));
}
export function GetNumerator(p) {
  return toInt32(p.numerator) | 0;
}
export function GetDenominator(p) {
  return toInt32(p.denominator) | 0;
}
export function SignRational(p) {
  if (p.numerator.CompareTo(zero) < 0) {
    return -1 | 0;
  } else if (p.numerator.CompareTo(zero) > 0) {
    return 1;
  } else {
    return 0;
  }
}