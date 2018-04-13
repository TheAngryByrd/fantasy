import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { toString, compareRecords, equalsRecords, compareUnions, comparePrimitives, Option, Tuple, equals, Any, makeGeneric } from "../fable-core/Util";
import { choose as choose_1, map as map_1, append, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { LogicalOperator, BinaryOperator, UnaryOperator, RegexFlag, ExtendedNumberKind, NumberKind } from "./AST.Common";
import { toFail, join, printf, toText } from "../fable-core/String";
import { collect, empty, singleton, append as append_1, delay, toList, last, choose, tryLast, tryFind, exists, map } from "../fable-core/Seq";
import CurriedLambda from "../fable-core/CurriedLambda";
import Lazy from "../fable-core/Lazy";
import { SourceLocation } from "../Fable.Core/Util";
import { getValue, defaultArg } from "../fable-core/Option";
import { create } from "../fable-core/Set";
import _Set from "../fable-core/Set";
import Comparer from "../fable-core/Comparer";
import _Map from "../fable-core/Map";
export class Decorator {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.Decorator",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Decorator", "string", makeGeneric(List, {
        T: Any
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get FullName() {
    return this.data[0];
  }

  get Arguments() {
    return this.data[1];
  }

  get Name() {
    return this.FullName.substr(this.FullName.lastIndexOf(".") + 1);
  }

}
setType("Fable.AST.Fable.Decorator", Decorator);
export class Type {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.Type",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["MetaType"], ["Any"], ["Unit"], ["Boolean"], ["Char"], ["String"], ["Number", NumberKind], ["ExtendedNumber", ExtendedNumberKind], ["Option", Type], ["Array", Type], ["Tuple", makeGeneric(List, {
        T: Type
      })], ["Function", makeGeneric(List, {
        T: Type
      }), Type, "boolean"], ["GenericParam", "string"], ["Enum", "string"], ["DeclaredType", Entity, makeGeneric(List, {
        T: Type
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get FullName() {
    return this.tag === 6 ? toText(printf("%A"))(this) : this.tag === 13 ? this.data : this.tag === 9 ? this.data.FullName + "[]" : this.tag === 11 ? "(" + join(", ", map(x => x.FullName, this.data[0])) + ")=>" + this.data[1].FullName : this.tag === 14 ? this.data[0].FullName : toText(printf("%A"))(this);
  }

  get GenericArgs() {
    return this.tag === 9 ? ofArray([this.data]) : this.tag === 10 ? this.data : this.tag === 11 ? append(this.data[0], ofArray([this.data[1]])) : this.tag === 14 ? this.data[1] : new List();
  }

}
setType("Fable.AST.Fable.Type", Type);
export class NonDeclaredType {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.NonDeclaredType",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["NonDeclAny"], ["NonDeclUnit"], ["NonDeclOption", Expr], ["NonDeclArray", Expr], ["NonDeclTuple", makeGeneric(List, {
        T: Expr
      })], ["NonDeclFunction", makeGeneric(List, {
        T: Expr
      })], ["NonDeclGenericParam", "string"], ["NonDeclInterface", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Fable.AST.Fable.NonDeclaredType", NonDeclaredType);
export class EntityKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.EntityKind",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Module"], ["Union", makeGeneric(List, {
        T: Tuple(["string", makeGeneric(List, {
          T: Type
        })])
      })], ["Record", makeGeneric(List, {
        T: Tuple(["string", Type])
      })], ["Exception", makeGeneric(List, {
        T: Tuple(["string", Type])
      })], ["Class", Option(Tuple(["string", Expr])), makeGeneric(List, {
        T: Tuple(["string", Type])
      })], ["Interface"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Fable.AST.Fable.EntityKind", EntityKind);
export class Entity {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.Entity",
      properties: {
        Decorators: makeGeneric(List, {
          T: Decorator
        }),
        File: Option("string"),
        FullName: "string",
        GenericParameters: makeGeneric(List, {
          T: "string"
        }),
        Interfaces: makeGeneric(List, {
          T: "string"
        }),
        Kind: EntityKind,
        Members: makeGeneric(List, {
          T: Member
        }),
        Name: "string",
        Namespace: "string"
      }
    };
  }

  constructor(kind, file, fullName, members, genParams, interfaces, decorators) {
    this.kind = kind;
    this.file = file;
    this.fullName = fullName;
    this.members = members;

    if (genParams != null) {
      this["genParams@67"] = genParams;
    } else {
      this["genParams@67"] = new List();
    }

    if (decorators != null) {
      this["decorators@68"] = decorators;
    } else {
      this["decorators@68"] = new List();
    }

    if (interfaces != null) {
      this["interfaces@69"] = interfaces;
    } else {
      this["interfaces@69"] = new List();
    }
  }

  get Kind() {
    return this.kind.value;
  }

  get File() {
    return this.file;
  }

  get FullName() {
    return this.fullName;
  }

  get Members() {
    return this.members.value;
  }

  get GenericParameters() {
    return this["genParams@67"];
  }

  get Interfaces() {
    return this["interfaces@69"];
  }

  get Decorators() {
    return this["decorators@68"];
  }

  get Name() {
    return this.FullName.substr(this.FullName.lastIndexOf(".") + 1);
  }

  get Namespace() {
    const fullName = this.FullName;
    const matchValue = fullName.lastIndexOf(".") | 0;

    if (matchValue === -1) {
      return "";
    } else if (matchValue === 0) {
      return toFail(printf("Unexpected entity full name: %s"))(fullName);
    } else {
      return fullName.substr(0, matchValue);
    }
  }

  HasInterface(fullName) {
    return exists($var1 => equals(fullName, $var1), this["interfaces@69"]);
  }

  HasDecorator(name) {
    return exists(x => x.Name === name, this["decorators@68"]);
  }

  TryGetDecorator(name) {
    return tryFind(x => x.Name === name, this["decorators@68"]);
  }

  TryGetFullDecorator(fullname) {
    return tryFind(x => x.FullName === fullname, this["decorators@68"]);
  }

  TryGetMember(name, kind, loc, argTypes, argsEqual) {
    const argsEqual_1 = argsEqual != null ? argsEqual : CurriedLambda((x, y) => x.Equals(y));
    return tryFind(m => {
      if ((!m.Location.Equals(loc) ? true : m.Name !== name) ? true : !m.Kind.Equals(kind)) {
        return false;
      } else if (CurriedLambda(() => m.OverloadIndex == null)()) {
        return true;
      } else {
        const $var2 = argTypes.tail != null ? argTypes.head.tag === 2 ? argTypes.tail.tail == null ? [0] : [1, argTypes] : [1, argTypes] : [1, argTypes];

        switch ($var2[0]) {
          case 0:
            return m.ArgumentTypes.tail == null;

          case 1:
            return argsEqual_1(m.ArgumentTypes, $var2[1]);
        }
      }
    }, this.members.value);
  }

  static CreateRootModule(fileName) {
    return new Entity(new Lazy(function () {
      return new EntityKind(0);
    }), fileName, "", new Lazy(function () {
      return new List();
    }));
  }

  ToString() {
    return toText(printf("%s %A"))(this.Name, this.Kind);
  }

}
setType("Fable.AST.Fable.Entity", Entity);
export class Declaration {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.Declaration",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ActionDeclaration", Expr, Option(SourceLocation)], ["EntityDeclaration", Entity, "boolean", "string", makeGeneric(List, {
        T: Declaration
      }), Option(SourceLocation)], ["MemberDeclaration", Member, "boolean", Option("string"), makeGeneric(List, {
        T: Ident
      }), Expr, Option(SourceLocation)]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get Range() {
    return this.tag === 1 ? this.data[4] : this.tag === 2 ? this.data[5] : this.data[1];
  }

}
setType("Fable.AST.Fable.Declaration", Declaration);
export class MemberKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.MemberKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Constructor"], ["Method"], ["Getter"], ["Setter"], ["Field"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.Fable.MemberKind", MemberKind);
export class MemberLoc {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.MemberLoc",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["InstanceLoc"], ["StaticLoc"], ["InterfaceLoc", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Fable.AST.Fable.MemberLoc", MemberLoc);
export class Member {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.Member",
      properties: {
        ArgumentTypes: makeGeneric(List, {
          T: Type
        }),
        Computed: Option(Expr),
        Decorators: makeGeneric(List, {
          T: Decorator
        }),
        GenericParameters: makeGeneric(List, {
          T: "string"
        }),
        HasRestParams: "boolean",
        IsMutable: "boolean",
        Kind: MemberKind,
        Location: MemberLoc,
        Name: "string",
        OriginalCurriedType: Option(Type),
        OverloadIndex: Option("number"),
        OverloadName: "string",
        ReturnType: Type
      }
    };
  }

  constructor(name, kind, loc, argTypes, returnType, originalType, genParams, decorators, isMutable, computed, hasRestParams, overloadIndex) {
    this.name = name;
    this.kind = kind;
    this.loc = loc;
    this.argTypes = argTypes;
    this.returnType = returnType;
    this.originalType = originalType;
    this.genParams = genParams;
    this.decorators = decorators;
    this.isMutable = isMutable;
    this.computed = computed;
    this.hasRestParams = hasRestParams;
    this.overloadIndex = overloadIndex;
  }

  get Name() {
    return this.name;
  }

  get Kind() {
    return this.kind;
  }

  get Location() {
    return this.loc;
  }

  get ArgumentTypes() {
    return this.argTypes;
  }

  get ReturnType() {
    return this.returnType;
  }

  get OriginalCurriedType() {
    return this.originalType;
  }

  get GenericParameters() {
    return defaultArg(this.genParams, new List());
  }

  get Decorators() {
    return defaultArg(this.decorators, new List());
  }

  get IsMutable() {
    return defaultArg(this.isMutable, false);
  }

  get Computed() {
    return this.computed;
  }

  get HasRestParams() {
    return defaultArg(this.hasRestParams, false);
  }

  get OverloadIndex() {
    return this.overloadIndex;
  }

  get OverloadName() {
    return this.overloadIndex == null ? this.name : this.name + "_" + getValue(this.overloadIndex).toString();
  }

  HasDecorator(name) {
    return exists(x => x.Name === name, this.Decorators);
  }

  TryGetDecorator(name) {
    return tryFind(x => x.Name === name, this.Decorators);
  }

  TryGetFullDecorator(fullname) {
    return tryFind(x => x.FullName === fullname, this.Decorators);
  }

  ToString() {
    return toText(printf("%A %s"))(this.kind, this.name);
  }

}
setType("Fable.AST.Fable.Member", Member);
export class ExternalEntity {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.ExternalEntity",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ImportModule", "string", "string", "boolean"], ["GlobalModule", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get FullName() {
    const $var3 = this.tag === 1 ? [0, this.data] : [0, this.data[0]];

    switch ($var3[0]) {
      case 0:
        return $var3[1];
    }
  }

}
setType("Fable.AST.Fable.ExternalEntity", ExternalEntity);
export class File {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.File",
      properties: {
        Declarations: makeGeneric(List, {
          T: Declaration
        }),
        Dependencies: makeGeneric(_Set, {
          T: "string"
        }),
        Range: SourceLocation,
        Root: Entity,
        SourcePath: "string",
        UsedVarNames: makeGeneric(_Set, {
          T: "string"
        })
      }
    };
  }

  constructor(sourcePath, root, decls, usedVarNames, dependencies) {
    this.sourcePath = sourcePath;
    this.root = root;
    this.decls = decls;
    this.usedVarNames = usedVarNames;
    this.dependencies = dependencies;
  }

  get SourcePath() {
    return this.sourcePath;
  }

  get Root() {
    return this.root;
  }

  get Declarations() {
    return this.decls;
  }

  get UsedVarNames() {
    return defaultArg(this.usedVarNames, create(null, new Comparer(comparePrimitives)));
  }

  get Dependencies() {
    return defaultArg(this.dependencies, create(null, new Comparer(comparePrimitives)));
  }

  get Range() {
    return this.decls.tail == null ? SourceLocation.Empty : (_arg1 => _arg1 == null ? SourceLocation.Empty : SourceLocation.op_Addition(SourceLocation.Empty, getValue(_arg1)))(tryLast(choose(d => d.Range, this.decls)));
  }

}
setType("Fable.AST.Fable.File", File);
export class FileInfo {
  constructor(targetFile, rootModule) {
    this.targetFile = targetFile;
    this.rootModule = rootModule;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.FileInfo",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        targetFile: "string",
        rootModule: "string"
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
setType("Fable.AST.Fable.FileInfo", FileInfo);
export class FableMap {
  constructor(coreVersion, compilerVersion, files) {
    this.coreVersion = coreVersion;
    this.compilerVersion = compilerVersion;
    this.files = files;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.FableMap",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        coreVersion: "string",
        compilerVersion: "string",
        files: makeGeneric(_Map, {
          Key: "string",
          Value: FileInfo
        })
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
setType("Fable.AST.Fable.FableMap", FableMap);
export class ApplyInfo {
  constructor(ownerType, ownerFullName, methodName, methodKind, callee, args, returnType, range, fileName, decorators, calleeTypeArgs, methodTypeArgs, methodArgTypes, genericAvailability, caughtException) {
    this.ownerType = ownerType;
    this.ownerFullName = ownerFullName;
    this.methodName = methodName;
    this.methodKind = methodKind;
    this.callee = callee;
    this.args = args;
    this.returnType = returnType;
    this.range = range;
    this.fileName = fileName;
    this.decorators = decorators;
    this.calleeTypeArgs = calleeTypeArgs;
    this.methodTypeArgs = methodTypeArgs;
    this.methodArgTypes = methodArgTypes;
    this.genericAvailability = genericAvailability;
    this.caughtException = caughtException;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.ApplyInfo",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        ownerType: Type,
        ownerFullName: "string",
        methodName: "string",
        methodKind: MemberKind,
        callee: Option(Expr),
        args: makeGeneric(List, {
          T: Expr
        }),
        returnType: Type,
        range: Option(SourceLocation),
        fileName: "string",
        decorators: makeGeneric(List, {
          T: Decorator
        }),
        calleeTypeArgs: makeGeneric(List, {
          T: Type
        }),
        methodTypeArgs: makeGeneric(List, {
          T: Type
        }),
        methodArgTypes: makeGeneric(List, {
          T: Type
        }),
        genericAvailability: "boolean",
        caughtException: Option(Ident)
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Fable.AST.Fable.ApplyInfo", ApplyInfo);
export class ApplyKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.ApplyKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ApplyMeth"], ["ApplyGet"], ["ApplyCons"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.Fable.ApplyKind", ApplyKind);
export class ArrayConsKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.ArrayConsKind",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ArrayValues", makeGeneric(List, {
        T: Expr
      })], ["ArrayAlloc", Expr]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Fable.AST.Fable.ArrayConsKind", ArrayConsKind);
export class Ident {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.Ident",
      properties: {
        Name: "string",
        Type: Type
      }
    };
  }

  constructor(name, typ) {
    this.name = name;
    this.typ = typ;
  }

  get Name() {
    return this.name;
  }

  get Type() {
    return defaultArg(this.typ, new Type(1));
  }

  static getType(i) {
    return i.Type;
  }

  ToString() {
    return this.name;
  }

}
setType("Fable.AST.Fable.Ident", Ident);
export class LambdaInfo {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.LambdaInfo",
      properties: {
        CaptureThis: "boolean",
        IsDelegate: "boolean"
      }
    };
  }

