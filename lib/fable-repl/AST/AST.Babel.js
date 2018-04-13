import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives, Array as _Array, Any, Interface, makeGeneric, extendInfo, Option } from "../fable-core/Util";
import { SourceLocation } from "../Fable.Core/Util";
import { ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { map, fold } from "../fable-core/Seq";
import { create } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import { defaultArg } from "../fable-core/Option";
import Comparer from "../fable-core/Comparer";

class _Node {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.Node",
      properties: {
        loc: Option(SourceLocation),
        type: "string"
      }
    };
  }

  constructor(type, loc) {
    this["type@14"] = type;
    this["loc@14"] = loc;
  }

  get type() {
    return this["type@14"];
  }

  get loc() {
    return this["loc@14"];
  }

}

export { _Node as Node };
setType("Fable.AST.Babel.Node", _Node);
export class Expression extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(Expression, {
      type: "Fable.AST.Babel.Expression",
      interfaces: [],
      properties: {}
    });
  }

  constructor(typ, loc) {
    super(typ, loc);
  }

}
setType("Fable.AST.Babel.Expression", Expression);
export class Literal extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(Literal, {
      type: "Fable.AST.Babel.Literal",
      interfaces: [],
      properties: {}
    });
  }

  constructor(typ, loc) {
    super(typ, loc);
  }

}
setType("Fable.AST.Babel.Literal", Literal);
export class Statement extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(Statement, {
      type: "Fable.AST.Babel.Statement",
      interfaces: [],
      properties: {}
    });
  }

  constructor(typ, loc) {
    super(typ, loc);
  }

}
setType("Fable.AST.Babel.Statement", Statement);
export class Declaration extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(Declaration, {
      type: "Fable.AST.Babel.Declaration",
      interfaces: [],
      properties: {}
    });
  }

  constructor(typ, loc) {
    super(typ, loc);
  }

}
setType("Fable.AST.Babel.Declaration", Declaration);
export class ModuleDeclaration extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(ModuleDeclaration, {
      type: "Fable.AST.Babel.ModuleDeclaration",
      interfaces: [],
      properties: {}
    });
  }

  constructor(typ, loc) {
    super(typ, loc);
  }

}
setType("Fable.AST.Babel.ModuleDeclaration", ModuleDeclaration);
export class TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.TypeAnnotationInfo",
      properties: {
        type: "string"
      }
    };
  }

  constructor(type) {
    this["type@55"] = type;
  }

  get type() {
    return this["type@55"];
  }

}
setType("Fable.AST.Babel.TypeAnnotationInfo", TypeAnnotationInfo);
export class TypeAnnotation {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.TypeAnnotation",
      properties: {
        type: "string",
        typeAnnotation: TypeAnnotationInfo
      }
    };
  }

  constructor(typeInfo) {
    this.typeInfo = typeInfo;
  }

  get type() {
    return "TypeAnnotation";
  }

  get typeAnnotation() {
    return this.typeInfo;
  }

}
setType("Fable.AST.Babel.TypeAnnotation", TypeAnnotation);
export class TypeParameter {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.TypeParameter",
      properties: {
        name: "string",
        type: "string"
      }
    };
  }

  constructor(name) {
    this["name@63"] = name;
  }

  get type() {
    return "TypeParameter";
  }

  get name() {
    return this["name@63"];
  }

}
setType("Fable.AST.Babel.TypeParameter", TypeParameter);
export class TypeParameterDeclaration {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.TypeParameterDeclaration",
      properties: {
        params: makeGeneric(List, {
          T: TypeParameter
        }),
        type: "string"
      }
    };
  }

  constructor(typeParams) {
    this.typeParams = typeParams;
  }

  get type() {
    return "TypeParameterDeclaration";
  }

  get params() {
    return this.typeParams;
  }

}
setType("Fable.AST.Babel.TypeParameterDeclaration", TypeParameterDeclaration);
export class TypeParameterInstantiation {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.TypeParameterInstantiation",
      properties: {
        params: makeGeneric(List, {
          T: TypeAnnotationInfo
        }),
        type: "string"
      }
    };
  }

  constructor(typeParams) {
    this.typeParams = typeParams;
  }

  get type() {
    return "TypeParameterInstantiation";
  }

  get params() {
    return this.typeParams;
  }

}
setType("Fable.AST.Babel.TypeParameterInstantiation", TypeParameterInstantiation);
export class EmptyExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(EmptyExpression, {
      type: "Fable.AST.Babel.EmptyExpression",
      interfaces: [],
      properties: {}
    });
  }

  constructor() {
    super("EmptyExpression", null);
  }

}
setType("Fable.AST.Babel.EmptyExpression", EmptyExpression);
export class MacroExpression extends Literal {
  [_Symbol.reflection]() {
    return extendInfo(MacroExpression, {
      type: "Fable.AST.Babel.MacroExpression",
      interfaces: [],
      properties: {
        args: makeGeneric(List, {
          T: _Node
        }),
        macro: "boolean",
        value: "string"
      }
    });
  }

  constructor(value, args, loc) {
    super("StringLiteral", loc);
    this["value@82"] = value;
    this["args@82"] = args;
  }

  get value() {
    return this["value@82"];
  }

  get args() {
    return this["args@82"];
  }

  get macro() {
    return true;
  }

}
setType("Fable.AST.Babel.MacroExpression", MacroExpression);
export class TemplateElement extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(TemplateElement, {
      type: "Fable.AST.Babel.TemplateElement",
      interfaces: [],
      properties: {
        tail: "boolean",
        value: Interface("System.Collections.Generic.IDictionary")
      }
    });
  }

  constructor(value, tail, loc) {
    super("TemplateElement", loc);
    this["value@89"] = value;
    this["tail@89"] = tail;
  }

  get tail() {
    return this["tail@89"];
  }

  get value() {
    return new Map(ofArray([["raw", this["value@89"]], ["cooked", this["value@89"]]]));
  }

}
setType("Fable.AST.Babel.TemplateElement", TemplateElement);
export class TemplateLiteral extends Literal {
  [_Symbol.reflection]() {
    return extendInfo(TemplateLiteral, {
      type: "Fable.AST.Babel.TemplateLiteral",
      interfaces: [],
      properties: {
        expressions: makeGeneric(List, {
          T: Expression
        }),
        quasis: makeGeneric(List, {
          T: TemplateElement
        })
      }
    });
  }

  constructor(quasis, expressions, loc) {
    super("TemplateLiteral", loc);
    this["quasis@94"] = quasis;
    this["expressions@94"] = expressions;
  }

  get quasis() {
    return this["quasis@94"];
  }

  get expressions() {
    return this["expressions@94"];
  }

}
setType("Fable.AST.Babel.TemplateLiteral", TemplateLiteral);
export class TaggedTemplateExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(TaggedTemplateExpression, {
      type: "Fable.AST.Babel.TaggedTemplateExpression",
      interfaces: [],
      properties: {
        quasi: TemplateLiteral,
        tag: Expression
      }
    });
  }

  constructor(tag, quasi, loc) {
    super("TaggedTemplateExpression", loc);
    this["tag@99"] = tag;
    this["quasi@99"] = quasi;
  }

  get tag() {
    return this["tag@99"];
  }

  get quasi() {
    return this["quasi@99"];
  }

}
setType("Fable.AST.Babel.TaggedTemplateExpression", TaggedTemplateExpression);
export class Identifier extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(Identifier, {
      type: "Fable.AST.Babel.Identifier",
      interfaces: ["Fable.AST.Babel.Pattern"],
      properties: {
        name: "string",
        typeAnnotation: Option(TypeAnnotation)
      }
    });
  }

  constructor(name, typeAnnotation, loc) {
    super("Identifier", loc);
    this["name@106"] = name;
    this["typeAnnotation@106"] = typeAnnotation;
  }

  get name() {
    return this["name@106"];
  }

  get typeAnnotation() {
    return this["typeAnnotation@106"];
  }

  ToString() {
    return this.name;
  }

}
setType("Fable.AST.Babel.Identifier", Identifier);
export class RegExpLiteral extends Literal {
  [_Symbol.reflection]() {
    return extendInfo(RegExpLiteral, {
      type: "Fable.AST.Babel.RegExpLiteral",
      interfaces: [],
      properties: {
        flags: "string",
        pattern: "string"
      }
    });
  }

