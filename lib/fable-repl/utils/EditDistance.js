import { initialize } from "../fable-core/Seq";
export function jaro(s1, s2) {
  let matchRadius;
  const minLen = (s1.length < s2.length ? s1.length : s2.length) | 0;
  matchRadius = ~~(minLen / 2) + minLen % 2 | 0;

  const commonChars = function (chars1, chars2) {
    const result = [];

    for (let i = 0; i <= chars1.length - 1; i++) {
      const c = chars1[i];

      if ((() => {
        const startAt = (0 > i - matchRadius ? 0 : i - matchRadius) | 0;
        const endAt = (i + matchRadius < chars2.length - 1 ? i + matchRadius : chars2.length - 1) | 0;

        if (endAt - startAt < 0) {
          return false;
        } else {
          const exists = function (index) {
            exists: while (true) {
              if (chars2[index] === c) {
                return true;
              } else if (index === endAt) {
                return false;
              } else {
                index = index + 1;
                continue exists;
              }
            }
          };

          return exists(startAt);
        }
      })()) {
        result.push(c);
      }
    }

    return result;
  };

  const c1 = commonChars(s1, s2);
  const c2 = commonChars(s2, s1);
  const c1length = c1.length;
  const c2length = c2.length;
  let transpositions;
  let mismatches = 0;

  for (let i_1 = 0; i_1 <= (c1.length < c2.length ? c1.length : c2.length) - 1; i_1++) {
    if (c1[i_1] !== c2[i_1]) {
      mismatches = mismatches + 1;
    }
  }

  transpositions = (mismatches + Math.abs(c1length - c2length)) / 2;
  const tLength = c1length > c2length ? c1length : c2length;
  const result_1 = (c1length / s1.length + c2length / s2.length + (tLength - transpositions) / tLength) / 3;

  if (Number.isNaN(result_1)) {
    return 0;
  } else {
    return result_1;
  }
}
export function JaroWinklerDistance(s1, s2) {
  const jaroScore = jaro(s1, s2);
  const maxLength = (s1.length < s2.length ? s1.length : s2.length) - 1 | 0;

  const calcL = function (i, acc) {
    calcL: while (true) {
      if (i > maxLength ? true : s1[i] !== s2[i]) {
        return acc;
      } else {
        i = i + 1;
        acc = acc + 1;
        continue calcL;
      }
    }
  };

  const l = calcL(0, 0) < 4 ? calcL(0, 0) : 4;
  return jaroScore + l * 0.1 * (1 - jaroScore);
}

function calcDamerauLevenshtein(a, b) {
  const m = b.length + 1 | 0;
  let lastLine = Int32Array.from(initialize(m, function (x) {
    return x;
  }));
  let lastLastLine = new Int32Array(m);
  let actLine = new Int32Array(m);

  for (let i = 1; i <= a.length; i++) {
    actLine[0] = i | 0;

    for (let j = 1; j <= b.length; j++) {
      const cost = (a[i - 1] === b[j - 1] ? 0 : 1) | 0;
      const deletion = lastLine[j] + 1 | 0;
      const insertion = actLine[j - 1] + 1 | 0;
      const substitution = lastLine[j - 1] + cost | 0;

      actLine[j] = function (e2) {
        return substitution < e2 ? substitution : e2;
      }(function (e2_1) {
        return insertion < e2_1 ? insertion : e2_1;
      }(deletion)) | 0;

      if (i > 1 ? j > 1 : false) {
        if (a[i - 1] === b[j - 2] ? a[i - 2] === b[j - 1] : false) {
          const transposition = lastLastLine[j - 2] + cost | 0;

          if (actLine[j] < transposition) {
            actLine[j] = actLine[j] | 0;
          } else {
            actLine[j] = transposition | 0;
          }
        }
      }
    }

    const temp = lastLastLine;
    lastLastLine = lastLine;
    lastLine = actLine;
    actLine = temp;
  }

  return lastLine[b.length] | 0;
}

export function CalcEditDistance(a, b) {
  if (a.length > b.length) {
    return calcDamerauLevenshtein(a, b) | 0;
  } else {
    return calcDamerauLevenshtein(b, a) | 0;
  }
}