  constructor(captureThis, isDelegate) {
    this.captureThis = captureThis;
    this.isDelegate = isDelegate;
  }

  get CaptureThis() {
    return this.captureThis;
  }

  get IsDelegate() {
    return defaultArg(this.isDelegate, false);
  }

}
setType("Fable.AST.Fable.LambdaInfo", LambdaInfo);
export class ImportKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.ImportKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["CoreLib"], ["Internal", "string"], ["CustomImport"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Fable.AST.Fable.ImportKind", ImportKind);
export class ValueKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.ValueKind",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Null"], ["This"], ["Super"], ["Spread", Expr], ["TypeRef", Entity, makeGeneric(List, {
        T: Tuple(["string", Expr])
      })], ["IdentValue", Ident], ["ImportRef", "string", "string", ImportKind], ["NumberConst", "number", NumberKind], ["StringConst", "string"], ["BoolConst", "boolean"], ["RegexConst", "string", makeGeneric(List, {
        T: RegexFlag
      })], ["ArrayConst", ArrayConsKind, Type], ["TupleConst", makeGeneric(List, {
        T: Expr
      })], ["UnaryOp", UnaryOperator], ["BinaryOp", BinaryOperator], ["LogicalOp", LogicalOperator], ["Lambda", makeGeneric(List, {
        T: Ident
      }), Expr, LambdaInfo], ["Emit", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get ImmediateSubExpressions() {
    const $var4 = this.tag === 1 ? [0] : this.tag === 2 ? [0] : this.tag === 5 ? [0] : this.tag === 6 ? [0] : this.tag === 7 ? [0] : this.tag === 8 ? [0] : this.tag === 9 ? [0] : this.tag === 10 ? [0] : this.tag === 13 ? [0] : this.tag === 14 ? [0] : this.tag === 15 ? [0] : this.tag === 17 ? [0] : this.tag === 3 ? [1] : this.tag === 4 ? [2] : this.tag === 11 ? [3] : this.tag === 12 ? [4] : this.tag === 16 ? [5] : [0];

    switch ($var4[0]) {
      case 0:
        return new List();

      case 1:
        return ofArray([this.data]);

      case 2:
        return map_1(tuple => tuple[1], this.data[1]);

      case 3:
        if (this.data[0].tag === 1) {
          return ofArray([this.data[0].data]);
        } else {
          return this.data[0].data;
        }

      case 4:
        return this.data;

      case 5:
        return ofArray([this.data[1]]);
    }
  }

  get Type() {
    const $var5 = this.tag === 3 ? [1] : this.tag === 5 ? [2] : this.tag === 1 ? [3] : this.tag === 2 ? [3] : this.tag === 6 ? [3] : this.tag === 17 ? [3] : this.tag === 7 ? [4] : this.tag === 8 ? [5] : this.tag === 4 ? [6] : this.tag === 10 ? [7] : this.tag === 9 ? [8] : this.tag === 11 ? [9] : this.tag === 12 ? [10] : this.tag === 13 ? [11] : this.tag === 14 ? [12] : this.tag === 15 ? [12] : this.tag === 16 ? [13] : [0];

    switch ($var5[0]) {
      case 0:
        return new Type(1);

      case 1:
        return this.data.Type;

      case 2:
        return this.data.Type;

      case 3:
        return new Type(1);

      case 4:
        return new Type(6, this.data[1]);

      case 5:
        return new Type(5);

      case 6:
        return new Type(0);

      case 7:
        return new Type(14, [new Entity(new Lazy(() => new EntityKind(4, [null, new List()])), null, "System.Text.RegularExpressions.Regex", new Lazy(() => new List())), new List()]);

      case 8:
        return new Type(3);

      case 9:
        return new Type(9, this.data[1]);

      case 10:
        return new Type(10, map_1(arg00 => Expr.getType(arg00), this.data));

      case 11:
        return new Type(11, [ofArray([new Type(1)]), new Type(1), true]);

      case 12:
        return new Type(11, [ofArray([new Type(1), new Type(1)]), new Type(1), true]);

      case 13:
        return new Type(11, [map_1(arg00_1 => Ident.getType(arg00_1), this.data[0]), this.data[1].Type, !this.data[2].IsDelegate]);
    }
  }

  get Range() {
    return this.tag === 16 ? this.data[1].Range : null;
  }

  get HasDoubleEvalRisk() {
    const $var6 = this.tag === 0 ? [0] : this.tag === 1 ? [0] : this.tag === 2 ? [0] : this.tag === 5 ? [0] : this.tag === 7 ? [0] : this.tag === 8 ? [0] : this.tag === 9 ? [0] : [1];

    switch ($var6[0]) {
      case 0:
        return false;

      case 1:
        return true;
    }
  }

}
setType("Fable.AST.Fable.ValueKind", ValueKind);
export class LoopKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.LoopKind",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["While", Expr, Expr], ["For", Ident, Expr, Expr, Expr, "boolean"], ["ForOf", Ident, Expr, Expr]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Fable.AST.Fable.LoopKind", LoopKind);
export class Expr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.Expr",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Value", ValueKind], ["ObjExpr", makeGeneric(List, {
        T: Tuple([Member, makeGeneric(List, {
          T: Ident
        }), Expr])
      }), makeGeneric(List, {
        T: "string"
      }), Option(Expr), Option(SourceLocation)], ["IfThenElse", Expr, Expr, Expr, Option(SourceLocation)], ["Apply", Expr, makeGeneric(List, {
        T: Expr
      }), ApplyKind, Type, Option(SourceLocation)], ["Quote", Expr], ["Throw", Expr, Type, Option(SourceLocation)], ["DebugBreak", Option(SourceLocation)], ["Loop", LoopKind, Option(SourceLocation)], ["VarDeclaration", Ident, Expr, "boolean", Option(SourceLocation)], ["Set", Expr, Option(Expr), Expr, Option(SourceLocation)], ["Sequential", makeGeneric(List, {
        T: Expr
      }), Option(SourceLocation)], ["TryCatch", Expr, Option(Tuple([Ident, Expr])), Option(Expr), Option(SourceLocation)], ["Switch", Expr, makeGeneric(List, {
        T: Tuple([makeGeneric(List, {
          T: Expr
        }), Expr])
      }), Option(Expr), Type, Option(SourceLocation)], ["Wrapped", Expr, Type]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  static getType(expr) {
    return expr.Type;
  }

  get IsJsStatement() {
    const $var7 = this.tag === 1 ? [0] : this.tag === 3 ? [0] : this.tag === 4 ? [0] : this.tag === 13 ? [1] : this.tag === 2 ? [2] : this.tag === 5 ? [3] : this.tag === 6 ? [3] : this.tag === 7 ? [3] : this.tag === 9 ? [3] : this.tag === 8 ? [3] : this.tag === 10 ? [3] : this.tag === 11 ? [3] : this.tag === 12 ? [3] : [0];

    switch ($var7[0]) {
      case 0:
        return false;

      case 1:
        return this.data[0].IsJsStatement;

      case 2:
        if (this.data[1].IsJsStatement) {
          return true;
        } else {
          return this.data[2].IsJsStatement;
        }

      case 3:
        return true;
    }
  }

  get Type() {
    const $var8 = this.tag === 1 ? [1] : this.tag === 13 ? [2, this.data[1]] : this.tag === 3 ? [2, this.data[3]] : this.tag === 5 ? [2, this.data[1]] : this.tag === 2 ? [3] : this.tag === 6 ? [4] : this.tag === 7 ? [4] : this.tag === 9 ? [4] : this.tag === 8 ? [4] : this.tag === 10 ? [5] : this.tag === 11 ? [6] : this.tag === 12 ? [7] : this.tag === 4 ? [8] : [0];

    switch ($var8[0]) {
      case 0:
        return this.data.Type;

      case 1:
        return new Type(1);

      case 2:
        return $var8[1];

      case 3:
        return this.data[1].Type;

      case 4:
        return new Type(2);

      case 5:
        if (this.data[0].tail == null) {
          return new Type(2);
        } else {
          return last(this.data[0]).Type;
        }

      case 6:
        return this.data[0].Type;

      case 7:
        return this.data[3];

      case 8:
        return new Type(1);
    }
  }

  get Range() {
    const $var9 = this.tag === 0 ? [2, this.data] : this.tag === 13 ? [3, this.data[0]] : this.tag === 4 ? [3, this.data] : this.tag === 8 ? [4, this.data[3]] : this.tag === 3 ? [4, this.data[4]] : this.tag === 2 ? [4, this.data[3]] : this.tag === 5 ? [4, this.data[2]] : this.tag === 6 ? [4, this.data] : this.tag === 7 ? [4, this.data[1]] : this.tag === 9 ? [4, this.data[3]] : this.tag === 10 ? [4, this.data[1]] : this.tag === 11 ? [4, this.data[3]] : this.tag === 12 ? [4, this.data[4]] : this.data[3] == null ? [1, this.data[0]] : [0, this.data[3]];

    switch ($var9[0]) {
      case 0:
        return $var9[1];

      case 1:
        const matchValue = choose_1(tupledArg => tupledArg[2].Range, $var9[1]);

        if (matchValue.tail != null) {
          if (matchValue.tail.tail == null) {
            return matchValue.head;
          } else {
            return SourceLocation.op_Addition(matchValue.head, last(matchValue.tail));
          }
        } else {
          return null;
        }

      case 2:
        return $var9[1].Range;

      case 3:
        return $var9[1].Range;

      case 4:
        return $var9[1];
    }
  }

  get ImmediateSubExpressions() {
    return this.tag === 1 ? append(map_1(tupledArg => tupledArg[2], this.data[0]), toList(defaultArg(this.data[2], [], $var10 => [$var10]))) : this.tag === 8 ? ofArray([this.data[1]]) : this.tag === 13 ? ofArray([this.data[0]]) : this.tag === 4 ? ofArray([this.data]) : this.tag === 5 ? ofArray([this.data[0]]) : this.tag === 3 ? new List(this.data[0], this.data[1]) : this.tag === 2 ? ofArray([this.data[0], this.data[1], this.data[2]]) : this.tag === 7 ? this.data[0].tag === 1 ? ofArray([this.data[0].data[1], this.data[0].data[2], this.data[0].data[3]]) : this.data[0].tag === 2 ? ofArray([this.data[0].data[1], this.data[0].data[2]]) : ofArray([this.data[0].data[0], this.data[0].data[1]]) : this.tag === 9 ? toList(delay(() => append_1(singleton(this.data[0]), delay(() => append_1(toList(defaultArg(this.data[1], [], $var11 => [$var11])), delay(() => singleton(this.data[2]))))))) : this.tag === 10 ? this.data[0] : this.tag === 11 ? toList(delay(() => append_1(singleton(this.data[0]), delay(() => {
      var _catch;

      return append_1(this.data[1] == null ? empty() : (_catch = getValue(this.data[1])[1], singleton(_catch)), delay(() => toList(defaultArg(this.data[2], [], $var12 => [$var12]))));
    })))) : this.tag === 12 ? toList(delay(() => append_1(singleton(this.data[0]), delay(() => append_1(collect(matchValue => append_1(matchValue[0], delay(() => singleton(matchValue[1]))), this.data[1]), delay(() => toList(defaultArg(this.data[2], [], $var13 => [$var13])))))))) : this.tag === 6 ? new List() : this.data.ImmediateSubExpressions;
  }

  get IsNull() {
    const $var14 = this.tag === 0 ? this.data.tag === 0 ? [0] : [1] : this.tag === 13 ? this.data[0].tag === 0 ? this.data[0].data.tag === 0 ? [0] : [1] : [1] : [1];

    switch ($var14[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

  ToString() {
    if (this.tag === 1) {
      return "{}";
    } else if (this.tag === 13) {
      return toText(printf("Wrapped (%O)"))(this.data[0]);
    } else if (this.tag === 3) {
      const args = join(", ", map_1(value => toString(value), this.data[1]));

      if (this.data[2].tag === 1) {
        return toText(printf("%O.%s"))(this.data[0], args);
      } else if (this.data[2].tag === 2) {
        return toText(printf("new %O(%s)"))(this.data[0], args);
      } else {
        return toText(printf("%O(%s)"))(this.data[0], args);
      }
    } else if (this.tag === 5) {
      return "Throw";
    } else if (this.tag === 2) {
      return toText(printf("IF %O THEN %O ELSE %O"))(this.data[0], this.data[1], this.data[2]);
    } else if (this.tag === 6) {
      return "Debugger";
    } else if (this.tag === 9) {
      const prop = this.data[1] == null ? "" : "." + toString(getValue(this.data[1]));
      return toText(printf("%O%s = %O"))(this.data[0], prop, this.data[2]);
    } else if (this.tag === 8) {
      return toText(printf("LET %s = %O"))(this.data[0].Name, this.data[1]);
    } else if (this.tag === 10) {
      return toText(printf("[%s]"))(join(", ", map_1(value_1 => toString(value_1), this.data[0])));
    } else if (this.tag === 7) {
      return "LOOP (TODO)";
    } else if (this.tag === 11) {
      return "TRY-CATCH (TODO)";
    } else if (this.tag === 12) {
      return "SWITCH (TODO)";
    } else if (this.tag === 4) {
      return "QUOTE (TODO)";
    } else {
      return "Value";
    }
  }

}
setType("Fable.AST.Fable.Expr", Expr);