  constructor(pattern, flags, loc) {
    super("RegExpLiteral", loc);
    this["pattern@114"] = pattern;
    this["flags@114"] = flags;
  }

  get pattern() {
    return this["pattern@114"];
  }

  get flags() {
    return fold((x, y) => x + y, "", map(_arg1 => _arg1.tag === 1 ? "i" : _arg1.tag === 2 ? "m" : _arg1.tag === 3 ? "y" : "g", this["flags@114"]));
  }

}
setType("Fable.AST.Babel.RegExpLiteral", RegExpLiteral);
export class NullLiteral extends Literal {
  [_Symbol.reflection]() {
    return extendInfo(NullLiteral, {
      type: "Fable.AST.Babel.NullLiteral",
      interfaces: [],
      properties: {}
    });
  }

  constructor(loc) {
    super("NullLiteral", loc);
  }

}
setType("Fable.AST.Babel.NullLiteral", NullLiteral);
export class StringLiteral extends Literal {
  [_Symbol.reflection]() {
    return extendInfo(StringLiteral, {
      type: "Fable.AST.Babel.StringLiteral",
      interfaces: [],
      properties: {
        value: "string"
      }
    });
  }

  constructor(value, loc) {
    super("StringLiteral", loc);
    this["value@127"] = value;
  }

  get value() {
    return this["value@127"];
  }

}
setType("Fable.AST.Babel.StringLiteral", StringLiteral);
export class BooleanLiteral extends Literal {
  [_Symbol.reflection]() {
    return extendInfo(BooleanLiteral, {
      type: "Fable.AST.Babel.BooleanLiteral",
      interfaces: [],
      properties: {
        value: "boolean"
      }
    });
  }

  constructor(value, loc) {
    super("BooleanLiteral", loc);
    this["value@131"] = value;
  }

  get value() {
    return this["value@131"];
  }

}
setType("Fable.AST.Babel.BooleanLiteral", BooleanLiteral);
export class NumericLiteral extends Literal {
  [_Symbol.reflection]() {
    return extendInfo(NumericLiteral, {
      type: "Fable.AST.Babel.NumericLiteral",
      interfaces: [],
      properties: {
        value: "number"
      }
    });
  }

  constructor(value, loc) {
    super("NumericLiteral", loc);
    this["value@135"] = value;
  }

  get value() {
    return this["value@135"];
  }

}
setType("Fable.AST.Babel.NumericLiteral", NumericLiteral);
export class Decorator extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(Decorator, {
      type: "Fable.AST.Babel.Decorator",
      interfaces: [],
      properties: {
        value: Any
      }
    });
  }

  constructor(value, loc) {
    super("Decorator", loc);
    this["value@140"] = value;
  }

  get value() {
    return this["value@140"];
  }

}
setType("Fable.AST.Babel.Decorator", Decorator);
export class DirectiveLiteral extends Literal {
  [_Symbol.reflection]() {
    return extendInfo(DirectiveLiteral, {
      type: "Fable.AST.Babel.DirectiveLiteral",
      interfaces: [],
      properties: {
        value: "string"
      }
    });
  }

  constructor(value, loc) {
    super("DirectiveLiteral", loc);
    this["value@144"] = value;
  }

