import { filter, map as map_1, tryFind, create, tryGetValue } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives, makeGeneric, compareRecords, equalsRecords, Array as _Array, compareUnions, equals } from "../fable-core/Util";
import { FSharpErrorInfo } from "../symbols/SymbolHelpers";
import { FSharpImplementationFileContents } from "../symbols/Exprs";
import { FSharpProjectOptions } from "../service/service";
import { now } from "../fable-core/Date";
import { Path } from "../Fable.Core/Util";
import { choose, exists, filter as filter_1, map } from "../fable-core/Seq";
import { getValue } from "../fable-core/Option";
import Comparer from "../fable-core/Comparer";
import { getRootModuleFullName } from "./FSharp2Fable";
import { toText, printf, toFail, endsWith } from "../fable-core/String";
import { map as map_2 } from "../fable-core/Array";
import { union, create as create_1 } from "../fable-core/Set";
import { PluginInfo, CompilerOptions } from "../Fable.Core/Compiler";
import { ofArray, reverse } from "../fable-core/List";
import List from "../fable-core/List";

function Dictionary_2_GetOrAdd(key, valueFactory) {
  const matchValue = tryGetValue(this, key, null);

  if (matchValue[0]) {
    return matchValue[1];
  } else {
    const v = valueFactory(key);
    this.set(key, v);
    return v;
  }
}

export { Dictionary_2_GetOrAdd as Dictionary$60$2$2E$GetOrAdd };

function Dictionary_2_AddOrUpdate(key, valueFactory, updateFactory) {
  if (this.has(key)) {
    const v = updateFactory(key, this.get(key));
    this.set(key, v);
    return v;
  } else {
    const v_1 = valueFactory(key);
    this.set(key, v_1);
    return v_1;
  }
}

