import { JaroWinklerDistance, CalcEditDistance } from "../utils/EditDistance";
import { printf, toText, join, endsWith } from "../fable-core/String";
import { choose, sortWith, mapIndexed, takeWhile, map, toList, forAll } from "../fable-core/Seq";
import { map as map_1 } from "../fable-core/List";
import List from "../fable-core/List";
import { compare } from "../fable-core/Util";
import CurriedLambda from "../fable-core/CurriedLambda";
import { SR } from "../codegen/FSComp";
export const maxSuggestions = 5;
export const minThresholdForSuggestions = 0.7;
export const highConfidenceThreshold = 0.85;
export const minStringLengthForThreshold = 3;
export function IsInEditDistanceProximity(idText, suggestion) {
  const editDistance = CalcEditDistance(idText, suggestion) | 0;
  let threshold;
  const matchValue = idText.length | 0;

  if (matchValue < 5) {
    threshold = 1;
  } else if (matchValue < 7) {
    threshold = 2;
  } else {
    threshold = ~~(matchValue / 4) + 1 | 0;
  }

  return editDistance <= threshold;
}
export function FilterPredictions(idText, suggestionF) {
  const uppercaseText = idText.toUpperCase();
  const allSuggestions = suggestionF();

  const demangle = function (nm) {
    if (nm.indexOf("( ") === 0 ? endsWith(nm, " )") : false) {
      const cleanName = nm.slice(2, nm.length - 3 + 1);
      return cleanName;
    } else {
      return nm;
    }
  };

  const IsOperatorName = function (name) {
    if (!(name.indexOf("( ") === 0 ? endsWith(name, " )") : false)) {
      return false;
    } else {
      const name_1 = name.slice(2, name.length - 3 + 1);
      const res = forAll(function (c) {
        return c !== " ";
      }, name_1);
      return res;
    }
  };

  if (allSuggestions.has(idText)) {
    return new List();
  } else {
    return toList(map(function (tuple) {
      return tuple[1];
    }, takeWhile(function (tupledArg) {
      return tupledArg[0] < maxSuggestions;
    }, mapIndexed(function (i, x) {
      return [i, x];
    }, sortWith(($var1, $var2) => -compare(function (tuple_1) {
      return tuple_1[0];
    }($var1), function (tuple_1) {
      return tuple_1[0];
    }($var2)), choose(function (suggestion) {
      if (IsOperatorName(suggestion) ? true : suggestion.indexOf("_") === 0) {
        return null;
      } else {
        const suggestion_1 = demangle(suggestion);
        const suggestedText = suggestion_1.toUpperCase();
        const similarity = JaroWinklerDistance(uppercaseText, suggestedText);

        if (similarity >= highConfidenceThreshold ? true : endsWith(suggestion_1, "." + idText)) {
          return [similarity, suggestion_1];
        } else if (similarity < minThresholdForSuggestions ? suggestedText.length > minStringLengthForThreshold : false) {
          return null;
        } else if (IsInEditDistanceProximity(uppercaseText, suggestedText)) {
          return [similarity, suggestion_1];
        } else {
          return null;
        }
      }
    }, allSuggestions))))));
  }
}
export function FormatPredictions(normalizeF, predictions) {
  if (predictions.tail == null) {
    return "";
  } else {
    const suggestions = join("", map_1(CurriedLambda(toText(printf("%s   %s")))("\n"), map_1($var3 => normalizeF(function (tuple) {
      return tuple[1];
    }($var3)), predictions)));
    return " " + SR.undefinedNameSuggestionsIntro() + suggestions;
  }
}