  get value() {
    return this["value@144"];
  }

}
setType("Fable.AST.Babel.DirectiveLiteral", DirectiveLiteral);
export class Directive extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(Directive, {
      type: "Fable.AST.Babel.Directive",
      interfaces: [],
      properties: {
        value: DirectiveLiteral
      }
    });
  }

  constructor(value, loc) {
    super("Directive", loc);
    this["value@149"] = value;
  }

  static [".ctor"](str, loc) {
    return new Directive(new DirectiveLiteral(str), loc);
  }

  get value() {
    return this["value@149"];
  }

}
setType("Fable.AST.Babel.Directive", Directive);
export class Program extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(Program, {
      type: "Fable.AST.Babel.Program",
      interfaces: [],
      properties: {
        body: makeGeneric(List, {
          T: Any
        }),
        dependencies: _Array("string"),
        directives: makeGeneric(List, {
          T: Directive
        }),
        fileName: "string",
        logs: makeGeneric(_Map, {
          Key: "string",
          Value: makeGeneric(List, {
            T: "string"
          })
        }),
        sourceFiles: _Array("string"),
        sourceType: "string"
      }
    });
  }

  constructor(fileName, loc, body, directives, logs, dependencies, sourceFiles) {
    super("Program", loc);
    this["fileName@159"] = fileName;
    this["body@159"] = body;
    this["directives@159"] = directives;
    this["logs@159"] = logs;
    this["dependencies@159"] = dependencies;
    this["sourceFiles@159"] = sourceFiles;
  }

  get sourceType() {
    return "module";
  }

  get body() {
    return this["body@159"];
  }

  get directives() {
    return defaultArg(this["directives@159"], new List());
  }

  get fileName() {
    return this["fileName@159"];
  }

  get logs() {
    return defaultArg(this["logs@159"], create(null, new Comparer(comparePrimitives)));
  }

  get dependencies() {
    return defaultArg(this["dependencies@159"], []);
  }

  get sourceFiles() {
    return defaultArg(this["sourceFiles@159"], []);
  }

}
setType("Fable.AST.Babel.Program", Program);
export class ExpressionStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(ExpressionStatement, {
      type: "Fable.AST.Babel.ExpressionStatement",
      interfaces: [],
      properties: {
        expression: Expression
      }
    });
  }

  constructor(expression, loc) {
    super("ExpressionStatement", loc);
    this["expression@173"] = expression;
  }

  get expression() {
    return this["expression@173"];
  }

}
setType("Fable.AST.Babel.ExpressionStatement", ExpressionStatement);
export class BlockStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(BlockStatement, {
      type: "Fable.AST.Babel.BlockStatement",
      interfaces: [],
      properties: {
        body: makeGeneric(List, {
          T: Statement
        }),
        directives: makeGeneric(List, {
          T: Directive
        })
      }
    });
  }

  constructor(body, directives, loc) {
    super("BlockStatement", loc);
    this["body@178"] = body;
    this["directives@178"] = directives;
  }

  get body() {
    return this["body@178"];
  }

  get directives() {
    return defaultArg(this["directives@178"], new List());
  }

}
setType("Fable.AST.Babel.BlockStatement", BlockStatement);
export class EmptyStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(EmptyStatement, {
      type: "Fable.AST.Babel.EmptyStatement",
      interfaces: [],
      properties: {}
    });
  }

  constructor(loc) {
    super("EmptyStatement", loc);
  }

}
setType("Fable.AST.Babel.EmptyStatement", EmptyStatement);
export class DebuggerStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(DebuggerStatement, {
      type: "Fable.AST.Babel.DebuggerStatement",
      interfaces: [],
      properties: {}
    });
  }

  constructor(loc) {
    super("DebuggerStatement", loc);
  }

}
setType("Fable.AST.Babel.DebuggerStatement", DebuggerStatement);
export class LabeledStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(LabeledStatement, {
      type: "Fable.AST.Babel.LabeledStatement",
      interfaces: [],
      properties: {
        body: Statement,
        label: Identifier
      }
    });
  }

  constructor(label, body, loc) {
    super("LabeledStatement", loc);
    this["label@191"] = label;
    this["body@191"] = body;
  }

  get body() {
    return this["body@191"];
  }

  get label() {
    return this["label@191"];
  }

}
setType("Fable.AST.Babel.LabeledStatement", LabeledStatement);
export class BreakStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(BreakStatement, {
      type: "Fable.AST.Babel.BreakStatement",
      interfaces: [],
      properties: {
        label: Option(Identifier)
      }
    });
  }

  constructor(label, loc) {
    super("BreakStatement", loc);
    this["label@197"] = label;
  }

  get label() {
    return this["label@197"];
  }

}
setType("Fable.AST.Babel.BreakStatement", BreakStatement);
export class ContinueStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(ContinueStatement, {
      type: "Fable.AST.Babel.ContinueStatement",
      interfaces: [],
      properties: {
        label: Option(Identifier)
      }
    });
  }

  constructor(label, loc) {
    super("ContinueStatement", loc);
    this["label@202"] = label;
  }

  get label() {
    return this["label@202"];
  }

}
setType("Fable.AST.Babel.ContinueStatement", ContinueStatement);
export class ReturnStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(ReturnStatement, {
      type: "Fable.AST.Babel.ReturnStatement",
      interfaces: [],
      properties: {
        argument: Expression
      }
    });
  }

  constructor(argument, loc) {
    super("ReturnStatement", loc);
    this["argument@209"] = argument;
  }

  get argument() {
    return this["argument@209"];
  }

}
setType("Fable.AST.Babel.ReturnStatement", ReturnStatement);
export class IfStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(IfStatement, {
      type: "Fable.AST.Babel.IfStatement",
      interfaces: [],
      properties: {
        alternate: Option(Statement),
        consequent: Statement,
        test: Expression
      }
    });
  }

  constructor(test, consequent, alternate, loc) {
    super("IfStatement", loc);
    this["test@218"] = test;
    this["consequent@218"] = consequent;
    this["alternate@218"] = alternate;
  }

  get test() {
    return this["test@218"];
  }

  get consequent() {
    return this["consequent@218"];
  }

  get alternate() {
    return this["alternate@218"];
  }

}
setType("Fable.AST.Babel.IfStatement", IfStatement);
export class SwitchCase extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(SwitchCase, {
      type: "Fable.AST.Babel.SwitchCase",
      interfaces: [],
      properties: {
        consequent: makeGeneric(List, {
          T: Statement
        }),
        test: Option(Expression)
      }
    });
  }

  constructor(consequent, test, loc) {
    super("SwitchCase", loc);
    this["consequent@225"] = consequent;
    this["test@225"] = test;
  }

  get test() {
    return this["test@225"];
  }

  get consequent() {
    return this["consequent@225"];
  }

}
setType("Fable.AST.Babel.SwitchCase", SwitchCase);
export class SwitchStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(SwitchStatement, {
      type: "Fable.AST.Babel.SwitchStatement",
      interfaces: [],
      properties: {
        cases: makeGeneric(List, {
          T: SwitchCase
        }),
        discriminant: Expression
      }
    });
  }

  constructor(discriminant, cases, loc) {
    super("SwitchStatement", loc);
    this["discriminant@230"] = discriminant;
    this["cases@230"] = cases;
  }

  get discriminant() {
    return this["discriminant@230"];
  }

  get cases() {
    return this["cases@230"];
  }

}
setType("Fable.AST.Babel.SwitchStatement", SwitchStatement);
export class ThrowStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(ThrowStatement, {
      type: "Fable.AST.Babel.ThrowStatement",
      interfaces: [],
      properties: {
        argument: Expression
      }
    });
  }

  constructor(argument, loc) {
    super("ThrowStatement", loc);
    this["argument@236"] = argument;
  }

  get argument() {
    return this["argument@236"];
  }

}
setType("Fable.AST.Babel.ThrowStatement", ThrowStatement);
export class CatchClause extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(CatchClause, {
      type: "Fable.AST.Babel.CatchClause",
      interfaces: [],
      properties: {
        body: BlockStatement,
        param: Interface("Fable.AST.Babel.Pattern")
      }
    });
  }

  constructor(param, body, loc) {
    super("CatchClause", loc);
    this["param@241"] = param;
    this["body@241"] = body;
  }

  get param() {
    return this["param@241"];
  }

  get body() {
    return this["body@241"];
  }

}
setType("Fable.AST.Babel.CatchClause", CatchClause);
export class TryStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(TryStatement, {
      type: "Fable.AST.Babel.TryStatement",
      interfaces: [],
      properties: {
        block: BlockStatement,
        finalizer: Option(BlockStatement),
        handler: Option(CatchClause)
      }
    });
  }

  constructor(block, handler, finalizer, loc) {
    super("TryStatement", loc);
    this["block@247"] = block;
    this["handler@247"] = handler;
    this["finalizer@247"] = finalizer;
  }

  get block() {
    return this["block@247"];
  }

  get handler() {
    return this["handler@247"];
  }

  get finalizer() {
    return this["finalizer@247"];
  }

}
setType("Fable.AST.Babel.TryStatement", TryStatement);
export class VariableDeclarator extends Declaration {
  [_Symbol.reflection]() {
    return extendInfo(VariableDeclarator, {
      type: "Fable.AST.Babel.VariableDeclarator",
      interfaces: [],
      properties: {
        id: Interface("Fable.AST.Babel.Pattern"),
        init: Option(Expression)
      }
    });
  }

  constructor(id, init, loc) {
    super("VariableDeclarator", loc);
    this["id@254"] = id;
    this["init@254"] = init;
  }

  get id() {
    return this["id@254"];
  }

  get init() {
    return this["init@254"];
  }

}
setType("Fable.AST.Babel.VariableDeclarator", VariableDeclarator);
export class VariableDeclarationKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.VariableDeclarationKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Var"], ["Let"], ["Const"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.Babel.VariableDeclarationKind", VariableDeclarationKind);
export class VariableDeclaration extends Declaration {
  [_Symbol.reflection]() {
    return extendInfo(VariableDeclaration, {
      type: "Fable.AST.Babel.VariableDeclaration",
      interfaces: [],
      properties: {
        declarations: makeGeneric(List, {
          T: VariableDeclarator
        }),
        kind: "string"
      }
    });
  }

  constructor(kind, declarations, loc) {
    super("VariableDeclaration", loc);
    this["kind@261"] = kind;
    this["declarations@261"] = declarations;
  }

  static [".ctor"](_var, init, kind, loc) {
    return new VariableDeclaration(kind != null ? kind : new VariableDeclarationKind(1), ofArray([new VariableDeclarator(_var, init, loc)]), loc);
  }

  get declarations() {
    return this["declarations@261"];
  }

  get kind() {
    return this["kind@261"].tag === 1 ? "let" : this["kind@261"].tag === 2 ? "const" : "var";
  }

}
setType("Fable.AST.Babel.VariableDeclaration", VariableDeclaration);
export class WhileStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(WhileStatement, {
      type: "Fable.AST.Babel.WhileStatement",
      interfaces: [],
      properties: {
        body: BlockStatement,
        test: Expression
      }
    });
  }

  constructor(test, body, loc) {
    super("WhileStatement", loc);
    this["test@270"] = test;
    this["body@270"] = body;
  }

  get test() {
    return this["test@270"];
  }

  get body() {
    return this["body@270"];
  }

}
setType("Fable.AST.Babel.WhileStatement", WhileStatement);
export class DoWhileStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(DoWhileStatement, {
      type: "Fable.AST.Babel.DoWhileStatement",
      interfaces: [],
      properties: {
        body: BlockStatement,
        test: Expression
      }
    });
  }

  constructor(body, test, loc) {
    super("DoWhileStatement", loc);
    this["body@275"] = body;
    this["test@275"] = test;
  }

  get body() {
    return this["body@275"];
  }

  get test() {
    return this["test@275"];
  }

}
setType("Fable.AST.Babel.DoWhileStatement", DoWhileStatement);
export class ForStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(ForStatement, {
      type: "Fable.AST.Babel.ForStatement",
      interfaces: [],
      properties: {
        body: BlockStatement,
        init: Option(Any),
        test: Option(Expression),
        update: Option(Expression)
      }
    });
  }

  constructor(body, init, test, update, loc) {
    super("ForStatement", loc);
    this["body@280"] = body;
    this["init@280"] = init;
    this["test@280"] = test;
    this["update@280"] = update;
  }

  get body() {
    return this["body@280"];
  }

  get init() {
    return this["init@280"];
  }

  get test() {
    return this["test@280"];
  }

  get update() {
    return this["update@280"];
  }

}
setType("Fable.AST.Babel.ForStatement", ForStatement);
export class ForInStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(ForInStatement, {
      type: "Fable.AST.Babel.ForInStatement",
      interfaces: [],
      properties: {
        body: BlockStatement,
        left: Any,
        right: Expression
      }
    });
  }

  constructor(left, right, body, loc) {
    super("ForInStatement", loc);
    this["left@289"] = left;
    this["right@289"] = right;
    this["body@289"] = body;
  }

  get body() {
    return this["body@289"];
  }

  get left() {
    return this["left@289"];
  }

  get right() {
    return this["right@289"];
  }

}
setType("Fable.AST.Babel.ForInStatement", ForInStatement);
export class ForOfStatement extends Statement {
  [_Symbol.reflection]() {
    return extendInfo(ForOfStatement, {
      type: "Fable.AST.Babel.ForOfStatement",
      interfaces: [],
      properties: {
        body: BlockStatement,
        left: Any,
        right: Expression
      }
    });
  }

