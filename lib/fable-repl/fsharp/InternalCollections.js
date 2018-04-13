import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equals, makeGeneric, GenericParam } from "../fable-core/Util";
import { System } from "../fcs-fable/adapters";
import { map, mapIndexed, partition, filter, ofArray, append } from "../fable-core/List";
import List from "../fable-core/List";
import { makeSome, getValue } from "../fable-core/Option";
import CurriedLambda from "../fable-core/CurriedLambda";
import { iterate, empty, singleton, collect, delay, toList } from "../fable-core/Seq";
export class ValueStrength {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Collections.ValueStrength",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Strong", GenericParam("T")], ["Weak", makeGeneric(System.WeakReference, {
        T: GenericParam("T")
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Internal.Utilities.Collections.ValueStrength", ValueStrength);
export class AgedLookup {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Collections.AgedLookup",
      properties: {}
    };
  }

  constructor(keepStrongly, areSimilar, requiredToKeep, onStrongDiscard, keepMax) {
    this.areSimilar = areSimilar;
    this.onStrongDiscard = onStrongDiscard;
    this.refs = new List();
    this["keepStrongly@25"] = keepStrongly | 0;
    const keepMax_1 = keepMax != null ? keepMax : 75;

    if (this["keepStrongly@25"] > keepMax_1) {
      this["keepMax@36-1"] = this["keepStrongly@25"] | 0;
    } else {
      this["keepMax@36-1"] = keepMax_1;
    }

    if (requiredToKeep != null) {
      this["requiredToKeep@37"] = requiredToKeep;
    } else {
      this["requiredToKeep@37"] = _arg1 => false;
    }
  }

  static [".ctor"](keepStrongly, areSame, _arg1) {
    return new AgedLookup(keepStrongly, areSame);
  }

  TryPeekKeyValue(tok, key) {
    const data = this.FilterAndHold(tok);
    return this.TryPeekKeyValueImpl(data, key);
  }

  TryGetKeyValue(tok, key) {
    const data = this.FilterAndHold(tok);
    const patternInput = this.TryGetKeyValueImpl(data, key);
    const discard1 = new List();
    this.AssignWithStrength(tok, patternInput[1], discard1);
    return patternInput[0];
  }

  TryGet(tok, key) {
    const data = this.FilterAndHold(tok);
    const patternInput = this.TryGetKeyValueImpl(data, key);
    const discard1 = new List();
    this.AssignWithStrength(tok, patternInput[1], discard1);

    if (patternInput[0] == null) {
      return null;
    } else {
      const value = getValue(patternInput[0])[1];
      return makeSome(value);
    }
  }

  Put(tok, key, value) {
    const data = this.FilterAndHold(tok);
    const patternInput = this.Exists(data, key) ? this.RemoveImpl(data, key) : [data, new List()];
    const data_1 = this.Add(patternInput[0], key, value);
    this.AssignWithStrength(tok, data_1, patternInput[1]);
  }

  Remove(tok, key) {
    const data = this.FilterAndHold(tok);
    const patternInput = this.RemoveImpl(data, key);
    this.AssignWithStrength(tok, patternInput[0], patternInput[1]);
  }

  Clear(tok) {
    const discards = this.FilterAndHold(tok);
    const newdata = new List();
    this.AssignWithStrength(tok, newdata, discards);
  }

  Resize(tok, newKeepStrongly, newKeepMax) {
    const newKeepMax_1 = newKeepMax != null ? newKeepMax : 75;
    this["keepStrongly@25"] = newKeepStrongly | 0;

    if (newKeepStrongly > newKeepMax_1) {
      this["keepMax@36-1"] = newKeepStrongly | 0;
    } else {
      this["keepMax@36-1"] = newKeepMax_1;
    }

    const keep = this.FilterAndHold(tok);
    const discard1 = new List();
    this.AssignWithStrength(tok, keep, discard1);
  }

  strongDiscard(x) {
    const matchValue = this.onStrongDiscard;

    if (matchValue != null) {
      getValue(matchValue)(x);
    }
  }

  TryPeekKeyValueImpl(data, key) {
    const Lookup = (key_1, _arg2) => {
      Lookup: while (true) {
        if (_arg2.tail != null) {
          const value = _arg2.head[1];
          const similarKey = _arg2.head[0];

          if (this.areSimilar([key_1, similarKey])) {
            return [similarKey, value];
          } else {
            key_1 = key_1;
            _arg2 = _arg2.tail;
            continue Lookup;
          }
        } else {
          return null;
        }
      }
    };

    return Lookup(key, data);
  }

  Exists(data, key) {
    return CurriedLambda(() => this.TryPeekKeyValueImpl(data, key) != null)();
  }

  Add(data, key, value) {
    return append(data, ofArray([[key, value]]));
  }

  Promote(data, key, value) {
    return append(filter(tupledArg => !this.areSimilar([key, tupledArg[0]]), data), ofArray([[key, value]]));
  }

  RemoveImpl(data, key) {
    const patternInput = partition(tupledArg => this.areSimilar([key, tupledArg[0]]), data);
    return [patternInput[1], patternInput[0]];
  }

  TryGetKeyValueImpl(data, key) {
    const matchValue = this.TryPeekKeyValueImpl(data, key);

    if (matchValue == null) {
      return [null, data];
    } else {
      const value = getValue(matchValue)[1];
      const similarKey = getValue(matchValue)[0];
      return [matchValue, this.Promote(data, similarKey, value)];
    }
  }

  FilterAndHold(tok) {
    tok;
    return toList(delay(() => collect(matchValue => {
      if (matchValue[1].tag === 1) {
        const matchValue_1 = matchValue[1].data.TryGetTarget();

        if (matchValue_1[0]) {
          return singleton([matchValue[0], matchValue_1[1]]);
        } else {
          return empty();
        }
      } else {
        return singleton([matchValue[0], matchValue[1].data]);
      }
    }, this.refs)));
  }

  AssignWithStrength(tok, newdata, discard1) {
    const actualLength = newdata.length | 0;
    const tossThreshold = (0 > actualLength - this["keepMax@36-1"] ? 0 : actualLength - this["keepMax@36-1"]) | 0;
    const weakThreshhold = (0 > actualLength - this["keepStrongly@25"] ? 0 : actualLength - this["keepStrongly@25"]) | 0;
    const newdata_1 = mapIndexed((n, kv) => [n, kv], newdata);
    const patternInput = partition(tupledArg => tupledArg[0] >= tossThreshold ? true : this["requiredToKeep@37"](tupledArg[1][1]), newdata_1);
    const newdata_2 = map(tupledArg_1 => {
      const handle = (tupledArg_1[0] < weakThreshhold ? !this["requiredToKeep@37"](tupledArg_1[1][1]) : false) ? new ValueStrength(1, new System.WeakReference(tupledArg_1[1][1])) : new ValueStrength(0, tupledArg_1[1][1]);
      return [tupledArg_1[1][0], handle];
    }, patternInput[0]);
    tok;
    this.refs = newdata_2;
    iterate($var1 => (x => {
      this.strongDiscard(x);
    })((tuple => tuple[1])($var1)), discard1);
    iterate($var3 => (x_1 => {
      this.strongDiscard(x_1);
    })(($var2 => $var2[1][1])($var3)), patternInput[1]);
  }

}
setType("Internal.Utilities.Collections.AgedLookup", AgedLookup);
export class MruCache {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Collections.MruCache",
      properties: {}
    };
  }

  constructor(keepStrongly, areSame, isStillValid, areSimilar, requiredToKeep, onStrongDiscard, keepMax) {
    this.areSame = areSame;
    const areSimilar_1 = areSimilar != null ? areSimilar : this.areSame;
    this.cache = new AgedLookup(keepStrongly, areSimilar_1, requiredToKeep, onStrongDiscard, keepMax);

    if (isStillValid != null) {
      this["isStillValid@176"] = isStillValid;
    } else {
      this["isStillValid@176"] = _arg5 => true;
    }
  }

  ContainsSimilarKey(tok, key) {
    const matchValue = this.cache.TryPeekKeyValue(tok, key);

    if (matchValue == null) {
      return false;
    } else {
      const _value = getValue(matchValue)[1];
      const _similarKey = getValue(matchValue)[0];
      return true;
    }
  }

  TryGetAny(tok, key) {
    const matchValue = this.cache.TryPeekKeyValue(tok, key);

    if (matchValue == null) {
      return null;
    } else {
      const value = getValue(matchValue)[1];
      const similarKey = getValue(matchValue)[0];

      if (this.areSame([similarKey, key])) {
        return makeSome(value);
      } else {
        return null;
      }
    }
  }

  TryGet(tok, key) {
    const matchValue = this.cache.TryGetKeyValue(tok, key);

    if (matchValue == null) {
      return null;
    } else {
      const value = getValue(matchValue)[1];
      const similarKey = getValue(matchValue)[0];

      if (this.areSame([similarKey, key]) ? this["isStillValid@176"]([key, value]) : false) {
        return makeSome(value);
      } else {
        return null;
      }
    }
  }

  Set(tok, key, value) {
    this.cache.Put(tok, key, value);
  }

  RemoveAnySimilar(tok, key) {
    this.cache.Remove(tok, key);
  }

  Clear(tok) {
    this.cache.Clear(tok);
  }

  Resize(tok, newKeepStrongly, newKeepMax) {
    this.cache.Resize(tok, newKeepStrongly, newKeepMax);
  }

}
setType("Internal.Utilities.Collections.MruCache", MruCache);