export { Dictionary_2_AddOrUpdate as Dictionary$60$2$2E$AddOrUpdate };
export class PathRef {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.State.PathRef",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["FilePath", "string"], ["NonFilePath", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Fable.State.PathRef", PathRef);
export class FileInfo {
  constructor(sentToClient, dependencies) {
    this.SentToClient = sentToClient;
    this.Dependencies = dependencies;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.State.FileInfo",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        SentToClient: "boolean",
        Dependencies: _Array("string")
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
setType("Fable.State.FileInfo", FileInfo);
export class Project {
  [_Symbol.reflection]() {
    return {
      type: "Fable.State.Project",
      interfaces: ["Fable.ICompilerState"],
      properties: {
        Errors: _Array(FSharpErrorInfo),
        FableCore: PathRef,
        ImplementationFiles: makeGeneric(_Map, {
          Key: "string",
          Value: FSharpImplementationFileContents
        }),
        IsWatchCompile: "boolean",
        ProjectFile: "string",
        ProjectOptions: FSharpProjectOptions,
        TimeStamp: Date
      }
    };
  }

  constructor(projectOptions, implFiles, errors, dependencies, fableCore, isWatchCompile) {
    this.projectOptions = projectOptions;
    this.implFiles = implFiles;
    this.errors = errors;
    this.fableCore = fableCore;
    this.isWatchCompile = isWatchCompile;
    this.timestamp = now();
    this.projectFile = Path.normalizePath(this.projectOptions.ProjectFileName);
    this.entities = new Map();
    this.inlineExprs = new Map();
    this.normalizedFiles = create(map(f => {
      const path = Path.normalizeFullPath(f);
      const matchValue = tryFind(path, dependencies);

      if (matchValue == null) {
        return [path, new FileInfo(false, [])];
      } else {
        return [path, new FileInfo(false, getValue(matchValue))];
      }
    }, this.projectOptions.SourceFiles), new Comparer(comparePrimitives));
    this.rootModules = map_1((_arg2, file) => getRootModuleFullName(file), filter((file_1, _arg1) => !endsWith(file_1, "fsi"), this.implFiles));
  }

  get TimeStamp() {
    return this.timestamp;
  }

  get FableCore() {
    return this.fableCore;
  }

  get IsWatchCompile() {
    return this.isWatchCompile;
  }

  get ImplementationFiles() {
    return this.implFiles;
  }

  get Errors() {
    return this.errors;
  }

  get ProjectOptions() {
    return this.projectOptions;
  }

  get ProjectFile_0() {
    return this.projectFile;
  }

  ContainsFile(sourceFile) {
    return this.normalizedFiles.has(sourceFile);
  }

  HasSent(sourceFile) {
    return this.normalizedFiles.get(sourceFile).SentToClient;
  }

  MarkSent(sourceFile) {
    const matchValue = tryFind(sourceFile, this.normalizedFiles);

    if (matchValue == null) {} else {
      getValue(matchValue).SentToClient = true;
    }
  }

  GetDependencies() {
    return map_1((_arg3, info) => info.Dependencies, this.normalizedFiles);
  }

  AddDependencies(sourceFile, dependencies) {
    const matchValue = tryFind(sourceFile, this.normalizedFiles);

    if (matchValue == null) {} else {
      getValue(matchValue).Dependencies = map_2(path => Path.normalizePath(path), dependencies, Array);
    }
  }

  GetFilesAndDependent(files) {
    const files_1 = create_1(files, new Comparer(comparePrimitives));
    const dependentFiles = create_1(map(kv => kv[0], filter_1(kv_1 => exists(arg00 => files_1.has(arg00), kv_1[1].Dependencies), this.normalizedFiles)), new Comparer(comparePrimitives));
    const filesAndDependent = union(files_1, dependentFiles);
    return Array.from(choose(kv_2 => filesAndDependent.has(kv_2[0]) ? kv_2[0] : null, this.normalizedFiles));
  }

  get ProjectFile() {
    return this.projectOptions.ProjectFileName;
  }

  GetRootModule(fileName) {
    const matchValue = tryFind(fileName, this.rootModules);

    if (matchValue == null) {
      return toFail(printf("Cannot find root module for %s"))(fileName);
    } else {
      return getValue(matchValue);
    }
  }

  GetOrAddEntity(fullName, generate) {
    return Dictionary_2_GetOrAdd.bind(this.entities)(fullName, _arg4 => generate());
  }

  GetOrAddInlineExpr(fullName, generate) {
    return Dictionary_2_GetOrAdd.bind(this.inlineExprs)(fullName, _arg5 => generate());
  }

}
setType("Fable.State.Project", Project);
export function getDefaultFableCore() {
  return "fable-core";
}
export function getDefaultOptions(replacements) {
  const replacements_1 = replacements == null ? create(null, new Comparer(comparePrimitives)) : create(getValue(replacements), new Comparer(comparePrimitives));
  return new CompilerOptions(getDefaultFableCore(), replacements_1, true, false, false);
}
export class Compiler {
  [_Symbol.reflection]() {
    return {
      type: "Fable.State.Compiler",
      interfaces: ["Fable.ICompiler"],
      properties: {
        Options: CompilerOptions,
        Plugins: makeGeneric(List, {
          T: PluginInfo
        })
      }
    };
  }

  constructor(options, replacements, plugins) {
    this.id = 0;

    if (options != null) {
      this["options@114"] = options;
    } else {
      this["options@114"] = getDefaultOptions(replacements);
    }

    if (plugins != null) {
      this["plugins@115"] = plugins;
    } else {
      this["plugins@115"] = new List();
    }

    this.logs = new Map();
  }

  ReadAllLogs() {
    return create(map(kv => [kv[0], reverse(kv[1])], this.logs), new Comparer(comparePrimitives));
  }

  get Options_0() {
    return this["options@114"];
  }

  get Plugins_0() {
    return this["plugins@115"];
  }

  get Options() {
    return this["options@114"];
  }

  get Plugins() {
    return this["plugins@115"];
  }

  AddLog(msg, severity, range, fileName, tag) {
    const tag_1 = tag != null ? tag : "FABLE";
    const severity_1 = severity.tag === 1 ? "error" : severity.tag === 2 ? "info" : "warning";
    const formattedMsg = fileName == null ? msg : range == null ? toText(printf("%s(1,1): %s %s: %s"))(getValue(fileName), severity_1, tag_1, msg) : toText(printf("%s(%i,%i): (%i,%i) %s %s: %s"))(getValue(fileName), getValue(range).start.line, getValue(range).start.column, getValue(range).end.line, getValue(range).end.column, severity_1, tag_1, msg);

    if (this.logs.has(severity_1)) {
      this.logs.set(severity_1, new List(formattedMsg, this.logs.get(severity_1)));
    } else {
      this.logs.set(severity_1, ofArray([formattedMsg]));
    }
  }

  GetUniqueVar() {
    this.id = this.id + 1 | 0;
    return "$var" + this.id.toString();
  }

}
setType("Fable.State.Compiler", Compiler);