  constructor(left, right, body, loc) {
    super("ForOfStatement", loc);
    this["left@297"] = left;
    this["right@297"] = right;
    this["body@297"] = body;
  }

  get body() {
    return this["body@297"];
  }

  get left() {
    return this["left@297"];
  }

  get right() {
    return this["right@297"];
  }

}
setType("Fable.AST.Babel.ForOfStatement", ForOfStatement);
export class FunctionDeclaration extends Declaration {
  [_Symbol.reflection]() {
    return extendInfo(FunctionDeclaration, {
      type: "Fable.AST.Babel.FunctionDeclaration",
      interfaces: [],
      properties: {
        async: "boolean",
        body: BlockStatement,
        generator: "boolean",
        id: Identifier,
        params: makeGeneric(List, {
          T: Interface("Fable.AST.Babel.Pattern")
        }),
        returnType: Option(TypeAnnotation),
        typeParameters: Option(TypeParameterDeclaration)
      }
    });
  }

  constructor(id, params, body, generator, async, returnType, typeParams, loc) {
    super("FunctionDeclaration", loc);
    this["id@304"] = id;
    this["params@304"] = params;
    this["body@304"] = body;
    this["generator@304"] = generator;
    this["async@304"] = async;
    this["returnType@305"] = returnType;
    this.typeParams = typeParams;
  }

  get id() {
    return this["id@304"];
  }

  get params() {
    return this["params@304"];
  }

  get body() {
    return this["body@304"];
  }

  get generator() {
    return defaultArg(this["generator@304"], false);
  }

  get async() {
    return defaultArg(this["async@304"], false);
  }

  get typeParameters() {
    return this.typeParams;
  }

  get returnType() {
    return this["returnType@305"];
  }

}
setType("Fable.AST.Babel.FunctionDeclaration", FunctionDeclaration);
export class Super extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(Super, {
      type: "Fable.AST.Babel.Super",
      interfaces: [],
      properties: {}
    });
  }

  constructor(loc) {
    super("Super", loc);
  }

}
setType("Fable.AST.Babel.Super", Super);
export class ThisExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(ThisExpression, {
      type: "Fable.AST.Babel.ThisExpression",
      interfaces: [],
      properties: {}
    });
  }

  constructor(loc) {
    super("ThisExpression", loc);
  }

}
setType("Fable.AST.Babel.ThisExpression", ThisExpression);
export class ArrowFunctionExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(ArrowFunctionExpression, {
      type: "Fable.AST.Babel.ArrowFunctionExpression",
      interfaces: [],
      properties: {
        async: "boolean",
        body: Any,
        expression: "boolean",
        params: makeGeneric(List, {
          T: Interface("Fable.AST.Babel.Pattern")
        })
      }
    });
  }

  constructor(params, body, async, loc) {
    super("ArrowFunctionExpression", loc);
    this["params@325"] = params;
    this["body@325"] = body;
    this["async@325"] = async;
  }

  get expression() {
    return this["body@325"] instanceof Expression ? true : false;
  }

  get params() {
    return this["params@325"];
  }

  get body() {
    return this["body@325"];
  }

  get async() {
    return defaultArg(this["async@325"], false);
  }

}
setType("Fable.AST.Babel.ArrowFunctionExpression", ArrowFunctionExpression);
export class FunctionExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(FunctionExpression, {
      type: "Fable.AST.Babel.FunctionExpression",
      interfaces: [],
      properties: {
        async: "boolean",
        body: BlockStatement,
        generator: "boolean",
        id: Option(Identifier),
        params: makeGeneric(List, {
          T: Interface("Fable.AST.Babel.Pattern")
        }),
        returnType: Option(TypeAnnotation),
        typeParameters: Option(TypeParameterDeclaration)
      }
    });
  }

  constructor(params, body, generator, async, id, returnType, typeParams, loc) {
    super("FunctionExpression", loc);
    this["params@333"] = params;
    this["body@333"] = body;
    this["generator@333"] = generator;
    this["async@333"] = async;
    this["id@334"] = id;
    this["returnType@334"] = returnType;
    this.typeParams = typeParams;
  }

  get id() {
    return this["id@334"];
  }

  get params() {
    return this["params@333"];
  }

  get body() {
    return this["body@333"];
  }

  get generator() {
    return defaultArg(this["generator@333"], false);
  }

  get async() {
    return defaultArg(this["async@333"], false);
  }

  get typeParameters() {
    return this.typeParams;
  }

  get returnType() {
    return this["returnType@334"];
  }

}
setType("Fable.AST.Babel.FunctionExpression", FunctionExpression);
export class DoExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(DoExpression, {
      type: "Fable.AST.Babel.DoExpression",
      interfaces: [],
      properties: {
        body: BlockStatement
      }
    });
  }

  constructor(body, loc) {
    super("DoExpression", loc);
    this["body@347"] = body;
  }

  get body() {
    return this["body@347"];
  }

}
setType("Fable.AST.Babel.DoExpression", DoExpression);
export class YieldExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(YieldExpression, {
      type: "Fable.AST.Babel.YieldExpression",
      interfaces: [],
      properties: {
        argument: Option(Expression),
        delegate: "boolean"
      }
    });
  }

  constructor(argument, delegate, loc) {
    super("YieldExpression", loc);
    this["argument@351"] = argument;
    this["delegate@351"] = delegate;
  }

  get argument() {
    return this["argument@351"];
  }

  get delegate() {
    return this["delegate@351"];
  }

}
setType("Fable.AST.Babel.YieldExpression", YieldExpression);
export class AwaitExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(AwaitExpression, {
      type: "Fable.AST.Babel.AwaitExpression",
      interfaces: [],
      properties: {
        argument: Option(Expression)
      }
    });
  }

  constructor(argument, loc) {
    super("AwaitExpression", loc);
    this["argument@357"] = argument;
  }

  get argument() {
    return this["argument@357"];
  }

}
setType("Fable.AST.Babel.AwaitExpression", AwaitExpression);
export class RestProperty extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(RestProperty, {
      type: "Fable.AST.Babel.RestProperty",
      interfaces: [],
      properties: {
        argument: Expression
      }
    });
  }

  constructor(argument, loc) {
    super("RestProperty", loc);
    this["argument@361"] = argument;
  }

  get argument() {
    return this["argument@361"];
  }

}
setType("Fable.AST.Babel.RestProperty", RestProperty);
export class SpreadProperty extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(SpreadProperty, {
      type: "Fable.AST.Babel.SpreadProperty",
      interfaces: [],
      properties: {
        argument: Expression
      }
    });
  }

  constructor(argument, loc) {
    super("SpreadProperty", loc);
    this["argument@366"] = argument;
  }

  get argument() {
    return this["argument@366"];
  }

}
setType("Fable.AST.Babel.SpreadProperty", SpreadProperty);
export class SpreadElement extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(SpreadElement, {
      type: "Fable.AST.Babel.SpreadElement",
      interfaces: [],
      properties: {
        argument: Expression
      }
    });
  }

  constructor(argument, loc) {
    super("SpreadElement", loc);
    this["argument@370"] = argument;
  }

  get argument() {
    return this["argument@370"];
  }

}
setType("Fable.AST.Babel.SpreadElement", SpreadElement);
export class ArrayExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(ArrayExpression, {
      type: "Fable.AST.Babel.ArrayExpression",
      interfaces: [],
      properties: {
        elements: makeGeneric(List, {
          T: Option(Any)
        })
      }
    });
  }

  constructor(elements, loc) {
    super("ArrayExpression", loc);
    this["elements@374"] = elements;
  }

  get elements() {
    return this["elements@374"];
  }

}
setType("Fable.AST.Babel.ArrayExpression", ArrayExpression);
export class ObjectMember extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(ObjectMember, {
      type: "Fable.AST.Babel.ObjectMember",
      interfaces: [],
      properties: {
        computed: "boolean",
        key: Expression,
        value: Option(Expression)
      }
    });
  }

  constructor(typ, key, value, computed, loc) {
    super(typ, loc);
    this["key@379"] = key;
    this["value@379"] = value;
    this["computed@379"] = computed;
  }

  get key() {
    return this["key@379"];
  }

  get value() {
    return this["value@379"];
  }

  get computed() {
    return defaultArg(this["computed@379"], false);
  }

}
setType("Fable.AST.Babel.ObjectMember", ObjectMember);
export class ObjectProperty extends ObjectMember {
  [_Symbol.reflection]() {
    return extendInfo(ObjectProperty, {
      type: "Fable.AST.Babel.ObjectProperty",
      interfaces: [],
      properties: {
        shorthand: "boolean"
      }
    });
  }

