import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { makeGeneric, GenericParam } from "../fable-core/Util";
import { ofArray, reverse, append as append_1 } from "../fable-core/List";
import List from "../fable-core/List";
import { tryFind as tryFind_1, forAll, foldBack as foldBack_1, filter as filter_1, exists as exists_1, map as map_1, iterate, getEnumerator, toList as toList_1, toIterator } from "../fable-core/Seq";
export class QueueList {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.QueueList",
      interfaces: ["System.Collections.Generic.IEnumerable"],
      properties: {
        Empty: makeGeneric(QueueList, {
          T: GenericParam("T")
        }),
        FirstElements: makeGeneric(List, {
          T: GenericParam("T")
        }),
        LastElements: makeGeneric(List, {
          T: GenericParam("T")
        })
      }
    };
  }

  [Symbol.iterator]() {
    return toIterator(this.GetEnumerator());
  }

  constructor(firstElementsIn, lastElementsRevIn, numLastElementsIn) {
    const numFirstElements = firstElementsIn.length | 0;
    this.push = numLastElementsIn > ~~(numFirstElements / 5);

    if (this.push) {
      this.firstElements = append_1(firstElementsIn, reverse(lastElementsRevIn));
    } else {
      this.firstElements = firstElementsIn;
    }

    if (this.push) {
      this.lastElementsRev = new List();
    } else {
      this.lastElementsRev = lastElementsRevIn;
    }

    if (this.push) {
      this.numLastElements = 0;
    } else {
      this.numLastElements = numLastElementsIn | 0;
    }
  }

  static [".cctor"]() {
    QueueList.empty = new QueueList(new List(), new List(), 0);
  }

  static get Empty() {
    return QueueList.empty;
  }

  static [".ctor"](xs) {
    return new QueueList(xs, new List(), 0);
  }

  ToList() {
    return this.push ? this.firstElements : append_1(this.firstElements, this.lastElements());
  }

  get FirstElements() {
    return this.firstElements;
  }

  get LastElements() {
    return this.lastElements();
  }

  AppendOne(y) {
    return new QueueList(this.firstElements, new List(y, this.lastElementsRev), this.numLastElements + 1);
  }

  Append(ys) {
    return new QueueList(this.firstElements, append_1(reverse(toList_1(ys)), this.lastElementsRev), this.numLastElements + 1);
  }

  GetEnumerator() {
    return getEnumerator(this.ToList());
  }

  lastElements() {
    return this.push ? new List() : reverse(this.lastElementsRev);
  }

}
setType("Internal.Utilities.QueueList", QueueList);
QueueList[".cctor"]();
export const QueueListModule = function (__exports) {
  const empty = __exports.empty = function () {
    return QueueList.Empty;
  };

  const ofSeq = __exports.ofSeq = function (x) {
    return QueueList[".ctor"](toList_1(x));
  };

  const iter = __exports.iter = function (f, x) {
    iterate(f, x);
  };

  const map = __exports.map = function (f, x) {
    return ofSeq(map_1(f, x));
  };

  const exists = __exports.exists = function (f, x) {
    return exists_1(f, x);
  };

  const filter = __exports.filter = function (f, x) {
    return ofSeq(filter_1(f, x));
  };

  const foldBack = __exports.foldBack = function (f, x, acc) {
    return foldBack_1(f, x.FirstElements, foldBack_1(f, x.LastElements, acc));
  };

  const forall = __exports.forall = function (f, x) {
    return forAll(f, x);
  };

  const ofList = __exports.ofList = function (x) {
    return QueueList[".ctor"](x);
  };

  const toList = __exports.toList = function (x) {
    return toList_1(x);
  };

  const tryFind = __exports.tryFind = function (f, x) {
    return tryFind_1(f, x);
  };

  const one = __exports.one = function (x) {
    return QueueList[".ctor"](ofArray([x]));
  };

  const appendOne = __exports.appendOne = function (x, y) {
    return x.AppendOne(y);
  };

  const append = __exports.append = function (x, ys) {
    return x.Append(ys);
  };

  return __exports;
}({});