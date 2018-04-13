import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equals, GenericParam, makeGeneric } from "../fable-core/Util";
import List from "../fable-core/List";
import { iterateIndexed, getEnumerator, map, singleton, append, collect, delay, toIterator } from "../fable-core/Seq";
import { tryGetValue, create } from "../fable-core/Map";
import { fromEqualityComparer } from "../fable-core/Comparer";
import { makeSome } from "../fable-core/Option";
export class HashMultiMap {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Collections.HashMultiMap",
      interfaces: ["System.Collections.Generic.ICollection", "System.Collections.Generic.IEnumerable"],
      properties: {
        Count: "number",
        FirstEntries: makeGeneric(Map, {
          TKey: GenericParam("Key"),
          TValue: GenericParam("Value")
        }),
        Item: GenericParam("Value"),
        Rest: makeGeneric(Map, {
          TKey: GenericParam("Key"),
          TValue: makeGeneric(List, {
            T: GenericParam("Value")
          })
        })
      }
    };
  }

  [Symbol.iterator]() {
    return toIterator(this.GetEnumerator());
  }

  constructor(n, hasheq) {
    this.hasheq = hasheq;
    this.firstEntries = create(null, fromEqualityComparer(this.hasheq));
    this.rest = create(null, fromEqualityComparer(this.hasheq));
  }

  static [".ctor"](n, hasheq, _arg1) {
    return new HashMultiMap(n, hasheq);
  }

  GetRest(k) {
    const patternInput = tryGetValue(this.rest, k, null);

    if (patternInput[0]) {
      return patternInput[1];
    } else {
      return new List();
    }
  }

  Add_0(y, z) {
    const patternInput = tryGetValue(this.firstEntries, y, null);

    if (patternInput[0]) {
      this.rest.set(y, new List(patternInput[1], this.GetRest(y)));
    }

    this.firstEntries.set(y, z);
  }

  Clear_0() {
    this.firstEntries.clear();
    this.rest.clear();
  }

  get FirstEntries() {
    return this.firstEntries;
  }

  get Rest() {
    return this.rest;
  }

  Copy() {
    const res = new HashMultiMap(this.firstEntries.size, this.hasheq);

    for (let kvp of this.firstEntries) {
      res.FirstEntries.set(kvp[0], kvp[1]);
    }

    for (let kvp_1 of this.rest) {
      res.Rest.set(kvp_1[0], kvp_1[1]);
    }

    return res;
  }

  get_Item(y) {
    const patternInput = tryGetValue(this.firstEntries, y, null);

    if (patternInput[0]) {
      return patternInput[1];
    } else {
      throw new Error("The item was not found in collection");
    }
  }

  set_Item(y, z) {
    this.Replace(y, z);
  }

  FindAll(y) {
    const patternInput = tryGetValue(this.firstEntries, y, null);

    if (patternInput[0]) {
      return new List(patternInput[1], this.GetRest(y));
    } else {
      return new List();
    }
  }

  Fold(f, acc) {
    let res = acc;

    for (let kvp of this.firstEntries) {
      res = f(kvp[0], kvp[1], res);
      const matchValue = this.GetRest(kvp[0]);

      if (matchValue.tail == null) {} else {
        for (let z of matchValue) {
          res = f(kvp[0], z, res);
        }
      }
    }

    return res;
  }

  Iterate(f) {
    for (let kvp of this.firstEntries) {
      f(kvp[0], kvp[1]);
      const matchValue = this.GetRest(kvp[0]);

      if (matchValue.tail == null) {} else {
        for (let z of matchValue) {
          f(kvp[0], z);
        }
      }
    }
  }

  Contains_0(y) {
    return this.firstEntries.has(y);
  }

  ContainsKey(y) {
    return this.firstEntries.has(y);
  }

  Remove_0(y) {
    const patternInput = tryGetValue(this.firstEntries, y, null);

    if (patternInput[0]) {
      const patternInput_1 = tryGetValue(this.rest, y, null);

      if (patternInput_1[0]) {
        if (patternInput_1[1].tail != null) {
          if (patternInput_1[1].tail.tail == null) {
            this.firstEntries.set(y, patternInput_1[1].head);
            this.rest.delete(y);
          } else {
            this.firstEntries.set(y, patternInput_1[1].head);
            this.rest.set(y, patternInput_1[1].tail);
          }
        }
      } else {
        this.firstEntries.delete(y);
      }
    }
  }

  Replace(y, z) {
    this.firstEntries.set(y, z);
  }

  TryFind(y) {
    const patternInput = tryGetValue(this.firstEntries, y, null);

    if (patternInput[0]) {
      return makeSome(patternInput[1]);
    } else {
      return null;
    }
  }

  get Count_0() {
    return this.firstEntries.size;
  }

  GetEnumerator() {
    const elems = delay(() => collect(kvp => append(singleton(kvp), delay(() => map(z => [kvp[0], z], this.GetRest(kvp[0])))), this.firstEntries));
    return getEnumerator(elems);
  }

  Add(x) {
    this.set_Item(x[0], x[1]);
  }

  Clear() {
    this.Clear_0();
  }

  Remove(x) {
    const res = this.ContainsKey(x[0]);

    if (res ? equals(this.get_Item(x[0]), x[1]) : false) {
      this.Remove_0(x[0]);
    }

    return res;
  }

  Contains(x) {
    if (this.ContainsKey(x[0])) {
      return equals(this.get_Item(x[0]), x[1]);
    } else {
      return false;
    }
  }

  CopyTo(arr, arrIndex) {
    iterateIndexed((j, x) => {
      arr[arrIndex + j] = x;
    }, this);
  }

  get IsReadOnly() {
    return false;
  }

  get Count() {
    return this.Count_0;
  }

}
setType("Internal.Utilities.Collections.HashMultiMap", HashMultiMap);