  constructor(key, value, shorthand, computed, loc) {
    super("ObjectProperty", key, value, computed, loc);
    this["shorthand@386"] = shorthand;
  }

  get shorthand() {
    return defaultArg(this["shorthand@386"], false);
  }

}
setType("Fable.AST.Babel.ObjectProperty", ObjectProperty);
export class ObjectMethodKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.ObjectMethodKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ObjectGetter"], ["ObjectSetter"], ["ObjectMeth"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.Babel.ObjectMethodKind", ObjectMethodKind);
export class ObjectMethod extends ObjectMember {
  [_Symbol.reflection]() {
    return extendInfo(ObjectMethod, {
      type: "Fable.AST.Babel.ObjectMethod",
      interfaces: [],
      properties: {
        async: "boolean",
        body: BlockStatement,
        generator: "boolean",
        kind: "string",
        params: makeGeneric(List, {
          T: Interface("Fable.AST.Babel.Pattern")
        }),
        returnType: Option(TypeAnnotation),
        typeParameters: Option(TypeParameterDeclaration)
      }
    });
  }

  constructor(kind, key, params, body, computed, generator, async, returnType, typeParams, loc) {
    super("ObjectMethod", key, null, computed, loc);
    this["kind@392"] = kind;
    this["params@392"] = params;
    this["body@392"] = body;
    this["generator@392"] = generator;
    this["async@393"] = async;
    this["returnType@393"] = returnType;
    this.typeParams = typeParams;
  }

  get kind() {
    return this["kind@392"].tag === 1 ? "set" : this["kind@392"].tag === 2 ? "method" : "get";
  }

  get params() {
    return this["params@392"];
  }

  get body() {
    return this["body@392"];
  }

  get generator() {
    return defaultArg(this["generator@392"], false);
  }

  get async() {
    return defaultArg(this["async@393"], false);
  }

  get returnType() {
    return this["returnType@393"];
  }

  get typeParameters() {
    return this.typeParams;
  }

}
setType("Fable.AST.Babel.ObjectMethod", ObjectMethod);
export class MemberExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(MemberExpression, {
      type: "Fable.AST.Babel.MemberExpression",
      interfaces: ["Fable.AST.Babel.Pattern"],
      properties: {
        computed: "boolean",
        object: Expression,
        property: Expression
      }
    });
  }

  constructor(object, property, computed, loc) {
    super("MemberExpression", loc);
    this["object@407"] = object;
    this["property@407"] = property;
    this["computed@407"] = computed;
  }

  get object() {
    return this["object@407"];
  }

  get property() {
    return this["property@407"];
  }

  get computed() {
    return defaultArg(this["computed@407"], false);
  }

}
setType("Fable.AST.Babel.MemberExpression", MemberExpression);
export class ObjectExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(ObjectExpression, {
      type: "Fable.AST.Babel.ObjectExpression",
      interfaces: [],
      properties: {
        properties: makeGeneric(List, {
          T: Any
        })
      }
    });
  }

  constructor(properties, loc) {
    super("ObjectExpression", loc);
    this["properties@414"] = properties;
  }

  get properties() {
    return this["properties@414"];
  }

}
setType("Fable.AST.Babel.ObjectExpression", ObjectExpression);
export class ConditionalExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(ConditionalExpression, {
      type: "Fable.AST.Babel.ConditionalExpression",
      interfaces: [],
      properties: {
        alternate: Expression,
        consequent: Expression,
        test: Expression
      }
    });
  }

  constructor(test, consequent, alternate, loc) {
    super("ConditionalExpression", loc);
    this["test@419"] = test;
    this["consequent@419"] = consequent;
    this["alternate@419"] = alternate;
  }

  get test() {
    return this["test@419"];
  }

  get consequent() {
    return this["consequent@419"];
  }

  get alternate() {
    return this["alternate@419"];
  }

}
setType("Fable.AST.Babel.ConditionalExpression", ConditionalExpression);
export class CallExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(CallExpression, {
      type: "Fable.AST.Babel.CallExpression",
      interfaces: [],
      properties: {
        arguments: makeGeneric(List, {
          T: Any
        }),
        callee: Expression
      }
    });
  }

  constructor(callee, _arguments, loc) {
    super("CallExpression", loc);
    this["callee@426"] = callee;
    this["arguments@426"] = _arguments;
  }

  get callee() {
    return this["callee@426"];
  }

  get arguments() {
    return this["arguments@426"];
  }

}
setType("Fable.AST.Babel.CallExpression", CallExpression);
export class NewExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(NewExpression, {
      type: "Fable.AST.Babel.NewExpression",
      interfaces: [],
      properties: {
        arguments: makeGeneric(List, {
          T: Any
        }),
        callee: Expression
      }
    });
  }

  constructor(callee, _arguments, loc) {
    super("NewExpression", loc);
    this["callee@431"] = callee;
    this["arguments@431"] = _arguments;
  }

  get callee() {
    return this["callee@431"];
  }

  get arguments() {
    return this["arguments@431"];
  }

}
setType("Fable.AST.Babel.NewExpression", NewExpression);
export class SequenceExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(SequenceExpression, {
      type: "Fable.AST.Babel.SequenceExpression",
      interfaces: [],
      properties: {
        expressions: makeGeneric(List, {
          T: Expression
        })
      }
    });
  }

  constructor(expressions, loc) {
    super("SequenceExpression", loc);
    this["expressions@437"] = expressions;
  }

  get expressions() {
    return this["expressions@437"];
  }

}
setType("Fable.AST.Babel.SequenceExpression", SequenceExpression);
export class UnaryExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(UnaryExpression, {
      type: "Fable.AST.Babel.UnaryExpression",
      interfaces: [],
      properties: {
        argument: Expression,
        operator: "string",
        prefix: "boolean"
      }
    });
  }

  constructor(operator, argument, prefix, loc) {
    super("UnaryExpression", loc);
    this["operator@442"] = operator;
    this["argument@442"] = argument;
    this["prefix@442"] = prefix;
  }

  get prefix() {
    return defaultArg(this["prefix@442"], true);
  }

  get argument() {
    return this["argument@442"];
  }

  get operator() {
    switch (this["operator@442"].tag) {
      case 1:
        return "+";

      case 2:
        return "!";

      case 3:
        return "~";

      case 4:
        return "typeof";

      case 5:
        return "void";

      case 6:
        return "delete";

      default:
        return "-";
    }
  }

}
setType("Fable.AST.Babel.UnaryExpression", UnaryExpression);
export class UpdateExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(UpdateExpression, {
      type: "Fable.AST.Babel.UpdateExpression",
      interfaces: [],
      properties: {
        argument: Expression,
        operator: "string",
        prefix: "boolean"
      }
    });
  }

  constructor(operator, prefix, argument, loc) {
    super("UpdateExpression", loc);
    this["operator@456"] = operator;
    this["prefix@456"] = prefix;
    this["argument@456"] = argument;
  }

  get prefix() {
    return this["prefix@456"];
  }

  get argument() {
    return this["argument@456"];
  }

  get operator() {
    return this["operator@456"].tag === 1 ? "++" : "--";
  }

}
setType("Fable.AST.Babel.UpdateExpression", UpdateExpression);
export class BinaryExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(BinaryExpression, {
      type: "Fable.AST.Babel.BinaryExpression",
      interfaces: [],
      properties: {
        left: Expression,
        operator: "string",
        right: Expression
      }
    });
  }

  constructor(operator, left, right, loc) {
    super("BinaryExpression", loc);
    this["operator@466"] = operator;
    this["left@466"] = left;
    this["right@466"] = right;
  }

  get left() {
    return this["left@466"];
  }

  get right() {
    return this["right@466"];
  }

  get operator() {
    switch (this["operator@466"].tag) {
      case 1:
        return "!=";

      case 2:
        return "===";

      case 3:
        return "!==";

      case 4:
        return "<";

      case 5:
        return "<=";

      case 6:
        return ">";

      case 7:
        return ">=";

      case 8:
        return "<<";

      case 9:
        return ">>";

      case 10:
        return ">>>";

      case 11:
        return "-";

      case 12:
        return "+";

      case 13:
        return "*";

      case 14:
        return "/";

      case 15:
        return "%";

      case 16:
        return "**";

      case 17:
        return "|";

      case 18:
        return "^";

      case 19:
        return "&";

      case 20:
        return "in";

      case 21:
        return "instanceof";

      default:
        return "==";
    }
  }

}
setType("Fable.AST.Babel.BinaryExpression", BinaryExpression);
export class AssignmentExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(AssignmentExpression, {
      type: "Fable.AST.Babel.AssignmentExpression",
      interfaces: [],
      properties: {
        left: Expression,
        operator: "string",
        right: Expression
      }
    });
  }

  constructor(operator, left, right, loc) {
    super("AssignmentExpression", loc);
    this["operator@495"] = operator;
    this["left@495"] = left;
    this["right@495"] = right;
  }

  get left() {
    return this["left@495"];
  }

  get right() {
    return this["right@495"];
  }

  get operator() {
    switch (this["operator@495"].tag) {
      case 1:
        return "-=";

      case 2:
        return "+=";

      case 3:
        return "*=";

      case 4:
        return "/=";

      case 5:
        return "%=";

      case 6:
        return "<<=";

      case 7:
        return ">>=";

      case 8:
        return ">>>=";

      case 9:
        return "|=";

      case 10:
        return "^=";

      case 11:
        return "&=";

      default:
        return "=";
    }
  }

}
setType("Fable.AST.Babel.AssignmentExpression", AssignmentExpression);
export class LogicalExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(LogicalExpression, {
      type: "Fable.AST.Babel.LogicalExpression",
      interfaces: [],
      properties: {
        left: Expression,
        operator: "string",
        right: Expression
      }
    });
  }

  constructor(operator, left, right, loc) {
    super("LogicalExpression", loc);
    this["operator@514"] = operator;
    this["left@514"] = left;
    this["right@514"] = right;
  }

  get left() {
    return this["left@514"];
  }

  get right() {
    return this["right@514"];
  }

  get operator() {
    return this["operator@514"].tag === 1 ? "&&" : "||";
  }

}
setType("Fable.AST.Babel.LogicalExpression", LogicalExpression);
export class ArrayPattern extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(ArrayPattern, {
      type: "Fable.AST.Babel.ArrayPattern",
      interfaces: ["Fable.AST.Babel.Pattern"],
      properties: {
        elements: makeGeneric(List, {
          T: Option(Interface("Fable.AST.Babel.Pattern"))
        })
      }
    });
  }

  constructor(elements, loc) {
    super("ArrayPattern", loc);
    this["elements@534"] = elements;
  }

  get elements() {
    return this["elements@534"];
  }

}
setType("Fable.AST.Babel.ArrayPattern", ArrayPattern);
export class AssignmentPattern extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(AssignmentPattern, {
      type: "Fable.AST.Babel.AssignmentPattern",
      interfaces: ["Fable.AST.Babel.Pattern"],
      properties: {
        left: Interface("Fable.AST.Babel.Pattern"),
        right: Expression
      }
    });
  }

  constructor(left, right, loc) {
    super("AssignmentPattern", loc);
    this["left@539"] = left;
    this["right@539"] = right;
  }

  get left() {
    return this["left@539"];
  }

  get right() {
    return this["right@539"];
  }

}
setType("Fable.AST.Babel.AssignmentPattern", AssignmentPattern);
export class RestElement extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(RestElement, {
      type: "Fable.AST.Babel.RestElement",
      interfaces: ["Fable.AST.Babel.Pattern"],
      properties: {
        argument: Interface("Fable.AST.Babel.Pattern")
      }
    });
  }

  constructor(argument, loc) {
    super("RestElement", loc);
    this["argument@545"] = argument;
  }

  get argument() {
    return this["argument@545"];
  }

}
setType("Fable.AST.Babel.RestElement", RestElement);
export class ClassMethodKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.ClassMethodKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ClassConstructor"], ["ClassFunction"], ["ClassGetter"], ["ClassSetter"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.AST.Babel.ClassMethodKind", ClassMethodKind);
export class ClassMethod extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(ClassMethod, {
      type: "Fable.AST.Babel.ClassMethod",
      interfaces: [],
      properties: {
        body: BlockStatement,
        computed: "boolean",
        key: Expression,
        kind: "string",
        params: makeGeneric(List, {
          T: Interface("Fable.AST.Babel.Pattern")
        }),
        returnType: Option(TypeAnnotation),
        static: "boolean",
        typeParameters: Option(TypeParameterDeclaration)
      }
    });
  }

  constructor(kind, key, params, body, computed, _static, returnType, typeParams, loc) {
    super("ClassMethod", loc);
    this["kind@554"] = kind;
    this["key@554"] = key;
    this["params@554"] = params;
    this["body@554"] = body;
    this["computed@554"] = computed;
    this["static@554"] = _static;
    this["returnType@555"] = returnType;
    this.typeParams = typeParams;
  }

  get kind() {
    return this["kind@554"].tag === 2 ? "get" : this["kind@554"].tag === 3 ? "set" : this["kind@554"].tag === 1 ? "method" : "constructor";
  }

  get key() {
    return this["key@554"];
  }

  get params() {
    return this["params@554"];
  }

  get body() {
    return this["body@554"];
  }

  get computed() {
    return this["computed@554"];
  }

  get static() {
    return this["static@554"];
  }

  get returnType() {
    return this["returnType@555"];
  }

  get typeParameters() {
    return this.typeParams;
  }

}
setType("Fable.AST.Babel.ClassMethod", ClassMethod);
export class ClassProperty extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(ClassProperty, {
      type: "Fable.AST.Babel.ClassProperty",
      interfaces: [],
      properties: {
        key: Identifier,
        typeAnnotation: Option(TypeAnnotation),
        value: Option(Expression)
      }
    });
  }

  constructor(key, value, typeAnnotation, loc) {
    super("ClassProperty", loc);
    this["key@575"] = key;
    this["value@575"] = value;
    this["typeAnnotation@575"] = typeAnnotation;
  }

  get key() {
    return this["key@575"];
  }

  get value() {
    return this["value@575"];
  }

  get typeAnnotation() {
    return this["typeAnnotation@575"];
  }

}
setType("Fable.AST.Babel.ClassProperty", ClassProperty);
export class ClassBody extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(ClassBody, {
      type: "Fable.AST.Babel.ClassBody",
      interfaces: [],
      properties: {
        body: makeGeneric(List, {
          T: Any
        })
      }
    });
  }

  constructor(body, loc) {
    super("ClassBody", loc);
    this["body@581"] = body;
  }

  get body() {
    return this["body@581"];
  }

}
setType("Fable.AST.Babel.ClassBody", ClassBody);
export class ClassDeclaration extends Declaration {
  [_Symbol.reflection]() {
    return extendInfo(ClassDeclaration, {
      type: "Fable.AST.Babel.ClassDeclaration",
      interfaces: [],
      properties: {
        body: ClassBody,
        id: Identifier,
        superClass: Option(Expression),
        typeParameters: Option(TypeParameterDeclaration)
      }
    });
  }

  constructor(body, id, _super, typeParams, loc) {
    super("ClassDeclaration", loc);
    this["body@585"] = body;
    this["id@585"] = id;
    this.super = _super;
    this.typeParams = typeParams;
  }

  get body() {
    return this["body@585"];
  }

  get id() {
    return this["id@585"];
  }

  get superClass() {
    return this.super;
  }

  get typeParameters() {
    return this.typeParams;
  }

}
setType("Fable.AST.Babel.ClassDeclaration", ClassDeclaration);
export class ClassExpression extends Expression {
  [_Symbol.reflection]() {
    return extendInfo(ClassExpression, {
      type: "Fable.AST.Babel.ClassExpression",
      interfaces: [],
      properties: {
        body: ClassBody,
        id: Option(Identifier),
        superClass: Option(Expression),
        typeParameters: Option(TypeParameterDeclaration)
      }
    });
  }

  constructor(body, id, _super, typeParams, loc) {
    super("ClassExpression", loc);
    this["body@594"] = body;
    this["id@594"] = id;
    this.super = _super;
    this.typeParams = typeParams;
  }

  get body() {
    return this["body@594"];
  }

  get id() {
    return this["id@594"];
  }

  get superClass() {
    return this.super;
  }

  get typeParameters() {
    return this.typeParams;
  }

}
setType("Fable.AST.Babel.ClassExpression", ClassExpression);
export class ModuleSpecifier extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(ModuleSpecifier, {
      type: "Fable.AST.Babel.ModuleSpecifier",
      interfaces: [],
      properties: {
        local: Identifier
      }
    });
  }

  constructor(typ, local, loc) {
    super(typ, loc);
    this["local@610"] = local;
  }

  get local() {
    return this["local@610"];
  }

}
setType("Fable.AST.Babel.ModuleSpecifier", ModuleSpecifier);
export class ImportSpecifier extends ModuleSpecifier {
  [_Symbol.reflection]() {
    return extendInfo(ImportSpecifier, {
      type: "Fable.AST.Babel.ImportSpecifier",
      interfaces: [],
      properties: {
        imported: Identifier
      }
    });
  }

  constructor(local, imported, loc) {
    super("ImportSpecifier", local, loc);
    this["imported@619"] = imported;
  }

  get imported() {
    return this["imported@619"];
  }

}
setType("Fable.AST.Babel.ImportSpecifier", ImportSpecifier);
export class ImportDefaultSpecifier extends ModuleSpecifier {
  [_Symbol.reflection]() {
    return extendInfo(ImportDefaultSpecifier, {
      type: "Fable.AST.Babel.ImportDefaultSpecifier",
      interfaces: [],
      properties: {}
    });
  }

  constructor(local, loc) {
    super("ImportDefaultSpecifier", local, loc);
  }

}
setType("Fable.AST.Babel.ImportDefaultSpecifier", ImportDefaultSpecifier);
export class ImportNamespaceSpecifier extends ModuleSpecifier {
  [_Symbol.reflection]() {
    return extendInfo(ImportNamespaceSpecifier, {
      type: "Fable.AST.Babel.ImportNamespaceSpecifier",
      interfaces: [],
      properties: {}
    });
  }

  constructor(local, loc) {
    super("ImportNamespaceSpecifier", local, loc);
  }

}
setType("Fable.AST.Babel.ImportNamespaceSpecifier", ImportNamespaceSpecifier);
export class ImportDeclaration extends ModuleDeclaration {
  [_Symbol.reflection]() {
    return extendInfo(ImportDeclaration, {
      type: "Fable.AST.Babel.ImportDeclaration",
      interfaces: [],
      properties: {
        source: Literal,
        specifiers: makeGeneric(List, {
          T: Any
        })
      }
    });
  }

  constructor(specifiers, source, loc) {
    super("ImportDeclaration", loc);
    this["specifiers@632"] = specifiers;
    this["source@632"] = source;
  }

  get specifiers() {
    return this["specifiers@632"];
  }

  get source() {
    return this["source@632"];
  }

}
setType("Fable.AST.Babel.ImportDeclaration", ImportDeclaration);
export class ExportSpecifier extends ModuleSpecifier {
  [_Symbol.reflection]() {
    return extendInfo(ExportSpecifier, {
      type: "Fable.AST.Babel.ExportSpecifier",
      interfaces: [],
      properties: {
        exported: Identifier
      }
    });
  }

  constructor(local, exported, loc) {
    super("ExportSpecifier", local, loc);
    this["exported@643"] = exported;
  }

  get exported() {
    return this["exported@643"];
  }

}
setType("Fable.AST.Babel.ExportSpecifier", ExportSpecifier);
export class ExportNamedDeclaration extends ModuleDeclaration {
  [_Symbol.reflection]() {
    return extendInfo(ExportNamedDeclaration, {
      type: "Fable.AST.Babel.ExportNamedDeclaration",
      interfaces: [],
      properties: {
        declaration: Option(Declaration),
        source: Option(Literal),
        specifiers: makeGeneric(List, {
          T: ExportSpecifier
        })
      }
    });
  }

  constructor(declaration, specifiers, source, loc) {
    super("ExportNamedDeclaration", loc);
    this["declaration@649"] = declaration;
    this["specifiers@649"] = specifiers;
    this["source@649"] = source;
  }

  get declaration() {
    return this["declaration@649"];
  }

  get specifiers() {
    return defaultArg(this["specifiers@649"], new List());
  }

  get source() {
    return this["source@649"];
  }

}
setType("Fable.AST.Babel.ExportNamedDeclaration", ExportNamedDeclaration);
export class ExportDefaultDeclaration extends ModuleDeclaration {
  [_Symbol.reflection]() {
    return extendInfo(ExportDefaultDeclaration, {
      type: "Fable.AST.Babel.ExportDefaultDeclaration",
      interfaces: [],
      properties: {
        declaration: Any
      }
    });
  }

  constructor(declaration, loc) {
    super("ExportDefaultDeclaration", loc);
    this["declaration@656"] = declaration;
  }

  get declaration() {
    return this["declaration@656"];
  }

}
setType("Fable.AST.Babel.ExportDefaultDeclaration", ExportDefaultDeclaration);
export class ExportAllDeclaration extends ModuleDeclaration {
  [_Symbol.reflection]() {
    return extendInfo(ExportAllDeclaration, {
      type: "Fable.AST.Babel.ExportAllDeclaration",
      interfaces: [],
      properties: {
        source: Literal
      }
    });
  }

  constructor(source, loc) {
    super("ExportAllDeclaration", loc);
    this["source@661"] = source;
  }

  get source() {
    return this["source@661"];
  }

}
setType("Fable.AST.Babel.ExportAllDeclaration", ExportAllDeclaration);
export class StringTypeAnnotation extends TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return extendInfo(StringTypeAnnotation, {
      type: "Fable.AST.Babel.StringTypeAnnotation",
      interfaces: [],
      properties: {}
    });
  }

  constructor() {
    super("StringTypeAnnotation");
  }

}
setType("Fable.AST.Babel.StringTypeAnnotation", StringTypeAnnotation);
export class NumberTypeAnnotation extends TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return extendInfo(NumberTypeAnnotation, {
      type: "Fable.AST.Babel.NumberTypeAnnotation",
      interfaces: [],
      properties: {}
    });
  }

  constructor() {
    super("NumberTypeAnnotation");
  }

}
setType("Fable.AST.Babel.NumberTypeAnnotation", NumberTypeAnnotation);
export class BooleanTypeAnnotation extends TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return extendInfo(BooleanTypeAnnotation, {
      type: "Fable.AST.Babel.BooleanTypeAnnotation",
      interfaces: [],
      properties: {}
    });
  }

  constructor() {
    super("BooleanTypeAnnotation");
  }

}
setType("Fable.AST.Babel.BooleanTypeAnnotation", BooleanTypeAnnotation);
export class AnyTypeAnnotation extends TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return extendInfo(AnyTypeAnnotation, {
      type: "Fable.AST.Babel.AnyTypeAnnotation",
      interfaces: [],
      properties: {}
    });
  }

  constructor() {
    super("AnyTypeAnnotation");
  }

}
setType("Fable.AST.Babel.AnyTypeAnnotation", AnyTypeAnnotation);
export class VoidTypeAnnotation extends TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return extendInfo(VoidTypeAnnotation, {
      type: "Fable.AST.Babel.VoidTypeAnnotation",
      interfaces: [],
      properties: {}
    });
  }

  constructor() {
    super("VoidTypeAnnotation");
  }

}
setType("Fable.AST.Babel.VoidTypeAnnotation", VoidTypeAnnotation);
export class TupleTypeAnnotation extends TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return extendInfo(TupleTypeAnnotation, {
      type: "Fable.AST.Babel.TupleTypeAnnotation",
      interfaces: [],
      properties: {
        types: makeGeneric(List, {
          T: TypeAnnotationInfo
        })
      }
    });
  }

  constructor(types) {
    super("TupleTypeAnnotation");
    this["types@682"] = types;
  }

  get types() {
    return this["types@682"];
  }

}
setType("Fable.AST.Babel.TupleTypeAnnotation", TupleTypeAnnotation);
export class FunctionTypeParam {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.FunctionTypeParam",
      properties: {
        name: Identifier,
        optional: "boolean",
        type: "string",
        typeAnnotation: TypeAnnotationInfo
      }
    };
  }

  constructor(name, typeInfo, optional) {
    this["name@686"] = name;
    this.typeInfo = typeInfo;
    this["optional@686"] = optional;
  }

  get type() {
    return "FunctionTypeParam";
  }

  get name() {
    return this["name@686"];
  }

  get typeAnnotation() {
    return this.typeInfo;
  }

  get optional() {
    return defaultArg(this["optional@686"], false);
  }

}
setType("Fable.AST.Babel.FunctionTypeParam", FunctionTypeParam);
export class FunctionTypeAnnotation extends TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return extendInfo(FunctionTypeAnnotation, {
      type: "Fable.AST.Babel.FunctionTypeAnnotation",
      interfaces: [],
      properties: {
        params: makeGeneric(List, {
          T: FunctionTypeParam
        }),
        rest: Option(FunctionTypeParam),
        returnType: TypeAnnotationInfo
      }
    });
  }

  constructor(params, returnType, rest) {
    super("FunctionTypeAnnotation");
    this["params@692"] = params;
    this["returnType@692"] = returnType;
    this["rest@692"] = rest;
  }

  get params() {
    return this["params@692"];
  }

  get rest() {
    return this["rest@692"];
  }

  get returnType() {
    return this["returnType@692"];
  }

}
setType("Fable.AST.Babel.FunctionTypeAnnotation", FunctionTypeAnnotation);
export class NullableTypeAnnotation extends TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return extendInfo(NullableTypeAnnotation, {
      type: "Fable.AST.Babel.NullableTypeAnnotation",
      interfaces: [],
      properties: {
        typeAnnotation: TypeAnnotationInfo
      }
    });
  }

  constructor(typ) {
    super("NullableTypeAnnotation");
    this.typ = typ;
  }

  get typeAnnotation() {
    return this.typ;
  }

}
setType("Fable.AST.Babel.NullableTypeAnnotation", NullableTypeAnnotation);
export class GenericTypeAnnotation extends TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return extendInfo(GenericTypeAnnotation, {
      type: "Fable.AST.Babel.GenericTypeAnnotation",
      interfaces: [],
      properties: {
        id: Identifier,
        typeParameters: Option(TypeParameterInstantiation)
      }
    });
  }

  constructor(id, typeParams) {
    super("GenericTypeAnnotation");
    this["id@702"] = id;
    this.typeParams = typeParams;
  }

  get id() {
    return this["id@702"];
  }

  get typeParameters() {
    return this.typeParams;
  }

}
setType("Fable.AST.Babel.GenericTypeAnnotation", GenericTypeAnnotation);
export class ObjectTypeProperty extends _Node {
  [_Symbol.reflection]() {
    return extendInfo(ObjectTypeProperty, {
      type: "Fable.AST.Babel.ObjectTypeProperty",
      interfaces: [],
      properties: {
        key: Identifier,
        optional: "boolean",
        static: "boolean",
        value: TypeAnnotationInfo
      }
    });
  }

  constructor(key, value, isStatic, isOptional) {
    super("ObjectTypeProperty", null);
    this["key@707"] = key;
    this["value@707"] = value;
    this.isStatic = isStatic;
    this.isOptional = isOptional;
  }

  get key() {
    return this["key@707"];
  }

  get value() {
    return this["value@707"];
  }

  get static() {
    return defaultArg(this.isStatic, false);
  }

  get optional() {
    return defaultArg(this.isOptional, false);
  }

}
setType("Fable.AST.Babel.ObjectTypeProperty", ObjectTypeProperty);
export class ObjectTypeAnnotation extends TypeAnnotationInfo {
  [_Symbol.reflection]() {
    return extendInfo(ObjectTypeAnnotation, {
      type: "Fable.AST.Babel.ObjectTypeAnnotation",
      interfaces: [],
      properties: {
        callProperties: makeGeneric(List, {
          T: Any
        }),
        indexers: makeGeneric(List, {
          T: Any
        }),
        properties: makeGeneric(List, {
          T: Any
        })
      }
    });
  }

  constructor(properties) {
    super("ObjectTypeAnnotation");
  }

  get properties() {
    return new List();
  }

  get callProperties() {
    return new List();
  }

  get indexers() {
    return new List();
  }

}
setType("Fable.AST.Babel.ObjectTypeAnnotation", ObjectTypeAnnotation);
export class InterfaceExtends {
  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Babel.InterfaceExtends",
      properties: {
        id: Identifier,
        type: "string",
        typeParameters: Option(TypeParameterInstantiation)
      }
    };
  }

  constructor(id, typeParams) {
    this["id@720"] = id;
    this.typeParams = typeParams;
  }

  get type() {
    return "InterfaceExtends";
  }

  get id() {
    return this["id@720"];
  }

  get typeParameters() {
    return this.typeParams;
  }

}
setType("Fable.AST.Babel.InterfaceExtends", InterfaceExtends);
export class InterfaceDeclaration extends Declaration {
  [_Symbol.reflection]() {
    return extendInfo(InterfaceDeclaration, {
      type: "Fable.AST.Babel.InterfaceDeclaration",
      interfaces: [],
      properties: {
        body: ObjectTypeAnnotation,
        extends: makeGeneric(List, {
          T: InterfaceExtends
        }),
        id: Identifier,
        typeParameters: Option(TypeParameterDeclaration)
      }
    });
  }

  constructor(body, id, _extends, typeParams, loc) {
    super("InterfaceDeclaration", loc);
    this["body@725"] = body;
    this["id@725"] = id;
    this["extends@725"] = _extends;
    this.typeParams = typeParams;
  }

  get body() {
    return this["body@725"];
  }

  get id() {
    return this["id@725"];
  }

  get extends() {
    return this["extends@725"];
  }

  get typeParameters() {
    return this.typeParams;
  }

}
setType("Fable.AST.Babel.InterfaceDeclaration", InterfaceDeclaration);