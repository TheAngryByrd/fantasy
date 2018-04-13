import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { printf, toText } from "../fable-core/String";
export class SR {
  [_Symbol.reflection]() {
    return {
      type: "FSComp.SR",
      properties: {}
    };
  }

  constructor() {}

  static undefinedNameNamespace(a0) {
    return toText(printf("The namespace '%s' is not defined."))(a0);
  }

  static undefinedNameNamespaceOrModule(a0) {
    return toText(printf("The namespace or module '%s' is not defined."))(a0);
  }

  static undefinedNameFieldConstructorOrMember(a0) {
    return toText(printf("The field, constructor or member '%s' is not defined."))(a0);
  }

  static undefinedNameValueConstructorNamespaceOrType(a0) {
    return toText(printf("The value, constructor, namespace or type '%s' is not defined."))(a0);
  }

  static undefinedNameValueOfConstructor(a0) {
    return toText(printf("The value or constructor '%s' is not defined."))(a0);
  }

  static undefinedNameValueNamespaceTypeOrModule(a0) {
    return toText(printf("The value, namespace, type or module '%s' is not defined."))(a0);
  }

  static undefinedNameConstructorModuleOrNamespace(a0) {
    return toText(printf("The constructor, module or namespace '%s' is not defined."))(a0);
  }

  static undefinedNameType(a0) {
    return toText(printf("The type '%s' is not defined."))(a0);
  }

  static undefinedNameTypeIn(a0, a1) {
    return toText(printf("The type '%s' is not defined in '%s'."))(a0, a1);
  }

  static undefinedNameRecordLabelOrNamespace(a0) {
    return toText(printf("The record label or namespace '%s' is not defined."))(a0);
  }

  static undefinedNameRecordLabel(a0) {
    return toText(printf("The record label '%s' is not defined."))(a0);
  }

  static undefinedNameSuggestionsIntro() {
    return toText(printf("Maybe you want one of the following:"));
  }

  static undefinedNameTypeParameter(a0) {
    return toText(printf("The type parameter %s is not defined."))(a0);
  }

  static undefinedNamePatternDiscriminator(a0) {
    return toText(printf("The pattern discriminator '%s' is not defined."))(a0);
  }

  static replaceWithSuggestion(a0) {
    return toText(printf("Replace with '%s'"))(a0);
  }

  static addIndexerDot() {
    return toText(printf("Add . for indexer access."));
  }

  static listElementHasWrongType(a0, a1) {
    return toText(printf("All elements of a list constructor expression must have the same type. This expression was expected to have type '%s', but here has type '%s'."))(a0, a1);
  }

  static arrayElementHasWrongType(a0, a1) {
    return toText(printf("All elements of an array constructor expression must have the same type. This expression was expected to have type '%s', but here has type '%s'."))(a0, a1);
  }

  static missingElseBranch(a0) {
    return toText(printf("The 'if' expression is missing an 'else' branch. The 'then' branch has type '%s'. Because 'if' is an expression, and not a statement, add an 'else' branch which returns a value of the same type."))(a0);
  }

  static ifExpression(a0, a1) {
    return toText(printf("The 'if' expression needs to have type '%s' to satisfy context type requirements. It currently has type '%s'."))(a0, a1);
  }

  static elseBranchHasWrongType(a0, a1) {
    return toText(printf("All branches of an 'if' expression must have the same type. This expression was expected to have type '%s', but here has type '%s'."))(a0, a1);
  }

  static followingPatternMatchClauseHasWrongType(a0, a1) {
    return toText(printf("All branches of a pattern match expression must have the same type. This expression was expected to have type '%s', but here has type '%s'."))(a0, a1);
  }

  static patternMatchGuardIsNotBool(a0) {
    return toText(printf("A pattern match guard must be of type 'bool', but this 'when' expression is of type '%s'."))(a0);
  }

  static commaInsteadOfSemicolonInRecord() {
    return toText(printf("A ';' is used to separate field values in records. Consider replacing ',' with ';'."));
  }

  static derefInsteadOfNot() {
    return toText(printf("The '!' operator is used to dereference a ref cell. Consider using 'not expr' here."));
  }

  static buildUnexpectedTypeArgs(a0, a1) {
    return toText(printf("The non-generic type '%s' does not expect any type arguments, but here is given %d type argument(s)"))(a0, a1);
  }

  static returnUsedInsteadOfReturnBang() {
    return toText(printf("Consider using 'return!' instead of 'return'."));
  }

  static yieldUsedInsteadOfYieldBang() {
    return toText(printf("Consider using 'yield!' instead of 'yield'."));
  }

  static tupleRequiredInAbstractMethod() {
    return toText(printf("\nA tuple type is required for one or more arguments. Consider wrapping the given arguments in additional parentheses or review the definition of the interface."));
  }

  static buildInvalidWarningNumber(a0) {
    return [203, toText(printf("Invalid warning number '%s'"))(a0)];
  }

  static buildInvalidVersionString(a0) {
    return [204, toText(printf("Invalid version string '%s'"))(a0)];
  }

  static buildInvalidVersionFile(a0) {
    return [205, toText(printf("Invalid version file '%s'"))(a0)];
  }

  static buildProductName(a0) {
    return toText(printf("Microsoft (R) F# Compiler version %s"))(a0);
  }

  static buildProductNameCommunity(a0) {
    return toText(printf("F# Compiler for F# %s"))(a0);
  }

  static buildProblemWithFilename(a0, a1) {
    return [206, toText(printf("Problem with filename '%s': %s"))(a0, a1)];
  }

  static buildNoInputsSpecified() {
    return [207, toText(printf("No inputs specified"))];
  }

  static buildPdbRequiresDebug() {
    return [209, toText(printf("The '--pdb' option requires the '--debug' option to be used"))];
  }

  static buildInvalidSearchDirectory(a0) {
    return [210, toText(printf("The search directory '%s' is invalid"))(a0)];
  }

  static buildSearchDirectoryNotFound(a0) {
    return [211, toText(printf("The search directory '%s' could not be found"))(a0)];
  }

  static buildInvalidFilename(a0) {
    return [212, toText(printf("'%s' is not a valid filename"))(a0)];
  }

  static buildInvalidAssemblyName(a0) {
    return [213, toText(printf("'%s' is not a valid assembly name"))(a0)];
  }

  static buildInvalidPrivacy(a0) {
    return [214, toText(printf("Unrecognized privacy setting '%s' for managed resource, valid options are 'public' and 'private'"))(a0)];
  }

  static buildMultipleReferencesNotAllowed(a0) {
    return [215, toText(printf("Multiple references to '%s.dll' are not permitted"))(a0)];
  }

  static buildCouldNotReadVersionInfoFromMscorlib() {
    return toText(printf("Could not read version from mscorlib.dll"));
  }

  static buildCannotReadAssembly(a0) {
    return [218, toText(printf("Unable to read assembly '%s'"))(a0)];
  }

  static buildAssemblyResolutionFailed() {
    return [220, toText(printf("Assembly resolution failure at or near this location"))];
  }

  static buildImplicitModuleIsNotLegalIdentifier(a0, a1) {
    return [221, toText(printf("The declarations in this file will be placed in an implicit module '%s' based on the file name '%s'. However this is not a valid F# identifier, so the contents will not be accessible from other files. Consider renaming the file or adding a 'module' or 'namespace' declaration at the top of the file."))(a0, a1)];
  }

  static buildMultiFileRequiresNamespaceOrModule() {
    return [222, toText(printf("Files in libraries or multiple-file applications must begin with a namespace or module declaration, e.g. 'namespace SomeNamespace.SubNamespace' or 'module SomeNamespace.SomeModule'. Only the last source file of an application may omit such a declaration."))];
  }

  static noEqualSignAfterModule() {
    return [222, toText(printf("Files in libraries or multiple-file applications must begin with a namespace or module declaration. When using a module declaration at the start of a file the '=' sign is not allowed. If this is a top-level module, consider removing the = to resolve this error."))];
  }

  static buildMultipleToplevelModules() {
    return [223, toText(printf("This file contains multiple declarations of the form 'module SomeNamespace.SomeModule'. Only one declaration of this form is permitted in a file. Change your file to use an initial namespace declaration and/or use 'module ModuleName = ...' to define your modules."))];
  }

  static buildOptionRequiresParameter(a0) {
    return [224, toText(printf("Option requires parameter: %s"))(a0)];
  }

  static buildCouldNotFindSourceFile(a0) {
    return [225, toText(printf("Source file '%s' could not be found"))(a0)];
  }

  static buildInvalidSourceFileExtension(a0) {
    return [226, toText(printf("The file extension of '%s' is not recognized. Source files must have extension .fs, .fsi, .fsx, .fsscript, .ml or .mli."))(a0)];
  }

  static buildCouldNotResolveAssembly(a0) {
    return [227, toText(printf("Could not resolve assembly '%s'"))(a0)];
  }

  static buildCouldNotResolveAssemblyRequiredByFile(a0, a1) {
    return [228, toText(printf("Could not resolve assembly '%s' required by '%s'"))(a0, a1)];
  }

  static buildErrorOpeningBinaryFile(a0, a1) {
    return [229, toText(printf("Error opening binary file '%s': %s"))(a0, a1)];
  }

  static buildDifferentVersionMustRecompile(a0) {
    return [231, toText(printf("The F#-compiled DLL '%s' needs to be recompiled to be used with this version of F#"))(a0)];
  }

  static buildInvalidHashIDirective() {
    return [232, toText(printf("Invalid directive. Expected '#I \"<path>\"'."))];
  }

  static buildInvalidHashrDirective() {
    return [233, toText(printf("Invalid directive. Expected '#r \"<file-or-assembly>\"'."))];
  }

  static buildInvalidHashloadDirective() {
    return [234, toText(printf("Invalid directive. Expected '#load \"<file>\" ... \"<file>\"'."))];
  }

  static buildInvalidHashtimeDirective() {
    return [235, toText(printf("Invalid directive. Expected '#time', '#time \"on\"' or '#time \"off\"'."))];
  }

  static buildDirectivesInModulesAreIgnored() {
    return [236, toText(printf("Directives inside modules are ignored"))];
  }

  static buildSignatureAlreadySpecified(a0) {
    return [237, toText(printf("A signature for the file or module '%s' has already been specified"))(a0)];
  }

  static buildImplementationAlreadyGivenDetail(a0) {
    return [238, toText(printf("An implementation of file or module '%s' has already been given. Compilation order is significant in F# because of type inference. You may need to adjust the order of your files to place the signature file before the implementation. In Visual Studio files are type-checked in the order they appear in the project file, which can be edited manually or adjusted using the solution explorer."))(a0)];
  }

  static buildImplementationAlreadyGiven(a0) {
    return [239, toText(printf("An implementation of the file or module '%s' has already been given"))(a0)];
  }

  static buildSignatureWithoutImplementation(a0) {
    return [240, toText(printf("The signature file '%s' does not have a corresponding implementation file. If an implementation file exists then check the 'module' and 'namespace' declarations in the signature and implementation files match."))(a0)];
  }

  static buildArgInvalidInt(a0) {
    return [241, toText(printf("'%s' is not a valid integer argument"))(a0)];
  }

  static buildArgInvalidFloat(a0) {
    return [242, toText(printf("'%s' is not a valid floating point argument"))(a0)];
  }

  static buildUnrecognizedOption(a0) {
    return [243, toText(printf("Unrecognized option: '%s'"))(a0)];
  }

  static buildInvalidModuleOrNamespaceName() {
    return [244, toText(printf("Invalid module or namespace name"))];
  }

  static pickleErrorReadingWritingMetadata(a0, a1) {
    return toText(printf("Error reading/writing metadata for the F# compiled DLL '%s'. Was the DLL compiled with an earlier version of the F# compiler? (error: '%s')."))(a0, a1);
  }

  static tastTypeOrModuleNotConcrete(a0) {
    return [245, toText(printf("The type/module '%s' is not a concrete module or type"))(a0)];
  }

  static tastTypeHasAssemblyCodeRepresentation(a0) {
    return toText(printf("The type '%s' has an inline assembly code representation"))(a0);
  }

  static tastNamespaceAndModuleWithSameNameInAssembly(a0) {
    return [247, toText(printf("A namespace and a module named '%s' both occur in two parts of this assembly"))(a0)];
  }

  static tastTwoModulesWithSameNameInAssembly(a0) {
    return [248, toText(printf("Two modules named '%s' occur in two parts of this assembly"))(a0)];
  }

  static tastDuplicateTypeDefinitionInAssembly(a0, a1) {
    return [249, toText(printf("Two type definitions named '%s' occur in namespace '%s' in two parts of this assembly"))(a0, a1)];
  }

  static tastConflictingModuleAndTypeDefinitionInAssembly(a0, a1) {
    return [250, toText(printf("A module and a type definition named '%s' occur in namespace '%s' in two parts of this assembly"))(a0, a1)];
  }

  static tastInvalidMemberSignature() {
    return [251, toText(printf("Invalid member signature encountered because of an earlier error"))];
  }

  static tastValueDoesNotHaveSetterType() {
    return [252, toText(printf("This value does not have a valid property setter type"))];
  }

  static tastInvalidFormForPropertyGetter() {
    return [253, toText(printf("Invalid form for a property getter. At least one '()' argument is required when using the explicit syntax."))];
  }

  static tastInvalidFormForPropertySetter() {
    return [254, toText(printf("Invalid form for a property setter. At least one argument is required."))];
  }

  static tastUnexpectedByRef() {
    return [255, toText(printf("Unexpected use of a byref-typed variable"))];
  }

  static tastValueMustBeLocalAndMutable() {
    return [256, toText(printf("A value must be mutable in order to mutate the contents or take the address of a value type, e.g. 'let mutable x = ...'"))];
  }

  static tastInvalidMutationOfConstant() {
    return [257, toText(printf("Invalid mutation of a constant expression. Consider copying the expression to a mutable local, e.g. 'let mutable x = ...'."))];
  }

  static tastValueHasBeenCopied() {
    return toText(printf("The value has been copied to ensure the original is not mutated by this operation or because the copy is implicit when returning a struct from a member and another member is then accessed"));
  }

  static tastRecursiveValuesMayNotBeInConstructionOfTuple() {
    return [259, toText(printf("Recursively defined values cannot appear directly as part of the construction of a tuple value within a recursive binding"))];
  }

  static tastRecursiveValuesMayNotAppearInConstructionOfType(a0) {
    return [260, toText(printf("Recursive values cannot appear directly as a construction of the type '%s' within a recursive binding. This feature has been removed from the F# language. Consider using a record instead."))(a0)];
  }

  static tastRecursiveValuesMayNotBeAssignedToNonMutableField(a0, a1) {
    return [261, toText(printf("Recursive values cannot be directly assigned to the non-mutable field '%s' of the type '%s' within a recursive binding. Consider using a mutable field instead."))(a0, a1)];
  }

  static tastUnexpectedDecodeOfAutoOpenAttribute() {
    return toText(printf("Unexpected decode of AutoOpenAttribute"));
  }

  static tastUnexpectedDecodeOfInternalsVisibleToAttribute() {
    return toText(printf("Unexpected decode of InternalsVisibleToAttribute"));
  }

  static tastUnexpectedDecodeOfInterfaceDataVersionAttribute() {
    return toText(printf("Unexpected decode of InterfaceDataVersionAttribute"));
  }

  static tastActivePatternsLimitedToSeven() {
    return [265, toText(printf("Active patterns cannot return more than 7 possibilities"))];
  }

  static tastNotAConstantExpression() {
    return [267, toText(printf("This is not a valid constant expression or custom attribute value"))];
  }

  static ValueNotContainedMutabilityAttributesDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe mutability attributes differ"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityNamesDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe names differ"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityCompiledNamesDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe compiled names differ"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityDisplayNamesDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe display names differ"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityAccessibilityMore(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe accessibility specified in the signature is more than that specified in the implementation"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityInlineFlagsDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe inline flags differ"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityLiteralConstantValuesDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe literal constant values and/or attributes differ"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityOneIsTypeFunction(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nOne is a type function and the other is not. The signature requires explicit type parameters if they are present in the implementation."))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityParameterCountsDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe respective type parameter counts differ"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityTypesDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe types differ"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityExtensionsDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nOne is an extension member and the other is not"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityArityNotInferred(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nAn arity was not inferred for this value"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityGenericParametersDiffer(a0, a1, a2, a3, a4) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe number of generic parameters in the signature and implementation differ (the signature declares %s but the implementation declares %s"))(a0, a1, a2, a3, a4);
  }

  static ValueNotContainedMutabilityGenericParametersAreDifferentKinds(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe generic parameters in the signature and implementation have different kinds. Perhaps there is a missing [<Measure>] attribute."))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityAritiesDiffer(a0, a1, a2, a3, a4, a5, a6) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe arities in the signature and implementation differ. The signature specifies that '%s' is function definition or lambda expression accepting at least %s argument(s), but the implementation is a computed function value. To declare that a computed function value is a permitted implementation simply parenthesize its type in the signature, e.g.\n\tval %s: int -> (int -> int)\ninstead of\n\tval %s: int -> int -> int."))(a0, a1, a2, a3, a4, a5, a6);
  }

  static ValueNotContainedMutabilityDotNetNamesDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe CLI member names differ"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityStaticsDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nOne is static and the other isn't"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityVirtualsDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nOne is virtual and the other isn't"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityAbstractsDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nOne is abstract and the other isn't"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityFinalsDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nOne is final and the other isn't"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityOverridesDiffer(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nOne is marked as an override and the other isn't"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityOneIsConstructor(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nOne is a constructor/property and the other is not"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityStaticButInstance(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe compiled representation of this method is as a static member but the signature indicates its compiled representation is as an instance member"))(a0, a1, a2);
  }

  static ValueNotContainedMutabilityInstanceButStatic(a0, a1, a2) {
    return toText(printf("Module '%s' contains\n    %s    \nbut its signature specifies\n    %s    \nThe compiled representation of this method is as an instance member, but the signature indicates its compiled representation is as a static member"))(a0, a1, a2);
  }

  static DefinitionsInSigAndImplNotCompatibleNamesDiffer(a0, a1, a2) {
    return [290, toText(printf("The %s definitions in the signature and implementation are not compatible because the names differ. The type is called '%s' in the signature file but '%s' in implementation."))(a0, a1, a2)];
  }

  static DefinitionsInSigAndImplNotCompatibleParameterCountsDiffer(a0, a1) {
    return [291, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the respective type parameter counts differ"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleAccessibilityDiffer(a0, a1) {
    return [292, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the accessibility specified in the signature is more than that specified in the implementation"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleMissingInterface(a0, a1, a2) {
    return [293, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the signature requires that the type supports the interface %s but the interface has not been implemented"))(a0, a1, a2)];
  }

  static DefinitionsInSigAndImplNotCompatibleImplementationSaysNull(a0, a1) {
    return [294, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the implementation says this type may use nulls as a representation but the signature does not"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleImplementationSaysNull2(a0, a1) {
    return [294, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the implementation says this type may use nulls as an extra value but the signature does not"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleSignatureSaysNull(a0, a1) {
    return [295, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the signature says this type may use nulls as a representation but the implementation does not"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleSignatureSaysNull2(a0, a1) {
    return [295, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the signature says this type may use nulls as an extra value but the implementation does not"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleImplementationSealed(a0, a1) {
    return [296, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the implementation type is sealed but the signature implies it is not. Consider adding the [<Sealed>] attribute to the signature."))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleImplementationIsNotSealed(a0, a1) {
    return [297, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the implementation type is not sealed but signature implies it is. Consider adding the [<Sealed>] attribute to the implementation."))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleImplementationIsAbstract(a0, a1) {
    return [298, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the implementation is an abstract class but the signature is not. Consider adding the [<AbstractClass>] attribute to the signature."))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleSignatureIsAbstract(a0, a1) {
    return [299, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the signature is an abstract class but the implementation is not. Consider adding the [<AbstractClass>] attribute to the implementation."))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleTypesHaveDifferentBaseTypes(a0, a1) {
    return [300, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the types have different base types"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleNumbersDiffer(a0, a1, a2) {
    return [301, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the number of %ss differ"))(a0, a1, a2)];
  }

  static DefinitionsInSigAndImplNotCompatibleSignatureDefinesButImplDoesNot(a0, a1, a2, a3) {
    return [302, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the signature defines the %s '%s' but the implementation does not (or does, but not in the same order)"))(a0, a1, a2, a3)];
  }

  static DefinitionsInSigAndImplNotCompatibleImplDefinesButSignatureDoesNot(a0, a1, a2, a3) {
    return [303, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the implementation defines the %s '%s' but the signature does not (or does, but not in the same order)"))(a0, a1, a2, a3)];
  }

  static DefinitionsInSigAndImplNotCompatibleImplDefinesStruct(a0, a1) {
    return [304, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the implementation defines a struct but the signature defines a type with a hidden representation"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleDotNetTypeRepresentationIsHidden(a0, a1) {
    return [305, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because a CLI type representation is being hidden by a signature"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleTypeIsHidden(a0, a1) {
    return [306, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because a type representation is being hidden by a signature"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleTypeIsDifferentKind(a0, a1) {
    return [307, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the types are of different kinds"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleILDiffer(a0, a1) {
    return [308, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the IL representations differ"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleRepresentationsDiffer(a0, a1) {
    return [309, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the representations differ"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleFieldWasPresent(a0, a1, a2) {
    return [311, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the field %s was present in the implementation but not in the signature"))(a0, a1, a2)];
  }

  static DefinitionsInSigAndImplNotCompatibleFieldOrderDiffer(a0, a1) {
    return [312, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the order of the fields is different in the signature and implementation"))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleFieldRequiredButNotSpecified(a0, a1, a2) {
    return [313, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the field %s was required by the signature but was not specified by the implementation"))(a0, a1, a2)];
  }

  static DefinitionsInSigAndImplNotCompatibleFieldIsInImplButNotSig(a0, a1, a2) {
    return [314, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the field '%s' was present in the implementation but not in the signature. Struct types must now reveal their fields in the signature for the type, though the fields may still be labelled 'private' or 'internal'."))(a0, a1, a2)];
  }

  static DefinitionsInSigAndImplNotCompatibleAbstractMemberMissingInImpl(a0, a1, a2) {
    return [315, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the abstract member '%s' was required by the signature but was not specified by the implementation"))(a0, a1, a2)];
  }

  static DefinitionsInSigAndImplNotCompatibleAbstractMemberMissingInSig(a0, a1, a2) {
    return [316, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the abstract member '%s' was present in the implementation but not in the signature"))(a0, a1, a2)];
  }

  static DefinitionsInSigAndImplNotCompatibleSignatureDeclaresDiffer(a0, a1, a2, a3) {
    return [317, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the signature declares a %s while the implementation declares a %s"))(a0, a1, a2, a3)];
  }

  static DefinitionsInSigAndImplNotCompatibleAbbreviationsDiffer(a0, a1, a2, a3) {
    return [318, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the abbreviations differ: %s versus %s"))(a0, a1, a2, a3)];
  }

  static DefinitionsInSigAndImplNotCompatibleAbbreviationHiddenBySig(a0, a1) {
    return [319, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because an abbreviation is being hidden by a signature. The abbreviation must be visible to other CLI languages. Consider making the abbreviation visible in the signature."))(a0, a1)];
  }

  static DefinitionsInSigAndImplNotCompatibleSigHasAbbreviation(a0, a1) {
    return [320, toText(printf("The %s definitions for type '%s' in the signature and implementation are not compatible because the signature has an abbreviation while the implementation does not"))(a0, a1)];
  }

  static ModuleContainsConstructorButNamesDiffer(a0, a1) {
    return toText(printf("The module contains the constructor\n    %s    \nbut its signature specifies\n    %s    \nThe names differ"))(a0, a1);
  }

  static ModuleContainsConstructorButDataFieldsDiffer(a0, a1) {
    return toText(printf("The module contains the constructor\n    %s    \nbut its signature specifies\n    %s    \nThe respective number of data fields differ"))(a0, a1);
  }

  static ModuleContainsConstructorButTypesOfFieldsDiffer(a0, a1) {
    return toText(printf("The module contains the constructor\n    %s    \nbut its signature specifies\n    %s    \nThe types of the fields differ"))(a0, a1);
  }

  static ModuleContainsConstructorButAccessibilityDiffers(a0, a1) {
    return toText(printf("The module contains the constructor\n    %s    \nbut its signature specifies\n    %s    \nthe accessibility specified in the signature is more than that specified in the implementation"))(a0, a1);
  }

  static FieldNotContainedNamesDiffer(a0, a1) {
    return toText(printf("The module contains the field\n    %s    \nbut its signature specifies\n    %s    \nThe names differ"))(a0, a1);
  }

  static FieldNotContainedAccessibilitiesDiffer(a0, a1) {
    return toText(printf("The module contains the field\n    %s    \nbut its signature specifies\n    %s    \nthe accessibility specified in the signature is more than that specified in the implementation"))(a0, a1);
  }

  static FieldNotContainedStaticsDiffer(a0, a1) {
    return toText(printf("The module contains the field\n    %s    \nbut its signature specifies\n    %s    \nThe 'static' modifiers differ"))(a0, a1);
  }

  static FieldNotContainedMutablesDiffer(a0, a1) {
    return toText(printf("The module contains the field\n    %s    \nbut its signature specifies\n    %s    \nThe 'mutable' modifiers differ"))(a0, a1);
  }

  static FieldNotContainedLiteralsDiffer(a0, a1) {
    return toText(printf("The module contains the field\n    %s    \nbut its signature specifies\n    %s    \nThe 'literal' modifiers differ"))(a0, a1);
  }

  static FieldNotContainedTypesDiffer(a0, a1) {
    return toText(printf("The module contains the field\n    %s    \nbut its signature specifies\n    %s    \nThe types differ"))(a0, a1);
  }

  static typrelCannotResolveImplicitGenericInstantiation(a0, a1) {
    return [331, toText(printf("The implicit instantiation of a generic construct at or near this point could not be resolved because it could resolve to multiple unrelated types, e.g. '%s' and '%s'. Consider using type annotations to resolve the ambiguity"))(a0, a1)];
  }

  static typrelCannotResolveAmbiguityInPrintf() {
    return [333, toText(printf("Could not resolve the ambiguity inherent in the use of a 'printf'-style format string"))];
  }

  static typrelCannotResolveAmbiguityInEnum() {
    return [334, toText(printf("Could not resolve the ambiguity in the use of a generic construct with an 'enum' constraint at or near this position"))];
  }

  static typrelCannotResolveAmbiguityInDelegate() {
    return [335, toText(printf("Could not resolve the ambiguity in the use of a generic construct with a 'delegate' constraint at or near this position"))];
  }

  static typrelInvalidValue() {
    return [337, toText(printf("Invalid value"))];
  }

  static typrelSigImplNotCompatibleParamCountsDiffer() {
    return [338, toText(printf("The signature and implementation are not compatible because the respective type parameter counts differ"))];
  }

  static typrelSigImplNotCompatibleCompileTimeRequirementsDiffer() {
    return [339, toText(printf("The signature and implementation are not compatible because the type parameter in the class/signature has a different compile-time requirement to the one in the member/implementation"))];
  }

  static typrelSigImplNotCompatibleConstraintsDiffer(a0, a1) {
    return [340, toText(printf("The signature and implementation are not compatible because the declaration of the type parameter '%s' requires a constraint of the form %s"))(a0, a1)];
  }

  static typrelSigImplNotCompatibleConstraintsDifferRemove(a0, a1) {
    return [341, toText(printf("The signature and implementation are not compatible because the type parameter '%s' has a constraint of the form %s but the implementation does not. Either remove this constraint from the signature or add it to the implementation."))(a0, a1)];
  }

  static typrelTypeImplementsIComparableShouldOverrideObjectEquals(a0) {
    return [342, toText(printf("The type '%s' implements 'System.IComparable'. Consider also adding an explicit override for 'Object.Equals'"))(a0)];
  }

  static typrelTypeImplementsIComparableDefaultObjectEqualsProvided(a0) {
    return [343, toText(printf("The type '%s' implements 'System.IComparable' explicitly but provides no corresponding override for 'Object.Equals'. An implementation of 'Object.Equals' has been automatically provided, implemented via 'System.IComparable'. Consider implementing the override 'Object.Equals' explicitly"))(a0)];
  }

  static typrelExplicitImplementationOfGetHashCodeOrEquals(a0) {
    return [344, toText(printf("The struct, record or union type '%s' has an explicit implementation of 'Object.GetHashCode' or 'Object.Equals'. You must apply the 'CustomEquality' attribute to the type"))(a0)];
  }

  static typrelExplicitImplementationOfGetHashCode(a0) {
    return [345, toText(printf("The struct, record or union type '%s' has an explicit implementation of 'Object.GetHashCode'. Consider implementing a matching override for 'Object.Equals(obj)'"))(a0)];
  }

  static typrelExplicitImplementationOfEquals(a0) {
    return [346, toText(printf("The struct, record or union type '%s' has an explicit implementation of 'Object.Equals'. Consider implementing a matching override for 'Object.GetHashCode()'"))(a0)];
  }

  static ExceptionDefsNotCompatibleHiddenBySignature(a0, a1) {
    return toText(printf("The exception definitions are not compatible because a CLI exception mapping is being hidden by a signature. The exception mapping must be visible to other modules. The module contains the exception definition\n    %s    \nbut its signature specifies\n\t%s"))(a0, a1);
  }

  static ExceptionDefsNotCompatibleDotNetRepresentationsDiffer(a0, a1) {
    return toText(printf("The exception definitions are not compatible because the CLI representations differ. The module contains the exception definition\n    %s    \nbut its signature specifies\n\t%s"))(a0, a1);
  }

  static ExceptionDefsNotCompatibleAbbreviationHiddenBySignature(a0, a1) {
    return toText(printf("The exception definitions are not compatible because the exception abbreviation is being hidden by the signature. The abbreviation must be visible to other CLI languages. Consider making the abbreviation visible in the signature. The module contains the exception definition\n    %s    \nbut its signature specifies\n\t%s."))(a0, a1);
  }

  static ExceptionDefsNotCompatibleSignaturesDiffer(a0, a1) {
    return toText(printf("The exception definitions are not compatible because the exception abbreviations in the signature and implementation differ. The module contains the exception definition\n    %s    \nbut its signature specifies\n\t%s."))(a0, a1);
  }

  static ExceptionDefsNotCompatibleExceptionDeclarationsDiffer(a0, a1) {
    return toText(printf("The exception definitions are not compatible because the exception declarations differ. The module contains the exception definition\n    %s    \nbut its signature specifies\n\t%s."))(a0, a1);
  }

  static ExceptionDefsNotCompatibleFieldInSigButNotImpl(a0, a1, a2) {
    return toText(printf("The exception definitions are not compatible because the field '%s' was required by the signature but was not specified by the implementation. The module contains the exception definition\n    %s    \nbut its signature specifies\n\t%s."))(a0, a1, a2);
  }

  static ExceptionDefsNotCompatibleFieldInImplButNotSig(a0, a1, a2) {
    return toText(printf("The exception definitions are not compatible because the field '%s' was present in the implementation but not in the signature. The module contains the exception definition\n    %s    \nbut its signature specifies\n\t%s."))(a0, a1, a2);
  }

  static ExceptionDefsNotCompatibleFieldOrderDiffers(a0, a1) {
    return toText(printf("The exception definitions are not compatible because the order of the fields is different in the signature and implementation. The module contains the exception definition\n    %s    \nbut its signature specifies\n\t%s."))(a0, a1);
  }

  static typrelModuleNamespaceAttributesDifferInSigAndImpl() {
    return [355, toText(printf("The namespace or module attributes differ between signature and implementation"))];
  }

  static typrelMethodIsOverconstrained() {
    return [356, toText(printf("This method is over-constrained in its type parameters"))];
  }

  static typrelOverloadNotFound(a0, a1) {
    return [357, toText(printf("No implementations of '%s' had the correct number of arguments and type parameters. The required signature is '%s'."))(a0, a1)];
  }

  static typrelOverrideWasAmbiguous(a0) {
    return [358, toText(printf("The override for '%s' was ambiguous"))(a0)];
  }

  static typrelMoreThenOneOverride(a0) {
    return [359, toText(printf("More than one override implements '%s'"))(a0)];
  }

  static typrelMethodIsSealed(a0) {
    return [360, toText(printf("The method '%s' is sealed and cannot be overridden"))(a0)];
  }

  static typrelOverrideImplementsMoreThenOneSlot(a0, a1, a2) {
    return [361, toText(printf("The override '%s' implements more than one abstract slot, e.g. '%s' and '%s'"))(a0, a1, a2)];
  }

  static typrelDuplicateInterface() {
    return [362, toText(printf("Duplicate or redundant interface"))];
  }

  static typrelNeedExplicitImplementation(a0) {
    return [363, toText(printf("The interface '%s' is included in multiple explicitly implemented interface types. Add an explicit implementation of this interface."))(a0)];
  }

  static typrelNamedArgumentHasBeenAssignedMoreThenOnce() {
    return [364, toText(printf("A named argument has been assigned more than one value"))];
  }

  static typrelNoImplementationGiven(a0) {
    return [365, toText(printf("No implementation was given for '%s'"))(a0)];
  }

  static typrelNoImplementationGivenWithSuggestion(a0) {
    return [366, toText(printf("No implementation was given for '%s'. Note that all interface members must be implemented and listed under an appropriate 'interface' declaration, e.g. 'interface ... with member ...'."))(a0)];
  }

  static typrelMemberDoesNotHaveCorrectNumberOfArguments(a0, a1) {
    return [367, toText(printf("The member '%s' does not have the correct number of arguments. The required signature is '%s'."))(a0, a1)];
  }

  static typrelMemberDoesNotHaveCorrectNumberOfTypeParameters(a0, a1) {
    return [368, toText(printf("The member '%s' does not have the correct number of method type parameters. The required signature is '%s'."))(a0, a1)];
  }

  static typrelMemberDoesNotHaveCorrectKindsOfGenericParameters(a0, a1) {
    return [369, toText(printf("The member '%s' does not have the correct kinds of generic parameters. The required signature is '%s'."))(a0, a1)];
  }

  static typrelMemberCannotImplement(a0, a1, a2) {
    return [370, toText(printf("The member '%s' cannot be used to implement '%s'. The required signature is '%s'."))(a0, a1, a2)];
  }

  static astParseEmbeddedILError() {
    return [371, toText(printf("Error while parsing embedded IL"))];
  }

  static astParseEmbeddedILTypeError() {
    return [372, toText(printf("Error while parsing embedded IL type"))];
  }

  static astDeprecatedIndexerNotation() {
    return toText(printf("This indexer notation has been removed from the F# language"));
  }

  static astInvalidExprLeftHandOfAssignment() {
    return [374, toText(printf("Invalid expression on left of assignment"))];
  }

  static augNoRefEqualsOnStruct() {
    return [376, toText(printf("The 'ReferenceEquality' attribute cannot be used on structs. Consider using the 'StructuralEquality' attribute instead, or implement an override for 'System.Object.Equals(obj)'."))];
  }

  static augInvalidAttrs() {
    return [377, toText(printf("This type uses an invalid mix of the attributes 'NoEquality', 'ReferenceEquality', 'StructuralEquality', 'NoComparison' and 'StructuralComparison'"))];
  }

  static augNoEqualityNeedsNoComparison() {
    return [378, toText(printf("The 'NoEquality' attribute must be used in conjunction with the 'NoComparison' attribute"))];
  }

  static augStructCompNeedsStructEquality() {
    return [379, toText(printf("The 'StructuralComparison' attribute must be used in conjunction with the 'StructuralEquality' attribute"))];
  }

  static augStructEqNeedsNoCompOrStructComp() {
    return [380, toText(printf("The 'StructuralEquality' attribute must be used in conjunction with the 'NoComparison' or 'StructuralComparison' attributes"))];
  }

  static augTypeCantHaveRefEqAndStructAttrs() {
    return [381, toText(printf("A type cannot have both the 'ReferenceEquality' and 'StructuralEquality' or 'StructuralComparison' attributes"))];
  }

  static augOnlyCertainTypesCanHaveAttrs() {
    return [382, toText(printf("Only record, union, exception and struct types may be augmented with the 'ReferenceEquality', 'StructuralEquality' and 'StructuralComparison' attributes"))];
  }

  static augRefEqCantHaveObjEquals() {
    return [383, toText(printf("A type with attribute 'ReferenceEquality' cannot have an explicit implementation of 'Object.Equals(obj)', 'System.IEquatable<_>' or 'System.Collections.IStructuralEquatable'"))];
  }

  static augCustomEqNeedsObjEquals() {
    return [384, toText(printf("A type with attribute 'CustomEquality' must have an explicit implementation of at least one of 'Object.Equals(obj)', 'System.IEquatable<_>' or 'System.Collections.IStructuralEquatable'"))];
  }

  static augCustomCompareNeedsIComp() {
    return [385, toText(printf("A type with attribute 'CustomComparison' must have an explicit implementation of at least one of 'System.IComparable' or 'System.Collections.IStructuralComparable'"))];
  }

  static augNoEqNeedsNoObjEquals() {
    return [386, toText(printf("A type with attribute 'NoEquality' should not usually have an explicit implementation of 'Object.Equals(obj)'. Disable this warning if this is intentional for interoperability purposes"))];
  }

  static augNoCompCantImpIComp() {
    return [386, toText(printf("A type with attribute 'NoComparison' should not usually have an explicit implementation of 'System.IComparable', 'System.IComparable<_>' or 'System.Collections.IStructuralComparable'. Disable this warning if this is intentional for interoperability purposes"))];
  }

  static augCustomEqNeedsNoCompOrCustomComp() {
    return [387, toText(printf("The 'CustomEquality' attribute must be used in conjunction with the 'NoComparison' or 'CustomComparison' attributes"))];
  }

  static forPositionalSpecifiersNotPermitted() {
    return toText(printf("Positional specifiers are not permitted in format strings"));
  }

  static forMissingFormatSpecifier() {
    return toText(printf("Missing format specifier"));
  }

  static forFlagSetTwice(a0) {
    return toText(printf("'%s' flag set twice"))(a0);
  }

  static forPrefixFlagSpacePlusSetTwice() {
    return toText(printf("Prefix flag (' ' or '+') set twice"));
  }

  static forHashSpecifierIsInvalid() {
    return toText(printf("The # formatting modifier is invalid in F#"));
  }

  static forBadPrecision() {
    return toText(printf("Bad precision in format specifier"));
  }

  static forBadWidth() {
    return toText(printf("Bad width in format specifier"));
  }

  static forDoesNotSupportZeroFlag(a0) {
    return toText(printf("'%s' format does not support '0' flag"))(a0);
  }

  static forPrecisionMissingAfterDot() {
    return toText(printf("Precision missing after the '.'"));
  }

  static forFormatDoesntSupportPrecision(a0) {
    return toText(printf("'%s' format does not support precision"))(a0);
  }

  static forBadFormatSpecifier() {
    return toText(printf("Bad format specifier (after l or L): Expected ld,li,lo,lu,lx or lX. In F# code you can use %%d, %%x, %%o or %%u instead, which are overloaded to work with all basic integer types."));
  }

  static forLIsUnnecessary() {
    return toText(printf("The 'l' or 'L' in this format specifier is unnecessary. In F# code you can use %%d, %%x, %%o or %%u instead, which are overloaded to work with all basic integer types."));
  }

  static forHIsUnnecessary() {
    return toText(printf("The 'h' or 'H' in this format specifier is unnecessary. You can use %%d, %%x, %%o or %%u instead, which are overloaded to work with all basic integer types."));
  }

  static forDoesNotSupportPrefixFlag(a0, a1) {
    return toText(printf("'%s' does not support prefix '%s' flag"))(a0, a1);
  }

  static forBadFormatSpecifierGeneral(a0) {
    return toText(printf("Bad format specifier: '%s'"))(a0);
  }

  static elSysEnvExitDidntExit() {
    return toText(printf("System.Environment.Exit did not exit"));
  }

  static elDeprecatedOperator() {
    return toText(printf("The treatment of this operator is now handled directly by the F# compiler and its meaning cannot be redefined"));
  }

  static chkProtectedOrBaseCalled() {
    return [405, toText(printf("A protected member is called or 'base' is being used. This is only allowed in the direct implementation of members since they could escape their object scope."))];
  }

  static chkByrefUsedInInvalidWay(a0) {
    return [406, toText(printf("The byref-typed variable '%s' is used in an invalid way. Byrefs cannot be captured by closures or passed to inner functions."))(a0)];
  }

  static chkBaseUsedInInvalidWay() {
    return [408, toText(printf("The 'base' keyword is used in an invalid way. Base calls cannot be used in closures. Consider using a private member to make base calls."))];
  }

  static chkVariableUsedInInvalidWay(a0) {
    return toText(printf("The variable '%s' is used in an invalid way"))(a0);
  }

  static chkTypeLessAccessibleThanType(a0, a1) {
    return [410, toText(printf("The type '%s' is less accessible than the value, member or type '%s' it is used in."))(a0, a1)];
  }

  static chkSystemVoidOnlyInTypeof() {
    return [411, toText(printf("'System.Void' can only be used as 'typeof<System.Void>' in F#"))];
  }

  static chkErrorUseOfByref() {
    return [412, toText(printf("A type instantiation involves a byref type. This is not permitted by the rules of Common IL."))];
  }

  static chkErrorContainsCallToRethrow() {
    return [413, toText(printf("Calls to 'reraise' may only occur directly in a handler of a try-with"))];
  }

  static chkSplicingOnlyInQuotations() {
    return [414, toText(printf("Expression-splicing operators may only be used within quotations"))];
  }

  static chkNoFirstClassSplicing() {
    return [415, toText(printf("First-class uses of the expression-splicing operator are not permitted"))];
  }

  static chkNoFirstClassAddressOf() {
    return [416, toText(printf("First-class uses of the address-of operators are not permitted"))];
  }

  static chkNoFirstClassRethrow() {
    return [417, toText(printf("First-class uses of the 'reraise' function is not permitted"))];
  }

  static chkNoByrefAtThisPoint(a0) {
    return [418, toText(printf("The byref typed value '%s' cannot be used at this point"))(a0)];
  }

  static chkLimitationsOfBaseKeyword() {
    return [419, toText(printf("'base' values may only be used to make direct calls to the base implementations of overridden members"))];
  }

  static chkObjCtorsCantUseExceptionHandling() {
    return [420, toText(printf("Object constructors cannot directly use try/with and try/finally prior to the initialization of the object. This includes constructs such as 'for x in ...' that may elaborate to uses of these constructs. This is a limitation imposed by Common IL."))];
  }

  static chkNoAddressOfAtThisPoint(a0) {
    return [421, toText(printf("The address of the variable '%s' cannot be used at this point"))(a0)];
  }

  static chkNoAddressStaticFieldAtThisPoint(a0) {
    return [422, toText(printf("The address of the static field '%s' cannot be used at this point"))(a0)];
  }

  static chkNoAddressFieldAtThisPoint(a0) {
    return [423, toText(printf("The address of the field '%s' cannot be used at this point"))(a0)];
  }

  static chkNoAddressOfArrayElementAtThisPoint() {
    return [424, toText(printf("The address of an array element cannot be used at this point"))];
  }

  static chkFirstClassFuncNoByref() {
    return [425, toText(printf("The type of a first-class function cannot contain byrefs"))];
  }

  static chkReturnTypeNoByref() {
    return [426, toText(printf("A method return type would contain byrefs which is not permitted"))];
  }

  static chkInvalidCustAttrVal() {
    return [428, toText(printf("Invalid custom attribute value (not a constant or literal)"))];
  }

  static chkAttrHasAllowMultiFalse(a0) {
    return [429, toText(printf("The attribute type '%s' has 'AllowMultiple=false'. Multiple instances of this attribute cannot be attached to a single language element."))(a0)];
  }

  static chkMemberUsedInInvalidWay(a0, a1, a2) {
    return [430, toText(printf("The member '%s' is used in an invalid way. A use of '%s' has been inferred prior to its definition at or near '%s'. This is an invalid forward reference."))(a0, a1, a2)];
  }

  static chkNoByrefAsTopValue() {
    return [431, toText(printf("A byref typed value would be stored here. Top-level let-bound byref values are not permitted."))];
  }

  static chkReflectedDefCantSplice() {
    return [432, toText(printf("[<ReflectedDefinition>] terms cannot contain uses of the prefix splice operator '%%'"))];
  }

  static chkEntryPointUsage() {
    return [433, toText(printf("A function labeled with the 'EntryPointAttribute' attribute must be the last declaration in the last file in the compilation sequence."))];
  }

  static chkUnionCaseCompiledForm() {
    return toText(printf("compiled form of the union case"));
  }

  static chkUnionCaseDefaultAugmentation() {
    return toText(printf("default augmentation of the union case"));
  }

  static chkPropertySameNameMethod(a0, a1) {
    return [434, toText(printf("The property '%s' has the same name as a method in type '%s'."))(a0, a1)];
  }

  static chkGetterSetterDoNotMatchAbstract(a0, a1) {
    return [435, toText(printf("The property '%s' of type '%s' has a getter and a setter that do not match. If one is abstract then the other must be as well."))(a0, a1)];
  }

  static chkPropertySameNameIndexer(a0, a1) {
    return [436, toText(printf("The property '%s' has the same name as another property in type '%s', but one takes indexer arguments and the other does not. You may be missing an indexer argument to one of your properties."))(a0, a1)];
  }

  static chkCantStoreByrefValue() {
    return [437, toText(printf("A type would store a byref typed value. This is not permitted by Common IL."))];
  }

  static chkDuplicateMethod(a0, a1) {
    return [438, toText(printf("Duplicate method. The method '%s' has the same name and signature as another method in type '%s'."))(a0, a1)];
  }

  static chkDuplicateMethodWithSuffix(a0, a1) {
    return [438, toText(printf("Duplicate method. The method '%s' has the same name and signature as another method in type '%s' once tuples, functions, units of measure and/or provided types are erased."))(a0, a1)];
  }

  static chkDuplicateMethodCurried(a0, a1) {
    return [439, toText(printf("The method '%s' has curried arguments but has the same name as another method in type '%s'. Methods with curried arguments cannot be overloaded. Consider using a method taking tupled arguments."))(a0, a1)];
  }

  static chkCurriedMethodsCantHaveOutParams() {
    return [440, toText(printf("Methods with curried arguments cannot declare 'out', 'ParamArray', 'optional', 'ReflectedDefinition', 'byref', 'CallerLineNumber', 'CallerMemberName', or 'CallerFilePath' arguments"))];
  }

  static chkDuplicateProperty(a0, a1) {
    return [441, toText(printf("Duplicate property. The property '%s' has the same name and signature as another property in type '%s'."))(a0, a1)];
  }

  static chkDuplicatePropertyWithSuffix(a0, a1) {
    return [441, toText(printf("Duplicate property. The property '%s' has the same name and signature as another property in type '%s' once tuples, functions, units of measure and/or provided types are erased."))(a0, a1)];
  }

  static chkDuplicateMethodInheritedType(a0) {
    return [442, toText(printf("Duplicate method. The abstract method '%s' has the same name and signature as an abstract method in an inherited type."))(a0)];
  }

  static chkDuplicateMethodInheritedTypeWithSuffix(a0) {
    return [442, toText(printf("Duplicate method. The abstract method '%s' has the same name and signature as an abstract method in an inherited type once tuples, functions, units of measure and/or provided types are erased."))(a0)];
  }

  static chkMultipleGenericInterfaceInstantiations(a0, a1) {
    return [443, toText(printf("This type implements the same interface at different generic instantiations '%s' and '%s'. This is not permitted in this version of F#."))(a0, a1)];
  }

  static chkValueWithDefaultValueMustHaveDefaultValue() {
    return [444, toText(printf("The type of a field using the 'DefaultValue' attribute must admit default initialization, i.e. have 'null' as a proper value or be a struct type whose fields all admit default initialization. You can use 'DefaultValue(false)' to disable this check"))];
  }

  static chkNoByrefInTypeAbbrev() {
    return [445, toText(printf("The type abbreviation contains byrefs. This is not permitted by F#."))];
  }

  static crefBoundVarUsedInSplice(a0) {
    return [446, toText(printf("The variable '%s' is bound in a quotation but is used as part of a spliced expression. This is not permitted since it may escape its scope."))(a0)];
  }

  static crefQuotationsCantContainGenericExprs() {
    return [447, toText(printf("Quotations cannot contain uses of generic expressions"))];
  }

  static crefQuotationsCantContainGenericFunctions() {
    return [448, toText(printf("Quotations cannot contain function definitions that are inferred or declared to be generic. Consider adding some type constraints to make this a valid quoted expression."))];
  }

  static crefQuotationsCantContainObjExprs() {
    return [449, toText(printf("Quotations cannot contain object expressions"))];
  }

  static crefQuotationsCantContainAddressOf() {
    return [450, toText(printf("Quotations cannot contain expressions that take the address of a field"))];
  }

  static crefQuotationsCantContainStaticFieldRef() {
    return [451, toText(printf("Quotations cannot contain expressions that fetch static fields"))];
  }

  static crefQuotationsCantContainInlineIL() {
    return [452, toText(printf("Quotations cannot contain inline assembly code or pattern matching on arrays"))];
  }

  static crefQuotationsCantContainDescendingForLoops() {
    return [453, toText(printf("Quotations cannot contain descending for loops"))];
  }

  static crefQuotationsCantFetchUnionIndexes() {
    return [454, toText(printf("Quotations cannot contain expressions that fetch union case indexes"))];
  }

  static crefQuotationsCantSetUnionFields() {
    return [455, toText(printf("Quotations cannot contain expressions that set union case fields"))];
  }

  static crefQuotationsCantSetExceptionFields() {
    return [456, toText(printf("Quotations cannot contain expressions that set fields in exception values"))];
  }

  static crefQuotationsCantRequireByref() {
    return [457, toText(printf("Quotations cannot contain expressions that require byref pointers"))];
  }

  static crefQuotationsCantCallTraitMembers() {
    return [458, toText(printf("Quotations cannot contain expressions that make member constraint calls, or uses of operators that implicitly resolve to a member constraint call"))];
  }

  static crefQuotationsCantContainThisConstant() {
    return [459, toText(printf("Quotations cannot contain this kind of constant"))];
  }

  static crefQuotationsCantContainThisPatternMatch() {
    return [460, toText(printf("Quotations cannot contain this kind of pattern match"))];
  }

  static crefQuotationsCantContainArrayPatternMatching() {
    return [461, toText(printf("Quotations cannot contain array pattern matching"))];
  }

  static crefQuotationsCantContainThisType() {
    return [462, toText(printf("Quotations cannot contain this kind of type"))];
  }

  static csTypeCannotBeResolvedAtCompileTime(a0) {
    return toText(printf("The declared type parameter '%s' cannot be used here since the type parameter cannot be resolved at compile time"))(a0);
  }

  static csCodeLessGeneric() {
    return [464, toText(printf("This code is less generic than indicated by its annotations. A unit-of-measure specified using '_' has been determined to be '1', i.e. dimensionless. Consider making the code generic, or removing the use of '_'."))];
  }

  static csTypeInferenceMaxDepth() {
    return [465, toText(printf("Type inference problem too complicated (maximum iteration depth reached). Consider adding further type annotations."))];
  }

  static csExpectedArguments() {
    return toText(printf("Expected arguments to an instance member"));
  }

  static csIndexArgumentMismatch(a0, a1) {
    return toText(printf("This indexer expects %d arguments but is here given %d"))(a0, a1);
  }

  static csExpectTypeWithOperatorButGivenFunction(a0) {
    return toText(printf("Expecting a type supporting the operator '%s' but given a function type. You may be missing an argument to a function."))(a0);
  }

  static csExpectTypeWithOperatorButGivenTuple(a0) {
    return toText(printf("Expecting a type supporting the operator '%s' but given a tuple type"))(a0);
  }

  static csTypesDoNotSupportOperator(a0, a1) {
    return toText(printf("None of the types '%s' support the operator '%s'"))(a0, a1);
  }

  static csTypeDoesNotSupportOperator(a0, a1) {
    return toText(printf("The type '%s' does not support the operator '%s'"))(a0, a1);
  }

  static csTypesDoNotSupportOperatorNullable(a0, a1) {
    return toText(printf("None of the types '%s' support the operator '%s'. Consider opening the module 'Microsoft.FSharp.Linq.NullableOperators'."))(a0, a1);
  }

  static csTypeDoesNotSupportOperatorNullable(a0, a1) {
    return toText(printf("The type '%s' does not support the operator '%s'. Consider opening the module 'Microsoft.FSharp.Linq.NullableOperators'."))(a0, a1);
  }

  static csTypeDoesNotSupportConversion(a0, a1) {
    return toText(printf("The type '%s' does not support a conversion to the type '%s'"))(a0, a1);
  }

  static csMethodFoundButIsStatic(a0, a1, a2) {
    return toText(printf("The type '%s' has a method '%s' (full name '%s'), but the method is static"))(a0, a1, a2);
  }

  static csMethodFoundButIsNotStatic(a0, a1, a2) {
    return toText(printf("The type '%s' has a method '%s' (full name '%s'), but the method is not static"))(a0, a1, a2);
  }

  static csStructConstraintInconsistent() {
    return [472, toText(printf("The constraints 'struct' and 'not struct' are inconsistent"))];
  }

  static csTypeDoesNotHaveNull(a0) {
    return toText(printf("The type '%s' does not have 'null' as a proper value"))(a0);
  }

  static csNullableTypeDoesNotHaveNull(a0) {
    return toText(printf("The type '%s' does not have 'null' as a proper value. To create a null value for a Nullable type use 'System.Nullable()'."))(a0);
  }

  static csTypeDoesNotSupportComparison1(a0) {
    return toText(printf("The type '%s' does not support the 'comparison' constraint because it has the 'NoComparison' attribute"))(a0);
  }

  static csTypeDoesNotSupportComparison2(a0) {
    return toText(printf("The type '%s' does not support the 'comparison' constraint. For example, it does not support the 'System.IComparable' interface"))(a0);
  }

  static csTypeDoesNotSupportComparison3(a0) {
    return toText(printf("The type '%s' does not support the 'comparison' constraint because it is a record, union or struct with one or more structural element types which do not support the 'comparison' constraint. Either avoid the use of comparison with this type, or add the 'StructuralComparison' attribute to the type to determine which field type does not support comparison"))(a0);
  }

  static csTypeDoesNotSupportEquality1(a0) {
    return toText(printf("The type '%s' does not support the 'equality' constraint because it has the 'NoEquality' attribute"))(a0);
  }

  static csTypeDoesNotSupportEquality2(a0) {
    return toText(printf("The type '%s' does not support the 'equality' constraint because it is a function type"))(a0);
  }

  static csTypeDoesNotSupportEquality3(a0) {
    return toText(printf("The type '%s' does not support the 'equality' constraint because it is a record, union or struct with one or more structural element types which do not support the 'equality' constraint. Either avoid the use of equality with this type, or add the 'StructuralEquality' attribute to the type to determine which field type does not support equality"))(a0);
  }

  static csTypeIsNotEnumType(a0) {
    return toText(printf("The type '%s' is not a CLI enum type"))(a0);
  }

  static csTypeHasNonStandardDelegateType(a0) {
    return toText(printf("The type '%s' has a non-standard delegate type"))(a0);
  }

  static csTypeIsNotDelegateType(a0) {
    return toText(printf("The type '%s' is not a CLI delegate type"))(a0);
  }

  static csTypeParameterCannotBeNullable() {
    return toText(printf("This type parameter cannot be instantiated to 'Nullable'. This is a restriction imposed in order to ensure the meaning of 'null' in some CLI languages is not confusing when used in conjunction with 'Nullable' values."));
  }

  static csGenericConstructRequiresStructType(a0) {
    return toText(printf("A generic construct requires that the type '%s' is a CLI or F# struct type"))(a0);
  }

  static csGenericConstructRequiresUnmanagedType(a0) {
    return toText(printf("A generic construct requires that the type '%s' is an unmanaged type"))(a0);
  }

  static csTypeNotCompatibleBecauseOfPrintf(a0, a1) {
    return toText(printf("The type '%s' is not compatible with any of the types %s, arising from the use of a printf-style format string"))(a0, a1);
  }

  static csGenericConstructRequiresReferenceSemantics(a0) {
    return toText(printf("A generic construct requires that the type '%s' have reference semantics, but it does not, i.e. it is a struct"))(a0);
  }

  static csGenericConstructRequiresNonAbstract(a0) {
    return toText(printf("A generic construct requires that the type '%s' be non-abstract"))(a0);
  }

  static csGenericConstructRequiresPublicDefaultConstructor(a0) {
    return toText(printf("A generic construct requires that the type '%s' have a public default constructor"))(a0);
  }

  static csTypeInstantiationLengthMismatch() {
    return [483, toText(printf("Type instantiation length mismatch"))];
  }

  static csOptionalArgumentNotPermittedHere() {
    return [484, toText(printf("Optional arguments not permitted here"))];
  }

  static csMemberIsNotStatic(a0) {
    return [485, toText(printf("%s is not a static member"))(a0)];
  }

  static csMemberIsNotInstance(a0) {
    return [486, toText(printf("%s is not an instance member"))(a0)];
  }

  static csArgumentLengthMismatch() {
    return [487, toText(printf("Argument length mismatch"))];
  }

  static csArgumentTypesDoNotMatch() {
    return [488, toText(printf("The argument types don't match"))];
  }

  static csMethodExpectsParams() {
    return [489, toText(printf("This method expects a CLI 'params' parameter in this position. 'params' is a way of passing a variable number of arguments to a method in languages such as C#. Consider passing an array for this argument"))];
  }

  static csMemberIsNotAccessible(a0, a1) {
    return [490, toText(printf("The member or object constructor '%s' is not %s"))(a0, a1)];
  }

  static csMemberIsNotAccessible2(a0, a1) {
    return [491, toText(printf("The member or object constructor '%s' is not %s. Private members may only be accessed from within the declaring type. Protected members may only be accessed from an extending type and cannot be accessed from inner lambda expressions."))(a0, a1)];
  }

  static csMethodIsNotAStaticMethod(a0) {
    return [492, toText(printf("%s is not a static method"))(a0)];
  }

  static csMethodIsNotAnInstanceMethod(a0) {
    return [493, toText(printf("%s is not an instance method"))(a0)];
  }

  static csMemberHasNoArgumentOrReturnProperty(a0, a1, a2) {
    return toText(printf("The member or object constructor '%s' has no argument or settable return property '%s'. %s."))(a0, a1, a2);
  }

  static csCtorHasNoArgumentOrReturnProperty(a0, a1, a2) {
    return toText(printf("The object constructor '%s' has no argument or settable return property '%s'. %s."))(a0, a1, a2);
  }

  static csRequiredSignatureIs(a0) {
    return [495, toText(printf("The required signature is %s"))(a0)];
  }

  static csMemberSignatureMismatch(a0, a1, a2) {
    return [496, toText(printf("The member or object constructor '%s' requires %d argument(s). The required signature is '%s'."))(a0, a1, a2)];
  }

  static csMemberSignatureMismatch2(a0, a1, a2) {
    return [497, toText(printf("The member or object constructor '%s' requires %d additional argument(s). The required signature is '%s'."))(a0, a1, a2)];
  }

  static csMemberSignatureMismatch3(a0, a1, a2, a3) {
    return [498, toText(printf("The member or object constructor '%s' requires %d argument(s). The required signature is '%s'. Some names for missing arguments are %s."))(a0, a1, a2, a3)];
  }

  static csMemberSignatureMismatch4(a0, a1, a2, a3) {
    return [499, toText(printf("The member or object constructor '%s' requires %d additional argument(s). The required signature is '%s'. Some names for missing arguments are %s."))(a0, a1, a2, a3)];
  }

  static csMemberSignatureMismatchArityNamed(a0, a1, a2, a3, a4) {
    return [500, toText(printf("The member or object constructor '%s' requires %d argument(s) but is here given %d unnamed and %d named argument(s). The required signature is '%s'."))(a0, a1, a2, a3, a4)];
  }

  static csMemberSignatureMismatchArity(a0, a1, a2, a3) {
    return [501, toText(printf("The member or object constructor '%s' takes %d argument(s) but is here given %d. The required signature is '%s'."))(a0, a1, a2, a3)];
  }

  static csCtorSignatureMismatchArity(a0, a1, a2, a3) {
    return [501, toText(printf("The object constructor '%s' takes %d argument(s) but is here given %d. The required signature is '%s'."))(a0, a1, a2, a3)];
  }

  static csCtorSignatureMismatchArityProp(a0, a1, a2, a3) {
    return [501, toText(printf("The object constructor '%s' takes %d argument(s) but is here given %d. The required signature is '%s'. If some of the arguments are meant to assign values to properties, consider separating those arguments with a comma (',')."))(a0, a1, a2, a3)];
  }

  static csMemberSignatureMismatchArityType(a0, a1, a2, a3) {
    return [502, toText(printf("The member or object constructor '%s' takes %d type argument(s) but is here given %d. The required signature is '%s'."))(a0, a1, a2, a3)];
  }

  static csMemberNotAccessible(a0, a1, a2, a3) {
    return [503, toText(printf("A member or object constructor '%s' taking %d arguments is not accessible from this code location. All accessible versions of method '%s' take %d arguments."))(a0, a1, a2, a3)];
  }

  static csIncorrectGenericInstantiation(a0, a1, a2) {
    return [504, toText(printf("Incorrect generic instantiation. No %s member named '%s' takes %d generic arguments."))(a0, a1, a2)];
  }

  static csMemberOverloadArityMismatch(a0, a1, a2) {
    return [505, toText(printf("The member or object constructor '%s' does not take %d argument(s). An overload was found taking %d arguments."))(a0, a1, a2)];
  }

  static csNoMemberTakesTheseArguments(a0, a1, a2) {
    return [506, toText(printf("No %s member or object constructor named '%s' takes %d arguments"))(a0, a1, a2)];
  }

  static csNoMemberTakesTheseArguments2(a0, a1, a2, a3) {
    return [507, toText(printf("No %s member or object constructor named '%s' takes %d arguments. Note the call to this member also provides %d named arguments."))(a0, a1, a2, a3)];
  }

  static csNoMemberTakesTheseArguments3(a0, a1, a2, a3) {
    return [508, toText(printf("No %s member or object constructor named '%s' takes %d arguments. The named argument '%s' doesn't correspond to any argument or settable return property for any overload."))(a0, a1, a2, a3)];
  }

  static csMethodNotFound(a0) {
    return [509, toText(printf("Method or object constructor '%s' not found"))(a0)];
  }

  static csNoOverloadsFound(a0) {
    return toText(printf("No overloads match for method '%s'."))(a0);
  }

  static csMethodIsOverloaded(a0) {
    return toText(printf("A unique overload for method '%s' could not be determined based on type information prior to this program point. A type annotation may be needed."))(a0);
  }

  static csCandidates(a0) {
    return toText(printf("Candidates: %s"))(a0);
  }

  static csSeeAvailableOverloads() {
    return toText(printf("The available overloads are shown below."));
  }

  static parsDoCannotHaveVisibilityDeclarations(a0) {
    return [512, toText(printf("Accessibility modifiers are not permitted on 'do' bindings, but '%s' was given."))(a0)];
  }

  static parsEofInHashIf() {
    return [513, toText(printf("End of file in #if section begun at or after here"))];
  }

  static parsEofInString() {
    return [514, toText(printf("End of file in string begun at or before here"))];
  }

  static parsEofInVerbatimString() {
    return [515, toText(printf("End of file in verbatim string begun at or before here"))];
  }

  static parsEofInComment() {
    return [516, toText(printf("End of file in comment begun at or before here"))];
  }

  static parsEofInStringInComment() {
    return [517, toText(printf("End of file in string embedded in comment begun at or before here"))];
  }

  static parsEofInVerbatimStringInComment() {
    return [518, toText(printf("End of file in verbatim string embedded in comment begun at or before here"))];
  }

  static parsEofInIfOcaml() {
    return [519, toText(printf("End of file in IF-OCAML section begun at or before here"))];
  }

  static parsEofInDirective() {
    return [520, toText(printf("End of file in directive begun at or before here"))];
  }

  static parsNoHashEndIfFound() {
    return [521, toText(printf("No #endif found for #if or #else"))];
  }

  static parsAttributesIgnored() {
    return [522, toText(printf("Attributes have been ignored in this construct"))];
  }

  static parsUseBindingsIllegalInImplicitClassConstructors() {
    return [523, toText(printf("'use' bindings are not permitted in primary constructors"))];
  }

  static parsUseBindingsIllegalInModules() {
    return [524, toText(printf("'use' bindings are not permitted in modules and are treated as 'let' bindings"))];
  }

  static parsIntegerForLoopRequiresSimpleIdentifier() {
    return [525, toText(printf("An integer for loop must use a simple identifier"))];
  }

  static parsOnlyOneWithAugmentationAllowed() {
    return [526, toText(printf("At most one 'with' augmentation is permitted"))];
  }

  static parsUnexpectedSemicolon() {
    return [527, toText(printf("A semicolon is not expected at this point"))];
  }

  static parsUnexpectedEndOfFile() {
    return [528, toText(printf("Unexpected end of input"))];
  }

  static parsUnexpectedVisibilityDeclaration(a0) {
    return [529, toText(printf("Accessibility modifiers are not permitted here, but '%s' was given."))(a0)];
  }

  static parsOnlyHashDirectivesAllowed() {
    return [530, toText(printf("Only '#' compiler directives may occur prior to the first 'namespace' declaration"))];
  }

  static parsVisibilityDeclarationsShouldComePriorToIdentifier() {
    return [531, toText(printf("Accessibility modifiers should come immediately prior to the identifier naming a construct"))];
  }

  static parsNamespaceOrModuleNotBoth() {
    return [532, toText(printf("Files should begin with either a namespace or module declaration, e.g. 'namespace SomeNamespace.SubNamespace' or 'module SomeNamespace.SomeModule', but not both. To define a module within a namespace use 'module SomeModule = ...'"))];
  }

  static parsModuleAbbreviationMustBeSimpleName() {
    return [534, toText(printf("A module abbreviation must be a simple name, not a path"))];
  }

  static parsIgnoreAttributesOnModuleAbbreviation() {
    return [535, toText(printf("Ignoring attributes on module abbreviation"))];
  }

  static parsIgnoreAttributesOnModuleAbbreviationAlwaysPrivate(a0) {
    return [536, toText(printf("The '%s' accessibility attribute is not allowed on module abbreviation. Module abbreviations are always private."))(a0)];
  }

  static parsIgnoreVisibilityOnModuleAbbreviationAlwaysPrivate(a0) {
    return [537, toText(printf("The '%s' visibility attribute is not allowed on module abbreviation. Module abbreviations are always private."))(a0)];
  }

  static parsUnClosedBlockInHashLight() {
    return [538, toText(printf("Unclosed block"))];
  }

  static parsUnmatchedBeginOrStruct() {
    return [539, toText(printf("Unmatched 'begin' or 'struct'"))];
  }

  static parsModuleDefnMustBeSimpleName() {
    return [541, toText(printf("A module name must be a simple name, not a path"))];
  }

  static parsUnexpectedEmptyModuleDefn() {
    return [542, toText(printf("Unexpected empty type moduleDefn list"))];
  }

  static parsAttributesMustComeBeforeVal() {
    return toText(printf("Attributes should be placed before 'val'"));
  }

  static parsAttributesAreNotPermittedOnInterfaceImplementations() {
    return [543, toText(printf("Attributes are not permitted on interface implementations"))];
  }

  static parsSyntaxError() {
    return [544, toText(printf("Syntax error"))];
  }

  static parsAugmentationsIllegalOnDelegateType() {
    return [545, toText(printf("Augmentations are not permitted on delegate type moduleDefns"))];
  }

  static parsUnmatchedClassInterfaceOrStruct() {
    return [546, toText(printf("Unmatched 'class', 'interface' or 'struct'"))];
  }

  static parsEmptyTypeDefinition() {
    return [547, toText(printf("A type definition requires one or more members or other declarations. If you intend to define an empty class, struct or interface, then use 'type ... = class end', 'interface end' or 'struct end'."))];
  }

  static parsUnmatchedWith() {
    return [550, toText(printf("Unmatched 'with' or badly formatted 'with' block"))];
  }

  static parsGetOrSetRequired() {
    return [551, toText(printf("'get', 'set' or 'get,set' required"))];
  }

  static parsOnlyClassCanTakeValueArguments() {
    return [552, toText(printf("Only class types may take value arguments"))];
  }

  static parsUnmatchedBegin() {
    return [553, toText(printf("Unmatched 'begin'"))];
  }

  static parsInvalidDeclarationSyntax() {
    return [554, toText(printf("Invalid declaration syntax"))];
  }

  static parsGetAndOrSetRequired() {
    return [555, toText(printf("'get' and/or 'set' required"))];
  }

  static parsTypeAnnotationsOnGetSet() {
    return [556, toText(printf("Type annotations on property getters and setters must be given after the 'get()' or 'set(v)', e.g. 'with get() : string = ...'"))];
  }

  static parsGetterMustHaveAtLeastOneArgument() {
    return [557, toText(printf("A getter property is expected to be a function, e.g. 'get() = ...' or 'get(index) = ...'"))];
  }

  static parsMultipleAccessibilitiesForGetSet() {
    return [558, toText(printf("Multiple accessibilities given for property getter or setter"))];
  }

  static parsSetSyntax() {
    return [559, toText(printf("Property setters must be defined using 'set value = ', 'set idx value = ' or 'set (idx1,...,idxN) value = ... '"))];
  }

  static parsInterfacesHaveSameVisibilityAsEnclosingType() {
    return [560, toText(printf("Interfaces always have the same visibility as the enclosing type"))];
  }

  static parsAccessibilityModsIllegalForAbstract() {
    return [561, toText(printf("Accessibility modifiers are not allowed on this member. Abstract slots always have the same visibility as the enclosing type."))];
  }

  static parsAttributesIllegalOnInherit() {
    return [562, toText(printf("Attributes are not permitted on 'inherit' declarations"))];
  }

  static parsVisibilityIllegalOnInherit() {
    return [563, toText(printf("Accessibility modifiers are not permitted on an 'inherits' declaration"))];
  }

  static parsInheritDeclarationsCannotHaveAsBindings() {
    return [564, toText(printf("'inherit' declarations cannot have 'as' bindings. To access members of the base class when overriding a method, the syntax 'base.SomeMember' may be used; 'base' is a keyword. Remove this 'as' binding."))];
  }

  static parsAttributesIllegalHere() {
    return [565, toText(printf("Attributes are not allowed here"))];
  }

  static parsTypeAbbreviationsCannotHaveVisibilityDeclarations() {
    return [566, toText(printf("Accessibility modifiers are not permitted in this position for type abbreviations"))];
  }

  static parsEnumTypesCannotHaveVisibilityDeclarations() {
    return [567, toText(printf("Accessibility modifiers are not permitted in this position for enum types"))];
  }

  static parsAllEnumFieldsRequireValues() {
    return [568, toText(printf("All enum fields must be given values"))];
  }

  static parsInlineAssemblyCannotHaveVisibilityDeclarations() {
    return [569, toText(printf("Accessibility modifiers are not permitted on inline assembly code types"))];
  }

  static parsUnexpectedIdentifier(a0) {
    return [571, toText(printf("Unexpected identifier: '%s'"))(a0)];
  }

  static parsUnionCasesCannotHaveVisibilityDeclarations() {
    return [572, toText(printf("Accessibility modifiers are not permitted on union cases. Use 'type U = internal ...' or 'type U = private ...' to give an accessibility to the whole representation."))];
  }

  static parsEnumFieldsCannotHaveVisibilityDeclarations() {
    return [573, toText(printf("Accessibility modifiers are not permitted on enumeration fields"))];
  }

  static parsConsiderUsingSeparateRecordType() {
    return toText(printf("Consider using a separate record type instead"));
  }

  static parsRecordFieldsCannotHaveVisibilityDeclarations() {
    return [575, toText(printf("Accessibility modifiers are not permitted on record fields. Use 'type R = internal ...' or 'type R = private ...' to give an accessibility to the whole representation."))];
  }

  static parsLetAndForNonRecBindings() {
    return [576, toText(printf("The declaration form 'let ... and ...' for non-recursive bindings is not used in F# code. Consider using a sequence of 'let' bindings"))];
  }

  static parsUnmatchedParen() {
    return [583, toText(printf("Unmatched '('"))];
  }

  static parsSuccessivePatternsShouldBeSpacedOrTupled() {
    return [584, toText(printf("Successive patterns should be separated by spaces or tupled"))];
  }

  static parsNoMatchingInForLet() {
    return [586, toText(printf("No matching 'in' found for this 'let'"))];
  }

  static parsErrorInReturnForLetIncorrectIndentation() {
    return [587, toText(printf("Error in the return expression for this 'let'. Possible incorrect indentation."))];
  }

  static parsExpectedExpressionAfterLet(a0, a1) {
    return [588, toText(printf("The block following this '%s' is unfinished. Every code block is an expression and must have a result. '%s' cannot be the final code element in a block. Consider giving this block an explicit result."))(a0, a1)];
  }

  static parsIncompleteIf() {
    return [589, toText(printf("Incomplete conditional. Expected 'if <expr> then <expr>' or 'if <expr> then <expr> else <expr>'."))];
  }

  static parsAssertIsNotFirstClassValue() {
    return [590, toText(printf("'assert' may not be used as a first class value. Use 'assert <expr>' instead."))];
  }

  static parsIdentifierExpected() {
    return [594, toText(printf("Identifier expected"))];
  }

  static parsInOrEqualExpected() {
    return [595, toText(printf("'in' or '=' expected"))];
  }

  static parsArrowUseIsLimited() {
    return [596, toText(printf("The use of '->' in sequence and computation expressions is limited to the form 'for pat in expr -> expr'. Use the syntax 'for ... in ... do ... yield...' to generate elements in more complex sequence expressions."))];
  }

  static parsSuccessiveArgsShouldBeSpacedOrTupled() {
    return [597, toText(printf("Successive arguments should be separated by spaces or tupled, and arguments involving function or method applications should be parenthesized"))];
  }

  static parsUnmatchedBracket() {
    return [598, toText(printf("Unmatched '['"))];
  }

  static parsMissingQualificationAfterDot() {
    return [599, toText(printf("Missing qualification after '.'"))];
  }

  static parsParenFormIsForML() {
    return toText(printf("In F# code you may use 'expr.[expr]'. A type annotation may be required to indicate the first expression is an array"));
  }

  static parsMismatchedQuote(a0) {
    return [601, toText(printf("Mismatched quotation, beginning with '%s'"))(a0)];
  }

  static parsUnmatched(a0) {
    return [602, toText(printf("Unmatched '%s'"))(a0)];
  }

  static parsUnmatchedBracketBar() {
    return [603, toText(printf("Unmatched '[|'"))];
  }

  static parsUnmatchedBrace() {
    return [604, toText(printf("Unmatched '{'"))];
  }

  static parsFieldBinding() {
    return [609, toText(printf("Field bindings must have the form 'id = expr;'"))];
  }

  static parsMemberIllegalInObjectImplementation() {
    return [610, toText(printf("This member is not permitted in an object implementation"))];
  }

  static parsMissingFunctionBody() {
    return [611, toText(printf("Missing function body"))];
  }

  static parsSyntaxErrorInLabeledType() {
    return [613, toText(printf("Syntax error in labelled type argument"))];
  }

  static parsUnexpectedInfixOperator() {
    return [615, toText(printf("Unexpected infix operator in type expression"))];
  }

  static parsMultiArgumentGenericTypeFormDeprecated() {
    return toText(printf("The syntax '(typ,...,typ) ident' is not used in F# code. Consider using 'ident<typ,...,typ>' instead"));
  }

  static parsInvalidLiteralInType() {
    return [618, toText(printf("Invalid literal in type"))];
  }

  static parsUnexpectedOperatorForUnitOfMeasure() {
    return [619, toText(printf("Unexpected infix operator in unit-of-measure expression. Legal operators are '*', '/' and '^'."))];
  }

  static parsUnexpectedIntegerLiteralForUnitOfMeasure() {
    return [620, toText(printf("Unexpected integer literal in unit-of-measure expression"))];
  }

  static parsUnexpectedTypeParameter() {
    return [621, toText(printf("Syntax error: unexpected type parameter specification"))];
  }

  static parsMismatchedQuotationName(a0) {
    return [622, toText(printf("Mismatched quotation operator name, beginning with '%s'"))(a0)];
  }

  static parsActivePatternCaseMustBeginWithUpperCase() {
    return [623, toText(printf("Active pattern case identifiers must begin with an uppercase letter"))];
  }

  static parsActivePatternCaseContainsPipe() {
    return [624, toText(printf("The '|' character is not permitted in active pattern case identifiers"))];
  }

  static parsIllegalDenominatorForMeasureExponent() {
    return [625, toText(printf("Denominator must not be 0 in unit-of-measure exponent"))];
  }

  static parsNoEqualShouldFollowNamespace() {
    return toText(printf("No '=' symbol should follow a 'namespace' declaration"));
  }

  static parsSyntaxModuleStructEndDeprecated() {
    return toText(printf("The syntax 'module ... = struct .. end' is not used in F# code. Consider using 'module ... = begin .. end'"));
  }

  static parsSyntaxModuleSigEndDeprecated() {
    return toText(printf("The syntax 'module ... : sig .. end' is not used in F# code. Consider using 'module ... = begin .. end'"));
  }

  static tcStaticFieldUsedWhenInstanceFieldExpected() {
    return [627, toText(printf("A static field was used where an instance field is expected"))];
  }

  static tcMethodNotAccessible(a0) {
    return [629, toText(printf("Method '%s' is not accessible from this code location"))(a0)];
  }

  static tcImplicitMeasureFollowingSlash() {
    return [632, toText(printf("Implicit product of measures following /"))];
  }

  static tcUnexpectedMeasureAnon() {
    return [633, toText(printf("Unexpected SynMeasure.Anon"))];
  }

  static tcNonZeroConstantCannotHaveGenericUnit() {
    return [634, toText(printf("Non-zero constants cannot have generic units. For generic zero, write 0.0<_>."))];
  }

  static tcSeqResultsUseYield() {
    return [635, toText(printf("In sequence expressions, results are generated using 'yield'"))];
  }

  static tcUnexpectedBigRationalConstant() {
    return toText(printf("Unexpected big rational constant"));
  }

  static tcInvalidTypeForUnitsOfMeasure() {
    return [636, toText(printf("Units-of-measure supported only on float, float32, decimal and signed integer types"))];
  }

  static tcUnexpectedConstUint16Array() {
    return toText(printf("Unexpected Const_uint16array"));
  }

  static tcUnexpectedConstByteArray() {
    return toText(printf("Unexpected Const_bytearray"));
  }

  static tcParameterRequiresName() {
    return [640, toText(printf("A parameter with attributes must also be given a name, e.g. '[<Attribute>] Name : Type'"))];
  }

  static tcReturnValuesCannotHaveNames() {
    return [641, toText(printf("Return values cannot have names"))];
  }

  static tcMemberKindPropertyGetSetNotExpected() {
    return toText(printf("MemberKind.PropertyGetSet only expected in parse trees"));
  }

  static tcNamespaceCannotContainValues() {
    return [201, toText(printf("Namespaces cannot contain values. Consider using a module to hold your value declarations."))];
  }

  static tcNamespaceCannotContainExtensionMembers() {
    return [644, toText(printf("Namespaces cannot contain extension members except in the same file and namespace declaration group where the type is defined. Consider using a module to hold declarations of extension members."))];
  }

  static tcMultipleVisibilityAttributes() {
    return [645, toText(printf("Multiple visibility attributes have been specified for this identifier"))];
  }

  static tcMultipleVisibilityAttributesWithLet() {
    return [646, toText(printf("Multiple visibility attributes have been specified for this identifier. 'let' bindings in classes are always private, as are any 'let' bindings inside expressions."))];
  }

  static tcInvalidMethodNameForRelationalOperator(a0, a1) {
    return toText(printf("The name '(%s)' should not be used as a member name. To define comparison semantics for a type, implement the 'System.IComparable' interface. If defining a static member for use from other CLI languages then use the name '%s' instead."))(a0, a1);
  }

  static tcInvalidMethodNameForEquality(a0, a1) {
    return toText(printf("The name '(%s)' should not be used as a member name. To define equality semantics for a type, override the 'Object.Equals' member. If defining a static member for use from other CLI languages then use the name '%s' instead."))(a0, a1);
  }

  static tcInvalidMemberName(a0, a1) {
    return toText(printf("The name '(%s)' should not be used as a member name. If defining a static member for use from other CLI languages then use the name '%s' instead."))(a0, a1);
  }

  static tcInvalidMemberNameFixedTypes(a0) {
    return toText(printf("The name '(%s)' should not be used as a member name because it is given a standard definition in the F# library over fixed types"))(a0);
  }

  static tcInvalidOperatorDefinitionRelational(a0) {
    return toText(printf("The '%s' operator should not normally be redefined. To define overloaded comparison semantics for a particular type, implement the 'System.IComparable' interface in the definition of that type."))(a0);
  }

  static tcInvalidOperatorDefinitionEquality(a0) {
    return toText(printf("The '%s' operator should not normally be redefined. To define equality semantics for a type, override the 'Object.Equals' member in the definition of that type."))(a0);
  }

  static tcInvalidOperatorDefinition(a0) {
    return toText(printf("The '%s' operator should not normally be redefined. Consider using a different operator name"))(a0);
  }

  static tcInvalidIndexOperatorDefinition(a0) {
    return toText(printf("The '%s' operator cannot be redefined. Consider using a different operator name"))(a0);
  }

  static tcExpectModuleOrNamespaceParent(a0) {
    return toText(printf("Expected module or namespace parent %s"))(a0);
  }

  static tcImplementsIComparableExplicitly(a0) {
    return [647, toText(printf("The struct, record or union type '%s' implements the interface 'System.IComparable' explicitly. You must apply the 'CustomComparison' attribute to the type."))(a0)];
  }

  static tcImplementsGenericIComparableExplicitly(a0) {
    return [648, toText(printf("The struct, record or union type '%s' implements the interface 'System.IComparable<_>' explicitly. You must apply the 'CustomComparison' attribute to the type, and should also provide a consistent implementation of the non-generic interface System.IComparable."))(a0)];
  }

  static tcImplementsIStructuralComparableExplicitly(a0) {
    return [649, toText(printf("The struct, record or union type '%s' implements the interface 'System.IStructuralComparable' explicitly. Apply the 'CustomComparison' attribute to the type."))(a0)];
  }

  static tcRecordFieldInconsistentTypes() {
    return [656, toText(printf("This record contains fields from inconsistent types"))];
  }

  static tcDllImportStubsCannotBeInlined() {
    return [657, toText(printf("DLLImport stubs cannot be inlined"))];
  }

  static tcStructsCanOnlyBindThisAtMemberDeclaration() {
    return [658, toText(printf("Structs may only bind a 'this' parameter at member declarations"))];
  }

  static tcUnexpectedExprAtRecInfPoint() {
    return [659, toText(printf("Unexpected expression at recursive inference point"))];
  }

  static tcLessGenericBecauseOfAnnotation(a0, a1) {
    return [660, toText(printf("This code is less generic than required by its annotations because the explicit type variable '%s' could not be generalized. It was constrained to be '%s'."))(a0, a1)];
  }

  static tcConstrainedTypeVariableCannotBeGeneralized() {
    return [661, toText(printf("One or more of the explicit class or function type variables for this binding could not be generalized, because they were constrained to other types"))];
  }

  static tcGenericParameterHasBeenConstrained(a0) {
    return [662, toText(printf("A generic type parameter has been used in a way that constrains it to always be '%s'"))(a0)];
  }

  static tcTypeParameterHasBeenConstrained(a0) {
    return [663, toText(printf("This type parameter has been used in a way that constrains it to always be '%s'"))(a0)];
  }

  static tcTypeParametersInferredAreNotStable() {
    return [664, toText(printf("The type parameters inferred for this value are not stable under the erasure of type abbreviations. This is due to the use of type abbreviations which drop or reorder type parameters, e.g. \n\ttype taggedInt<'a> = int or\n\ttype swap<'a,'b> = 'b * 'a.\nConsider declaring the type parameters for this value explicitly, e.g.\n\tlet f<'a,'b> ((x,y) : swap<'b,'a>) : swap<'a,'b> = (y,x)."))];
  }

  static tcExplicitTypeParameterInvalid() {
    return [665, toText(printf("Explicit type parameters may only be used on module or member bindings"))];
  }

  static tcOverridingMethodRequiresAllOrNoTypeParameters() {
    return [666, toText(printf("You must explicitly declare either all or no type parameters when overriding a generic abstract method"))];
  }

  static tcFieldsDoNotDetermineUniqueRecordType() {
    return [667, toText(printf("The field labels and expected type of this record expression or pattern do not uniquely determine a corresponding record type"))];
  }

  static tcFieldAppearsTwiceInRecord(a0) {
    return [668, toText(printf("The field '%s' appears twice in this record expression or pattern"))(a0)];
  }

  static tcUnknownUnion() {
    return [669, toText(printf("Unknown union case"))];
  }

  static tcNotSufficientlyGenericBecauseOfScope(a0) {
    return [670, toText(printf("This code is not sufficiently generic. The type variable %s could not be generalized because it would escape its scope."))(a0)];
  }

  static tcPropertyRequiresExplicitTypeParameters() {
    return [671, toText(printf("A property cannot have explicit type parameters. Consider using a method instead."))];
  }

  static tcConstructorCannotHaveTypeParameters() {
    return [672, toText(printf("A constructor cannot have explicit type parameters. Consider using a static construction method instead."))];
  }

  static tcInstanceMemberRequiresTarget() {
    return [673, toText(printf("This instance member needs a parameter to represent the object being invoked. Make the member static or use the notation 'member x.Member(args) = ...'."))];
  }

  static tcUnexpectedPropertyInSyntaxTree() {
    return [674, toText(printf("Unexpected source-level property specification in syntax tree"))];
  }

  static tcStaticInitializerRequiresArgument() {
    return [675, toText(printf("A static initializer requires an argument"))];
  }

  static tcObjectConstructorRequiresArgument() {
    return [676, toText(printf("An object constructor requires an argument"))];
  }

  static tcStaticMemberShouldNotHaveThis() {
    return [677, toText(printf("This static member should not have a 'this' parameter. Consider using the notation 'member Member(args) = ...'."))];
  }

  static tcExplicitStaticInitializerSyntax() {
    return [678, toText(printf("An explicit static initializer should use the syntax 'static new(args) = expr'"))];
  }

  static tcExplicitObjectConstructorSyntax() {
    return [679, toText(printf("An explicit object constructor should use the syntax 'new(args) = expr'"))];
  }

  static tcUnexpectedPropertySpec() {
    return [680, toText(printf("Unexpected source-level property specification"))];
  }

  static tcObjectExpressionFormDeprecated() {
    return toText(printf("This form of object expression is not used in F#. Use 'member this.MemberName ... = ...' to define member implementations in object expressions."));
  }

  static tcInvalidDeclaration() {
    return [682, toText(printf("Invalid declaration"))];
  }

  static tcAttributesInvalidInPatterns() {
    return [683, toText(printf("Attributes are not allowed within patterns"))];
  }

  static tcFunctionRequiresExplicitTypeArguments(a0) {
    return [685, toText(printf("The generic function '%s' must be given explicit type argument(s)"))(a0)];
  }

  static tcDoesNotAllowExplicitTypeArguments(a0) {
    return [686, toText(printf("The method or function '%s' should not be given explicit type argument(s) because it does not declare its type parameters explicitly"))(a0)];
  }

  static tcTypeParameterArityMismatch(a0, a1) {
    return [687, toText(printf("This value, type or method expects %d type parameter(s) but was given %d"))(a0, a1)];
  }

  static tcDefaultStructConstructorCall() {
    return [688, toText(printf("The default, zero-initializing constructor of a struct type may only be used if all the fields of the struct type admit default initialization"))];
  }

  static tcCouldNotFindIDisposable() {
    return toText(printf("Couldn't find Dispose on IDisposable, or it was overloaded"));
  }

  static tcNonLiteralCannotBeUsedInPattern() {
    return [689, toText(printf("This value is not a literal and cannot be used in a pattern"))];
  }

  static tcFieldIsReadonly() {
    return [690, toText(printf("This field is readonly"))];
  }

  static tcNameArgumentsMustAppearLast() {
    return [691, toText(printf("Named arguments must appear after all other arguments"))];
  }

  static tcFunctionRequiresExplicitLambda(a0) {
    return [692, toText(printf("This function value is being used to construct a delegate type whose signature includes a byref argument. You must use an explicit lambda expression taking %d arguments."))(a0)];
  }

  static tcTypeCannotBeEnumerated(a0) {
    return [693, toText(printf("The type '%s' is not a type whose values can be enumerated with this syntax, i.e. is not compatible with either seq<_>, IEnumerable<_> or IEnumerable and does not have a GetEnumerator method"))(a0)];
  }

  static tcInvalidMixtureOfRecursiveForms() {
    return [695, toText(printf("This recursive binding uses an invalid mixture of recursive forms"))];
  }

  static tcInvalidObjectConstructionExpression() {
    return [696, toText(printf("This is not a valid object construction expression. Explicit object constructors must either call an alternate constructor or initialize all fields of the object and specify a call to a super class constructor."))];
  }

  static tcInvalidConstraint() {
    return [697, toText(printf("Invalid constraint"))];
  }

  static tcInvalidConstraintTypeSealed() {
    return [698, toText(printf("Invalid constraint: the type used for the constraint is sealed, which means the constraint could only be satisfied by at most one solution"))];
  }

  static tcInvalidEnumConstraint() {
    return [699, toText(printf("An 'enum' constraint must be of the form 'enum<type>'"))];
  }

  static tcInvalidNewConstraint() {
    return [700, toText(printf("'new' constraints must take one argument of type 'unit' and return the constructed type"))];
  }

  static tcInvalidPropertyType() {
    return [701, toText(printf("This property has an invalid type. Properties taking multiple indexer arguments should have types of the form 'ty1 * ty2 -> ty3'. Properties returning functions should have types of the form '(ty1 -> ty2)'."))];
  }

  static tcExpectedUnitOfMeasureMarkWithAttribute() {
    return [702, toText(printf("Expected unit-of-measure parameter, not type parameter. Explicit unit-of-measure parameters must be marked with the [<Measure>] attribute."))];
  }

  static tcExpectedTypeParameter() {
    return [703, toText(printf("Expected type parameter, not unit-of-measure parameter"))];
  }

  static tcExpectedTypeNotUnitOfMeasure() {
    return [704, toText(printf("Expected type, not unit-of-measure"))];
  }

  static tcExpectedUnitOfMeasureNotType() {
    return [705, toText(printf("Expected unit-of-measure, not type"))];
  }

  static tcInvalidUnitsOfMeasurePrefix() {
    return [706, toText(printf("Units-of-measure cannot be used as prefix arguments to a type. Rewrite as postfix arguments in angle brackets."))];
  }

  static tcUnitsOfMeasureInvalidInTypeConstructor() {
    return [707, toText(printf("Unit-of-measure cannot be used in type constructor application"))];
  }

  static tcRequireBuilderMethod(a0) {
    return [708, toText(printf("This control construct may only be used if the computation expression builder defines a '%s' method"))(a0)];
  }

  static tcTypeHasNoNestedTypes() {
    return [709, toText(printf("This type has no nested types"))];
  }

  static tcUnexpectedSymbolInTypeExpression(a0) {
    return [711, toText(printf("Unexpected %s in type expression"))(a0)];
  }

  static tcTypeParameterInvalidAsTypeConstructor() {
    return [712, toText(printf("Type parameter cannot be used as type constructor"))];
  }

  static tcIllegalSyntaxInTypeExpression() {
    return [713, toText(printf("Illegal syntax in type expression"))];
  }

  static tcAnonymousUnitsOfMeasureCannotBeNested() {
    return [714, toText(printf("Anonymous unit-of-measure cannot be nested inside another unit-of-measure expression"))];
  }

  static tcAnonymousTypeInvalidInDeclaration() {
    return [715, toText(printf("Anonymous type variables are not permitted in this declaration"))];
  }

  static tcUnexpectedSlashInType() {
    return [716, toText(printf("Unexpected / in type"))];
  }

  static tcUnexpectedTypeArguments() {
    return [717, toText(printf("Unexpected type arguments"))];
  }

  static tcOptionalArgsOnlyOnMembers() {
    return [718, toText(printf("Optional arguments are only permitted on type members"))];
  }

  static tcNameNotBoundInPattern(a0) {
    return [719, toText(printf("Name '%s' not bound in pattern context"))(a0)];
  }

  static tcInvalidNonPrimitiveLiteralInPatternMatch() {
    return [720, toText(printf("Non-primitive numeric literal constants cannot be used in pattern matches because they can be mapped to multiple different types through the use of a NumericLiteral module. Consider using replacing with a variable, and use 'when <variable> = <constant>' at the end of the match clause."))];
  }

  static tcInvalidTypeArgumentUsage() {
    return [721, toText(printf("Type arguments cannot be specified here"))];
  }

  static tcRequireActivePatternWithOneResult() {
    return [722, toText(printf("Only active patterns returning exactly one result may accept arguments"))];
  }

  static tcInvalidArgForParameterizedPattern() {
    return [723, toText(printf("Invalid argument to parameterized pattern label"))];
  }

  static tcInvalidIndexIntoActivePatternArray() {
    return [724, toText(printf("Internal error. Invalid index into active pattern array"))];
  }

  static tcUnionCaseDoesNotTakeArguments() {
    return [725, toText(printf("This union case does not take arguments"))];
  }

  static tcUnionCaseRequiresOneArgument() {
    return [726, toText(printf("This union case takes one argument"))];
  }

  static tcUnionCaseExpectsTupledArguments(a0) {
    return [727, toText(printf("This union case expects %d arguments in tupled form"))(a0)];
  }

  static tcFieldIsNotStatic(a0) {
    return [728, toText(printf("Field '%s' is not static"))(a0)];
  }

  static tcFieldNotLiteralCannotBeUsedInPattern() {
    return [729, toText(printf("This field is not a literal and cannot be used in a pattern"))];
  }

  static tcRequireVarConstRecogOrLiteral() {
    return [730, toText(printf("This is not a variable, constant, active recognizer or literal"))];
  }

  static tcInvalidPattern() {
    return [731, toText(printf("This is not a valid pattern"))];
  }

  static tcUseWhenPatternGuard() {
    return toText(printf("Character range matches have been removed in F#. Consider using a 'when' pattern guard instead."));
  }

  static tcIllegalPattern() {
    return [733, toText(printf("Illegal pattern"))];
  }

  static tcSyntaxErrorUnexpectedQMark() {
    return [734, toText(printf("Syntax error - unexpected '?' symbol"))];
  }

  static tcExpressionCountMisMatch(a0, a1) {
    return [735, toText(printf("Expected %d expressions, got %d"))(a0, a1)];
  }

  static tcExprUndelayed() {
    return [736, toText(printf("TcExprUndelayed: delayed"))];
  }

  static tcExpressionRequiresSequence() {
    return [737, toText(printf("This expression form may only be used in sequence and computation expressions"))];
  }

  static tcInvalidObjectExpressionSyntaxForm() {
    return [738, toText(printf("Invalid object expression. Objects without overrides or interfaces should use the expression form 'new Type(args)' without braces."))];
  }

  static tcInvalidObjectSequenceOrRecordExpression() {
    return [739, toText(printf("Invalid object, sequence or record expression"))];
  }

  static tcInvalidSequenceExpressionSyntaxForm() {
    return [740, toText(printf("Invalid record, sequence or computation expression. Sequence expressions should be of the form 'seq { ... }'"))];
  }

  static tcExpressionWithIfRequiresParenthesis() {
    return toText(printf("This list or array expression includes an element of the form 'if ... then ... else'. Parenthesize this expression to indicate it is an individual element of the list or array, to disambiguate this from a list generated using a sequence expression"));
  }

  static tcUnableToParseFormatString(a0) {
    return [741, toText(printf("Unable to parse format string '%s'"))(a0)];
  }

  static tcListLiteralMaxSize() {
    return [742, toText(printf("This list expression exceeds the maximum size for list literals. Use an array for larger literals and call Array.ToList."))];
  }

  static tcExpressionFormRequiresObjectConstructor() {
    return [743, toText(printf("The expression form 'expr then expr' may only be used as part of an explicit object constructor"))];
  }

  static tcNamedArgumentsCannotBeUsedInMemberTraits() {
    return [744, toText(printf("Named arguments cannot be given to member trait calls"))];
  }

  static tcNotValidEnumCaseName() {
    return [745, toText(printf("This is not a valid name for an enumeration case"))];
  }

  static tcFieldIsNotMutable() {
    return [746, toText(printf("This field is not mutable"))];
  }

  static tcConstructRequiresListArrayOrSequence() {
    return [747, toText(printf("This construct may only be used within list, array and sequence expressions, e.g. expressions of the form 'seq { ... }', '[ ... ]' or '[| ... |]'. These use the syntax 'for ... in ... do ... yield...' to generate elements"))];
  }

  static tcConstructRequiresComputationExpressions() {
    return [748, toText(printf("This construct may only be used within computation expressions. To return a value from an ordinary function simply write the expression without 'return'."))];
  }

  static tcConstructRequiresSequenceOrComputations() {
    return [749, toText(printf("This construct may only be used within sequence or computation expressions"))];
  }

  static tcConstructRequiresComputationExpression() {
    return [750, toText(printf("This construct may only be used within computation expressions"))];
  }

  static tcInvalidIndexerExpression() {
    return [751, toText(printf("Invalid indexer expression"))];
  }

  static tcObjectOfIndeterminateTypeUsedRequireTypeConstraint() {
    return [752, toText(printf("The operator 'expr.[idx]' has been used on an object of indeterminate type based on information prior to this program point. Consider adding further type constraints"))];
  }

  static tcCannotInheritFromVariableType() {
    return [753, toText(printf("Cannot inherit from a variable type"))];
  }

  static tcObjectConstructorsOnTypeParametersCannotTakeArguments() {
    return [754, toText(printf("Calls to object constructors on type parameters cannot be given arguments"))];
  }

  static tcCompiledNameAttributeMisused() {
    return [755, toText(printf("The 'CompiledName' attribute cannot be used with this language element"))];
  }

  static tcNamedTypeRequired(a0) {
    return [756, toText(printf("'%s' may only be used with named types"))(a0)];
  }

  static tcInheritCannotBeUsedOnInterfaceType() {
    return [757, toText(printf("'inherit' cannot be used on interface types. Consider implementing the interface by using 'interface ... with ... end' instead."))];
  }

  static tcNewCannotBeUsedOnInterfaceType() {
    return [758, toText(printf("'new' cannot be used on interface types. Consider using an object expression '{ new ... with ... }' instead."))];
  }

  static tcAbstractTypeCannotBeInstantiated() {
    return [759, toText(printf("Instances of this type cannot be created since it has been marked abstract or not all methods have been given implementations. Consider using an object expression '{ new ... with ... }' instead."))];
  }

  static tcIDisposableTypeShouldUseNew() {
    return [760, toText(printf("It is recommended that objects supporting the IDisposable interface are created using the syntax 'new Type(args)', rather than 'Type(args)' or 'Type' as a function value representing the constructor, to indicate that resources may be owned by the generated value"))];
  }

  static tcSyntaxCanOnlyBeUsedToCreateObjectTypes(a0) {
    return [761, toText(printf("'%s' may only be used to construct object types"))(a0)];
  }

  static tcConstructorRequiresCall(a0) {
    return [762, toText(printf("Constructors for the type '%s' must directly or indirectly call its implicit object constructor. Use a call to the implicit object constructor instead of a record expression."))(a0)];
  }

  static tcUndefinedField(a0, a1) {
    return [763, toText(printf("The field '%s' has been given a value, but is not present in the type '%s'"))(a0, a1)];
  }

  static tcFieldRequiresAssignment(a0, a1) {
    return [764, toText(printf("No assignment given for field '%s' of type '%s'"))(a0, a1)];
  }

  static tcExtraneousFieldsGivenValues() {
    return [765, toText(printf("Extraneous fields have been given values"))];
  }

  static tcObjectExpressionsCanOnlyOverrideAbstractOrVirtual() {
    return [766, toText(printf("Only overrides of abstract and virtual members may be specified in object expressions"))];
  }

  static tcNoAbstractOrVirtualMemberFound(a0) {
    return [767, toText(printf("The member '%s' does not correspond to any abstract or virtual method available to override or implement."))(a0)];
  }

  static tcMemberFoundIsNotAbstractOrVirtual(a0, a1) {
    return [767, toText(printf("The type %s contains the member '%s' but it is not a virtual or abstract method that is available to override or implement."))(a0, a1)];
  }

  static tcArgumentArityMismatch(a0, a1, a2, a3, a4) {
    return [768, toText(printf("The member '%s' does not accept the correct number of arguments. %d argument(s) are expected, but %d were given. The required signature is '%s'.%s"))(a0, a1, a2, a3, a4)];
  }

  static tcArgumentArityMismatchOneOverload(a0, a1, a2, a3, a4) {
    return [769, toText(printf("The member '%s' does not accept the correct number of arguments. One overload accepts %d arguments, but %d were given. The required signature is '%s'.%s"))(a0, a1, a2, a3, a4)];
  }

  static tcSimpleMethodNameRequired() {
    return [770, toText(printf("A simple method name is required here"))];
  }

  static tcPredefinedTypeCannotBeUsedAsSuperType() {
    return [771, toText(printf("The types System.ValueType, System.Enum, System.Delegate, System.MulticastDelegate and System.Array cannot be used as super types in an object expression or class"))];
  }

  static tcNewMustBeUsedWithNamedType() {
    return [772, toText(printf("'new' must be used with a named type"))];
  }

  static tcCannotCreateExtensionOfSealedType() {
    return [773, toText(printf("Cannot create an extension of a sealed type"))];
  }

  static tcNoArgumentsForRecordValue() {
    return [774, toText(printf("No arguments may be given when constructing a record value"))];
  }

  static tcNoInterfaceImplementationForConstructionExpression() {
    return [775, toText(printf("Interface implementations cannot be given on construction expressions"))];
  }

  static tcObjectConstructionCanOnlyBeUsedInClassTypes() {
    return [776, toText(printf("Object construction expressions may only be used to implement constructors in class types"))];
  }

  static tcOnlySimpleBindingsCanBeUsedInConstructionExpressions() {
    return [777, toText(printf("Only simple bindings of the form 'id = expr' can be used in construction expressions"))];
  }

  static tcObjectsMustBeInitializedWithObjectExpression() {
    return [778, toText(printf("Objects must be initialized by an object construction expression that calls an inherited object constructor and assigns a value to each field"))];
  }

  static tcExpectedInterfaceType() {
    return [779, toText(printf("Expected an interface type"))];
  }

  static tcConstructorForInterfacesDoNotTakeArguments() {
    return [780, toText(printf("Constructor expressions for interfaces do not take arguments"))];
  }

  static tcConstructorRequiresArguments() {
    return [781, toText(printf("This object constructor requires arguments"))];
  }

  static tcNewRequiresObjectConstructor() {
    return [782, toText(printf("'new' may only be used with object constructors"))];
  }

  static tcAtLeastOneOverrideIsInvalid() {
    return [783, toText(printf("At least one override did not correctly implement its corresponding abstract member"))];
  }

  static tcNumericLiteralRequiresModule(a0) {
    return [784, toText(printf("This numeric literal requires that a module '%s' defining functions FromZero, FromOne, FromInt32, FromInt64 and FromString be in scope"))(a0)];
  }

  static tcInvalidRecordConstruction() {
    return [785, toText(printf("Invalid record construction"))];
  }

  static tcExpressionFormRequiresRecordTypes() {
    return [786, toText(printf("The expression form { expr with ... } may only be used with record types. To build object types use { new Type(...) with ... }"))];
  }

  static tcInheritedTypeIsNotObjectModelType() {
    return [787, toText(printf("The inherited type is not an object model type"))];
  }

  static tcObjectConstructionExpressionCanOnlyImplementConstructorsInObjectModelTypes() {
    return [788, toText(printf("Object construction expressions (i.e. record expressions with inheritance specifications) may only be used to implement constructors in object model types. Use 'new ObjectType(args)' to construct instances of object model types outside of constructors"))];
  }

  static tcEmptyRecordInvalid() {
    return [789, toText(printf("'{ }' is not a valid expression. Records must include at least one field. Empty sequences are specified by using Seq.empty or an empty list '[]'."))];
  }

  static tcTypeIsNotARecordTypeNeedConstructor() {
    return [790, toText(printf("This type is not a record type. Values of class and struct types must be created using calls to object constructors."))];
  }

  static tcTypeIsNotARecordType() {
    return [791, toText(printf("This type is not a record type"))];
  }

  static tcConstructIsAmbiguousInComputationExpression() {
    return [792, toText(printf("This construct is ambiguous as part of a computation expression. Nested expressions may be written using 'let _ = (...)' and nested computations using 'let! res = builder { ... }'."))];
  }

  static tcConstructIsAmbiguousInSequenceExpression() {
    return [793, toText(printf("This construct is ambiguous as part of a sequence expression. Nested expressions may be written using 'let _ = (...)' and nested sequences using 'yield! seq {... }'."))];
  }

  static tcDoBangIllegalInSequenceExpression() {
    return [794, toText(printf("'do!' cannot be used within sequence expressions"))];
  }

  static tcUseForInSequenceExpression() {
    return [795, toText(printf("The use of 'let! x = coll' in sequence expressions is not permitted. Use 'for x in coll' instead."))];
  }

  static tcTryIllegalInSequenceExpression() {
    return [796, toText(printf("'try'/'with' cannot be used within sequence expressions"))];
  }

  static tcUseYieldBangForMultipleResults() {
    return [797, toText(printf("In sequence expressions, multiple results are generated using 'yield!'"))];
  }

  static tcInvalidAssignment() {
    return [799, toText(printf("Invalid assignment"))];
  }

  static tcInvalidUseOfTypeName() {
    return [800, toText(printf("Invalid use of a type name"))];
  }

  static tcTypeHasNoAccessibleConstructor() {
    return [801, toText(printf("This type has no accessible object constructors"))];
  }

  static tcInvalidUseOfInterfaceType() {
    return [804, toText(printf("Invalid use of an interface type"))];
  }

  static tcInvalidUseOfDelegate() {
    return [805, toText(printf("Invalid use of a delegate constructor. Use the syntax 'new Type(args)' or just 'Type(args)'."))];
  }

  static tcPropertyIsNotStatic(a0) {
    return [806, toText(printf("Property '%s' is not static"))(a0)];
  }

  static tcPropertyIsNotReadable(a0) {
    return [807, toText(printf("Property '%s' is not readable"))(a0)];
  }

  static tcLookupMayNotBeUsedHere() {
    return [808, toText(printf("This lookup cannot be used here"))];
  }

  static tcPropertyIsStatic(a0) {
    return [809, toText(printf("Property '%s' is static"))(a0)];
  }

  static tcPropertyCannotBeSet1(a0) {
    return [810, toText(printf("Property '%s' cannot be set"))(a0)];
  }

  static tcConstructorsCannotBeFirstClassValues() {
    return [811, toText(printf("Constructors must be applied to arguments and cannot be used as first-class values. If necessary use an anonymous function '(fun arg1 ... argN -> new Type(arg1,...,argN))'."))];
  }

  static tcSyntaxFormUsedOnlyWithRecordLabelsPropertiesAndFields() {
    return [812, toText(printf("The syntax 'expr.id' may only be used with record labels, properties and fields"))];
  }

  static tcEventIsStatic(a0) {
    return [813, toText(printf("Event '%s' is static"))(a0)];
  }

  static tcEventIsNotStatic(a0) {
    return [814, toText(printf("Event '%s' is not static"))(a0)];
  }

  static tcNamedArgumentDidNotMatch(a0) {
    return [815, toText(printf("The named argument '%s' did not match any argument or mutable property"))(a0)];
  }

  static tcOverloadsCannotHaveCurriedArguments() {
    return [816, toText(printf("One or more of the overloads of this method has curried arguments. Consider redesigning these members to take arguments in tupled form."))];
  }

  static tcUnnamedArgumentsDoNotFormPrefix() {
    return toText(printf("The unnamed arguments do not form a prefix of the arguments of the method called"));
  }

  static tcStaticOptimizationConditionalsOnlyForFSharpLibrary() {
    return [817, toText(printf("Static optimization conditionals are only for use within the F# library"))];
  }

  static tcFormalArgumentIsNotOptional() {
    return [818, toText(printf("The corresponding formal argument is not optional"))];
  }

  static tcInvalidOptionalAssignmentToPropertyOrField() {
    return [819, toText(printf("Invalid optional assignment to a property or field"))];
  }

  static tcDelegateConstructorMustBePassed() {
    return [820, toText(printf("A delegate constructor must be passed a single function value"))];
  }

  static tcBindingCannotBeUseAndRec() {
    return [821, toText(printf("A binding cannot be marked both 'use' and 'rec'"))];
  }

  static tcVolatileOnlyOnClassLetBindings() {
    return [823, toText(printf("The 'VolatileField' attribute may only be used on 'let' bindings in classes"))];
  }

  static tcAttributesAreNotPermittedOnLetBindings() {
    return [824, toText(printf("Attributes are not permitted on 'let' bindings in expressions"))];
  }

  static tcDefaultValueAttributeRequiresVal() {
    return [825, toText(printf("The 'DefaultValue' attribute may only be used on 'val' declarations"))];
  }

  static tcConditionalAttributeRequiresMembers() {
    return [826, toText(printf("The 'ConditionalAttribute' attribute may only be used on members"))];
  }

  static tcInvalidActivePatternName() {
    return [827, toText(printf("This is not a valid name for an active pattern"))];
  }

  static tcEntryPointAttributeRequiresFunctionInModule() {
    return [828, toText(printf("The 'EntryPointAttribute' attribute may only be used on function definitions in modules"))];
  }

  static tcMutableValuesCannotBeInline() {
    return [829, toText(printf("Mutable values cannot be marked 'inline'"))];
  }

  static tcMutableValuesMayNotHaveGenericParameters() {
    return [830, toText(printf("Mutable values cannot have generic parameters"))];
  }

  static tcMutableValuesSyntax() {
    return [831, toText(printf("Mutable function values should be written 'let mutable f = (fun args -> ...)'"))];
  }

  static tcOnlyFunctionsCanBeInline() {
    return [832, toText(printf("Only functions may be marked 'inline'"))];
  }

  static tcIllegalAttributesForLiteral() {
    return [833, toText(printf("A literal value cannot be given the [<ThreadStatic>] or [<ContextStatic>] attributes"))];
  }

  static tcLiteralCannotBeMutable() {
    return [834, toText(printf("A literal value cannot be marked 'mutable'"))];
  }

  static tcLiteralCannotBeInline() {
    return [835, toText(printf("A literal value cannot be marked 'inline'"))];
  }

  static tcLiteralCannotHaveGenericParameters() {
    return [836, toText(printf("Literal values cannot have generic parameters"))];
  }

  static tcInvalidConstantExpression() {
    return [837, toText(printf("This is not a valid constant expression"))];
  }

  static tcTypeIsInaccessible() {
    return [838, toText(printf("This type is not accessible from this code location"))];
  }

  static tcUnexpectedConditionInImportedAssembly() {
    return [839, toText(printf("Unexpected condition in imported assembly: failed to decode AttributeUsage attribute"))];
  }

  static tcUnrecognizedAttributeTarget() {
    return [840, toText(printf("Unrecognized attribute target. Valid attribute targets are 'assembly', 'module', 'type', 'method', 'property', 'return', 'param', 'field', 'event', 'constructor'."))];
  }

  static tcAttributeIsNotValidForLanguageElementUseDo() {
    return [841, toText(printf("This attribute is not valid for use on this language element. Assembly attributes should be attached to a 'do ()' declaration, if necessary within an F# module."))];
  }

  static tcAttributeIsNotValidForLanguageElement() {
    return [842, toText(printf("This attribute is not valid for use on this language element"))];
  }

  static tcOptionalArgumentsCannotBeUsedInCustomAttribute() {
    return [843, toText(printf("Optional arguments cannot be used in custom attributes"))];
  }

  static tcPropertyCannotBeSet0() {
    return [844, toText(printf("This property cannot be set"))];
  }

  static tcPropertyOrFieldNotFoundInAttribute() {
    return [845, toText(printf("This property or field was not found on this custom attribute type"))];
  }

  static tcCustomAttributeMustBeReferenceType() {
    return [846, toText(printf("A custom attribute must be a reference type"))];
  }

  static tcCustomAttributeArgumentMismatch() {
    return [847, toText(printf("The number of args for a custom attribute does not match the expected number of args for the attribute constructor"))];
  }

  static tcCustomAttributeMustInvokeConstructor() {
    return [848, toText(printf("A custom attribute must invoke an object constructor"))];
  }

  static tcAttributeExpressionsMustBeConstructorCalls() {
    return [849, toText(printf("Attribute expressions must be calls to object constructors"))];
  }

  static tcUnsupportedAttribute() {
    return [850, toText(printf("This attribute cannot be used in this version of F#"))];
  }

  static tcInvalidInlineSpecification() {
    return [851, toText(printf("Invalid inline specification"))];
  }

  static tcInvalidUseBinding() {
    return [852, toText(printf("'use' bindings must be of the form 'use <var> = <expr>'"))];
  }

  static tcAbstractMembersIllegalInAugmentation() {
    return [853, toText(printf("Abstract members are not permitted in an augmentation - they must be defined as part of the type itself"))];
  }

  static tcMethodOverridesIllegalHere() {
    return [854, toText(printf("Method overrides and interface implementations are not permitted here"))];
  }

  static tcNoMemberFoundForOverride() {
    return [855, toText(printf("No abstract or interface member was found that corresponds to this override"))];
  }

  static tcOverrideArityMismatch(a0) {
    return [856, toText(printf("This override takes a different number of arguments to the corresponding abstract member. The following abstract members were found:%s"))(a0)];
  }

  static tcDefaultImplementationAlreadyExists() {
    return [857, toText(printf("This method already has a default implementation"))];
  }

  static tcDefaultAmbiguous() {
    return [858, toText(printf("The method implemented by this default is ambiguous"))];
  }

  static tcNoPropertyFoundForOverride() {
    return [859, toText(printf("No abstract property was found that corresponds to this override"))];
  }

  static tcAbstractPropertyMissingGetOrSet(a0) {
    return [860, toText(printf("This property overrides or implements an abstract property but the abstract property doesn't have a corresponding %s"))(a0)];
  }

  static tcInvalidSignatureForSet() {
    return [861, toText(printf("Invalid signature for set member"))];
  }

  static tcNewMemberHidesAbstractMember(a0) {
    return [864, toText(printf("This new member hides the abstract member '%s'. Rename the member or use 'override' instead."))(a0)];
  }

  static tcNewMemberHidesAbstractMemberWithSuffix(a0) {
    return [864, toText(printf("This new member hides the abstract member '%s' once tuples, functions, units of measure and/or provided types are erased. Rename the member or use 'override' instead."))(a0)];
  }

  static tcStaticInitializersIllegalInInterface() {
    return [865, toText(printf("Interfaces cannot contain definitions of static initializers"))];
  }

  static tcObjectConstructorsIllegalInInterface() {
    return [866, toText(printf("Interfaces cannot contain definitions of object constructors"))];
  }

  static tcMemberOverridesIllegalInInterface() {
    return [867, toText(printf("Interfaces cannot contain definitions of member overrides"))];
  }

  static tcConcreteMembersIllegalInInterface() {
    return [868, toText(printf("Interfaces cannot contain definitions of concrete members. You may need to define a constructor on your type to indicate that the type is a class."))];
  }

  static tcConstructorsDisallowedInExceptionAugmentation() {
    return [869, toText(printf("Constructors cannot be specified in exception augmentations"))];
  }

  static tcStructsCannotHaveConstructorWithNoArguments() {
    return [870, toText(printf("Structs cannot have an object constructor with no arguments. This is a restriction imposed on all CLI languages as structs automatically support a default constructor."))];
  }

  static tcConstructorsIllegalForThisType() {
    return [871, toText(printf("Constructors cannot be defined for this type"))];
  }

  static tcRecursiveBindingsWithMembersMustBeDirectAugmentation() {
    return [872, toText(printf("Recursive bindings that include member specifications can only occur as a direct augmentation of a type"))];
  }

  static tcOnlySimplePatternsInLetRec() {
    return [873, toText(printf("Only simple variable patterns can be bound in 'let rec' constructs"))];
  }

  static tcOnlyRecordFieldsAndSimpleLetCanBeMutable() {
    return [874, toText(printf("Only record fields and simple, non-recursive 'let' bindings may be marked mutable"))];
  }

  static tcMemberIsNotSufficientlyGeneric() {
    return [875, toText(printf("This member is not sufficiently generic"))];
  }

  static tcLiteralAttributeRequiresConstantValue() {
    return [876, toText(printf("A declaration may only be the [<Literal>] attribute if a constant value is also given, e.g. 'val x : int = 1'"))];
  }

  static tcValueInSignatureRequiresLiteralAttribute() {
    return [877, toText(printf("A declaration may only be given a value in a signature if the declaration has the [<Literal>] attribute"))];
  }

  static tcThreadStaticAndContextStaticMustBeStatic() {
    return [878, toText(printf("Thread-static and context-static variables must be static and given the [<DefaultValue>] attribute to indicate that the value is initialized to the default value on each new thread"))];
  }

  static tcVolatileFieldsMustBeMutable() {
    return [879, toText(printf("Volatile fields must be marked 'mutable' and cannot be thread-static"))];
  }

  static tcUninitializedValFieldsMustBeMutable() {
    return [880, toText(printf("Uninitialized 'val' fields must be mutable and marked with the '[<DefaultValue>]' attribute. Consider using a 'let' binding instead of a 'val' field."))];
  }

  static tcStaticValFieldsMustBeMutableAndPrivate() {
    return [881, toText(printf("Static 'val' fields in types must be mutable, private and marked with the '[<DefaultValue>]' attribute. They are initialized to the 'null' or 'zero' value for their type. Consider also using a 'static let mutable' binding in a class type."))];
  }

  static tcFieldRequiresName() {
    return [882, toText(printf("This field requires a name"))];
  }

  static tcInvalidNamespaceModuleTypeUnionName() {
    return [883, toText(printf("Invalid namespace, module, type or union case name"))];
  }

  static tcIllegalFormForExplicitTypeDeclaration() {
    return [884, toText(printf("Explicit type declarations for constructors must be of the form 'ty1 * ... * tyN -> resTy'. Parentheses may be required around 'resTy'"))];
  }

  static tcReturnTypesForUnionMustBeSameAsType() {
    return [885, toText(printf("Return types of union cases must be identical to the type being defined, up to abbreviations"))];
  }

  static tcInvalidEnumerationLiteral() {
    return [886, toText(printf("This is not a valid value for an enumeration literal"))];
  }

  static tcTypeIsNotInterfaceType1(a0) {
    return [887, toText(printf("The type '%s' is not an interface type"))(a0)];
  }

  static tcDuplicateSpecOfInterface() {
    return [888, toText(printf("Duplicate specification of an interface"))];
  }

  static tcFieldValIllegalHere() {
    return [889, toText(printf("A field/val declaration is not permitted here"))];
  }

  static tcInheritIllegalHere() {
    return [890, toText(printf("A inheritance declaration is not permitted here"))];
  }

  static tcModuleRequiresQualifiedAccess(a0) {
    return [892, toText(printf("This declaration opens the module '%s', which is marked as 'RequireQualifiedAccess'. Adjust your code to use qualified references to the elements of the module instead, e.g. 'List.map' instead of 'map'. This change will ensure that your code is robust as new constructs are added to libraries."))(a0)];
  }

  static tcOpenUsedWithPartiallyQualifiedPath(a0) {
    return [893, toText(printf("This declaration opens the namespace or module '%s' through a partially qualified path. Adjust this code to use the full path of the namespace. This change will make your code more robust as new constructs are added to the F# and CLI libraries."))(a0)];
  }

  static tcLocalClassBindingsCannotBeInline() {
    return [894, toText(printf("Local class bindings cannot be marked inline. Consider lifting the definition out of the class or else do not mark it as inline."))];
  }

  static tcTypeAbbreviationsMayNotHaveMembers() {
    return [895, toText(printf("Type abbreviations cannot have members"))];
  }

  static tcTypeAbbreviationsCheckedAtCompileTime() {
    return toText(printf("As of F# 4.1, the accessibility of type abbreviations is checked at compile-time. Consider changing the accessibility of the type abbreviation. Ignoring this warning might lead to runtime errors."));
  }

  static tcEnumerationsMayNotHaveMembers() {
    return [896, toText(printf("Enumerations cannot have members"))];
  }

  static tcMeasureDeclarationsRequireStaticMembers() {
    return [897, toText(printf("Measure declarations may have only static members"))];
  }

  static tcStructsMayNotContainDoBindings() {
    return toText(printf("Structs cannot contain 'do' bindings because the default constructor for structs would not execute these bindings"));
  }

  static tcStructsMayNotContainLetBindings() {
    return [901, toText(printf("Structs cannot contain value definitions because the default constructor for structs will not execute these bindings. Consider adding additional arguments to the primary constructor for the type."))];
  }

  static tcStaticLetBindingsRequireClassesWithImplicitConstructors() {
    return [902, toText(printf("Static value definitions may only be used in types with a primary constructor. Consider adding arguments to the type definition, e.g. 'type X(args) = ...'."))];
  }

  static tcMeasureDeclarationsRequireStaticMembersNotConstructors() {
    return [904, toText(printf("Measure declarations may have only static members: constructors are not available"))];
  }

  static tcMemberAndLocalClassBindingHaveSameName(a0) {
    return [905, toText(printf("A member and a local class binding both have the name '%s'"))(a0)];
  }

  static tcTypeAbbreviationsCannotHaveInterfaceDeclaration() {
    return [906, toText(printf("Type abbreviations cannot have interface declarations"))];
  }

  static tcEnumerationsCannotHaveInterfaceDeclaration() {
    return [907, toText(printf("Enumerations cannot have interface declarations"))];
  }

  static tcTypeIsNotInterfaceType0() {
    return [908, toText(printf("This type is not an interface type"))];
  }

  static tcAllImplementedInterfacesShouldBeDeclared() {
    return [909, toText(printf("All implemented interfaces should be declared on the initial declaration of the type"))];
  }

  static tcDefaultImplementationForInterfaceHasAlreadyBeenAdded() {
    return [910, toText(printf("A default implementation of this interface has already been added because the explicit implementation of the interface was not specified at the definition of the type"))];
  }

  static tcMemberNotPermittedInInterfaceImplementation() {
    return [911, toText(printf("This member is not permitted in an interface implementation"))];
  }

  static tcDeclarationElementNotPermittedInAugmentation() {
    return [912, toText(printf("This declaration element is not permitted in an augmentation"))];
  }

  static tcTypesCannotContainNestedTypes() {
    return [913, toText(printf("Types cannot contain nested type definitions"))];
  }

  static tcTypeExceptionOrModule() {
    return toText(printf("type, exception or module"));
  }

  static tcTypeOrModule() {
    return toText(printf("type or module"));
  }

  static tcImplementsIStructuralEquatableExplicitly(a0) {
    return [914, toText(printf("The struct, record or union type '%s' implements the interface 'System.IStructuralEquatable' explicitly. Apply the 'CustomEquality' attribute to the type."))(a0)];
  }

  static tcImplementsIEquatableExplicitly(a0) {
    return [915, toText(printf("The struct, record or union type '%s' implements the interface 'System.IEquatable<_>' explicitly. Apply the 'CustomEquality' attribute to the type and provide a consistent implementation of the non-generic override 'System.Object.Equals(obj)'."))(a0)];
  }

  static tcExplicitTypeSpecificationCannotBeUsedForExceptionConstructors() {
    return [916, toText(printf("Explicit type specifications cannot be used for exception constructors"))];
  }

  static tcExceptionAbbreviationsShouldNotHaveArgumentList() {
    return [917, toText(printf("Exception abbreviations should not have argument lists"))];
  }

  static tcAbbreviationsFordotNetExceptionsCannotTakeArguments() {
    return [918, toText(printf("Abbreviations for Common IL exceptions cannot take arguments"))];
  }

  static tcExceptionAbbreviationsMustReferToValidExceptions() {
    return [919, toText(printf("Exception abbreviations must refer to existing exceptions or F# types deriving from System.Exception"))];
  }

  static tcAbbreviationsFordotNetExceptionsMustHaveMatchingObjectConstructor() {
    return [920, toText(printf("Abbreviations for Common IL exception types must have a matching object constructor"))];
  }

  static tcNotAnException() {
    return [921, toText(printf("Not an exception"))];
  }

  static tcInvalidModuleName() {
    return [924, toText(printf("Invalid module name"))];
  }

  static tcInvalidTypeExtension() {
    return [925, toText(printf("Invalid type extension"))];
  }

  static tcAttributesOfTypeSpecifyMultipleKindsForType() {
    return [926, toText(printf("The attributes of this type specify multiple kinds for the type"))];
  }

  static tcKindOfTypeSpecifiedDoesNotMatchDefinition() {
    return [927, toText(printf("The kind of the type specified by its attributes does not match the kind implied by its definition"))];
  }

  static tcMeasureDefinitionsCannotHaveTypeParameters() {
    return [928, toText(printf("Measure definitions cannot have type parameters"))];
  }

  static tcTypeRequiresDefinition() {
    return [929, toText(printf("This type requires a definition"))];
  }

  static tcTypeAbbreviationHasTypeParametersMissingOnType() {
    return toText(printf("This type abbreviation has one or more declared type parameters that do not appear in the type being abbreviated. Type abbreviations must use all declared type parameters in the type being abbreviated. Consider removing one or more type parameters, or use a concrete type definition that wraps an underlying type, such as 'type C<'a> = C of ...'."));
  }

  static tcStructsInterfacesEnumsDelegatesMayNotInheritFromOtherTypes() {
    return [931, toText(printf("Structs, interfaces, enums and delegates cannot inherit from other types"))];
  }

  static tcTypesCannotInheritFromMultipleConcreteTypes() {
    return [932, toText(printf("Types cannot inherit from multiple concrete types"))];
  }

  static tcRecordsUnionsAbbreviationsStructsMayNotHaveAllowNullLiteralAttribute() {
    return [934, toText(printf("Records, union, abbreviations and struct types cannot have the 'AllowNullLiteral' attribute"))];
  }

  static tcAllowNullTypesMayOnlyInheritFromAllowNullTypes() {
    return [935, toText(printf("Types with the 'AllowNullLiteral' attribute may only inherit from or implement types which also allow the use of the null literal"))];
  }

  static tcGenericTypesCannotHaveStructLayout() {
    return [936, toText(printf("Generic types cannot be given the 'StructLayout' attribute"))];
  }

  static tcOnlyStructsCanHaveStructLayout() {
    return [937, toText(printf("Only structs and classes without primary constructors may be given the 'StructLayout' attribute"))];
  }

  static tcRepresentationOfTypeHiddenBySignature() {
    return [938, toText(printf("The representation of this type is hidden by the signature. It must be given an attribute such as [<Sealed>], [<Class>] or [<Interface>] to indicate the characteristics of the type."))];
  }

  static tcOnlyClassesCanHaveAbstract() {
    return [939, toText(printf("Only classes may be given the 'AbstractClass' attribute"))];
  }

  static tcOnlyTypesRepresentingUnitsOfMeasureCanHaveMeasure() {
    return [940, toText(printf("Only types representing units-of-measure may be given the 'Measure' attribute"))];
  }

  static tcOverridesCannotHaveVisibilityDeclarations() {
    return [941, toText(printf("Accessibility modifiers are not permitted on overrides or interface implementations"))];
  }

  static tcTypesAreAlwaysSealedDU() {
    return [942, toText(printf("Discriminated union types are always sealed"))];
  }

  static tcTypesAreAlwaysSealedRecord() {
    return [942, toText(printf("Record types are always sealed"))];
  }

  static tcTypesAreAlwaysSealedAssemblyCode() {
    return [942, toText(printf("Assembly code types are always sealed"))];
  }

  static tcTypesAreAlwaysSealedStruct() {
    return [942, toText(printf("Struct types are always sealed"))];
  }

  static tcTypesAreAlwaysSealedDelegate() {
    return [942, toText(printf("Delegate types are always sealed"))];
  }

  static tcTypesAreAlwaysSealedEnum() {
    return [942, toText(printf("Enum types are always sealed"))];
  }

  static tcInterfaceTypesAndDelegatesCannotContainFields() {
    return [943, toText(printf("Interface types and delegate types cannot contain fields"))];
  }

  static tcAbbreviatedTypesCannotBeSealed() {
    return [944, toText(printf("Abbreviated types cannot be given the 'Sealed' attribute"))];
  }

  static tcCannotInheritFromSealedType() {
    return [945, toText(printf("Cannot inherit a sealed type"))];
  }

  static tcCannotInheritFromInterfaceType() {
    return [946, toText(printf("Cannot inherit from interface type. Use interface ... with instead."))];
  }

  static tcStructTypesCannotContainAbstractMembers() {
    return [947, toText(printf("Struct types cannot contain abstract members"))];
  }

  static tcInterfaceTypesCannotBeSealed() {
    return [948, toText(printf("Interface types cannot be sealed"))];
  }

  static tcInvalidDelegateSpecification() {
    return [949, toText(printf("Delegate specifications must be of the form 'typ -> typ'"))];
  }

  static tcDelegatesCannotBeCurried() {
    return [950, toText(printf("Delegate specifications must not be curried types. Use 'typ * ... * typ -> typ' for multi-argument delegates, and 'typ -> (typ -> typ)' for delegates returning function values."))];
  }

  static tcInvalidTypeForLiteralEnumeration() {
    return [951, toText(printf("Literal enumerations must have type int, uint, int16, uint16, int64, uint64, byte, sbyte or char"))];
  }

  static tcTypeDefinitionIsCyclic() {
    return [953, toText(printf("This type definition involves an immediate cyclic reference through an abbreviation"))];
  }

  static tcTypeDefinitionIsCyclicThroughInheritance() {
    return [954, toText(printf("This type definition involves an immediate cyclic reference through a struct field or inheritance relation"))];
  }

  static tcReservedSyntaxForAugmentation() {
    return toText(printf("The syntax 'type X with ...' is reserved for augmentations. Types whose representations are hidden but which have members are now declared in signatures using 'type X = ...'. You may also need to add the '[<Sealed>] attribute to the type definition in the signature"));
  }

  static tcMembersThatExtendInterfaceMustBePlacedInSeparateModule() {
    return [956, toText(printf("Members that extend interface, delegate or enum types must be placed in a module separate to the definition of the type. This module must either have the AutoOpen attribute or be opened explicitly by client code to bring the extension members into scope."))];
  }

  static tcDeclaredTypeParametersForExtensionDoNotMatchOriginal(a0) {
    return [957, toText(printf("One or more of the declared type parameters for this type extension have a missing or wrong type constraint not matching the original type constraints on '%s'"))(a0)];
  }

  static tcTypeDefinitionsWithImplicitConstructionMustHaveOneInherit() {
    return [959, toText(printf("Type definitions may only have one 'inherit' specification and it must be the first declaration"))];
  }

  static tcTypeDefinitionsWithImplicitConstructionMustHaveLocalBindingsBeforeMembers() {
    return [960, toText(printf("'let' and 'do' bindings must come before member and interface definitions in type definitions"))];
  }

  static tcInheritDeclarationMissingArguments() {
    return [961, toText(printf("This 'inherit' declaration specifies the inherited type but no arguments. Consider supplying arguments, e.g. 'inherit BaseType(args)'."))];
  }

  static tcInheritConstructionCallNotPartOfImplicitSequence() {
    return [962, toText(printf("This 'inherit' declaration has arguments, but is not in a type with a primary constructor. Consider adding arguments to your type definition, e.g. 'type X(args) = ...'."))];
  }

  static tcLetAndDoRequiresImplicitConstructionSequence() {
    return [963, toText(printf("This definition may only be used in a type with a primary constructor. Consider adding arguments to your type definition, e.g. 'type X(args) = ...'."))];
  }

  static tcTypeAbbreviationsCannotHaveAugmentations() {
    return [964, toText(printf("Type abbreviations cannot have augmentations"))];
  }

  static tcModuleAbbreviationForNamespace(a0) {
    return [965, toText(printf("The path '%s' is a namespace. A module abbreviation may not abbreviate a namespace."))(a0)];
  }

  static tcTypeUsedInInvalidWay(a0, a1, a2) {
    return [966, toText(printf("The type '%s' is used in an invalid way. A value prior to '%s' has an inferred type involving '%s', which is an invalid forward reference."))(a0, a1, a2)];
  }

  static tcMemberUsedInInvalidWay(a0, a1, a2) {
    return [967, toText(printf("The member '%s' is used in an invalid way. A use of '%s' has been inferred prior to the definition of '%s', which is an invalid forward reference."))(a0, a1, a2)];
  }

  static tcAttributeAutoOpenWasIgnored(a0, a1) {
    return [970, toText(printf("The attribute 'AutoOpen(\"%s\")' in the assembly '%s' did not refer to a valid module or namespace in that assembly and has been ignored"))(a0, a1)];
  }

  static ilUndefinedValue(a0) {
    return [971, toText(printf("Undefined value '%s'"))(a0)];
  }

  static ilLabelNotFound(a0) {
    return [972, toText(printf("Label %s not found"))(a0)];
  }

  static ilIncorrectNumberOfTypeArguments() {
    return [973, toText(printf("Incorrect number of type arguments to local call"))];
  }

  static ilDynamicInvocationNotSupported(a0) {
    return toText(printf("Dynamic invocation of %s is not supported"))(a0);
  }

  static ilAddressOfLiteralFieldIsInvalid() {
    return [975, toText(printf("Taking the address of a literal field is invalid"))];
  }

  static ilAddressOfValueHereIsInvalid(a0) {
    return [976, toText(printf("This operation involves taking the address of a value '%s' represented using a local variable or other special representation. This is invalid."))(a0)];
  }

  static ilCustomMarshallersCannotBeUsedInFSharp() {
    return [980, toText(printf("Custom marshallers cannot be specified in F# code. Consider using a C# helper function."))];
  }

  static ilMarshalAsAttributeCannotBeDecoded() {
    return [981, toText(printf("The MarshalAs attribute could not be decoded"))];
  }

  static ilSignatureForExternalFunctionContainsTypeParameters() {
    return [982, toText(printf("The signature for this external function contains type parameters. Constrain the argument and return types to indicate the types of the corresponding C function."))];
  }

  static ilDllImportAttributeCouldNotBeDecoded() {
    return [983, toText(printf("The DllImport attribute could not be decoded"))];
  }

  static ilLiteralFieldsCannotBeSet() {
    return [984, toText(printf("Literal fields cannot be set"))];
  }

  static ilStaticMethodIsNotLambda(a0) {
    return [985, toText(printf("GenSetStorage: %s was represented as a static method but was not an appropriate lambda expression"))(a0)];
  }

  static ilMutableVariablesCannotEscapeMethod() {
    return [986, toText(printf("Mutable variables cannot escape their method"))];
  }

  static ilUnexpectedUnrealizedValue() {
    return [987, toText(printf("Compiler error: unexpected unrealized value"))];
  }

  static ilMainModuleEmpty() {
    return [988, toText(printf("Main module of program is empty: nothing will happen when it is run"))];
  }

  static ilTypeCannotBeUsedForLiteralField() {
    return [989, toText(printf("This type cannot be used for a literal field"))];
  }

  static ilUnexpectedGetSetAnnotation() {
    return [990, toText(printf("Unexpected GetSet annotation on a property"))];
  }

  static ilFieldOffsetAttributeCouldNotBeDecoded() {
    return [991, toText(printf("The FieldOffset attribute could not be decoded"))];
  }

  static ilStructLayoutAttributeCouldNotBeDecoded() {
    return [992, toText(printf("The StructLayout attribute could not be decoded"))];
  }

  static ilDefaultAugmentationAttributeCouldNotBeDecoded() {
    return [993, toText(printf("The DefaultAugmentation attribute could not be decoded"))];
  }

  static ilReflectedDefinitionsCannotUseSliceOperator() {
    return [994, toText(printf("Reflected definitions cannot contain uses of the prefix splice operator '%%'"))];
  }

  static optsProblemWithCodepage(a0, a1) {
    return [1000, toText(printf("Problem with codepage '%d': %s"))(a0, a1)];
  }

  static optsCopyright() {
    return toText(printf("Copyright (c) Microsoft Corporation. All Rights Reserved."));
  }

  static optsCopyrightCommunity() {
    return toText(printf("Freely distributed under the MIT Open Source License.  https://github.com/Microsoft/visualfsharp/blob/master/License.txt"));
  }

  static optsNameOfOutputFile() {
    return toText(printf("Name of the output file (Short form: -o)"));
  }

  static optsBuildConsole() {
    return toText(printf("Build a console executable"));
  }

  static optsBuildWindows() {
    return toText(printf("Build a Windows executable"));
  }

  static optsBuildLibrary() {
    return toText(printf("Build a library (Short form: -a)"));
  }

  static optsBuildModule() {
    return toText(printf("Build a module that can be added to another assembly"));
  }

  static optsDelaySign() {
    return toText(printf("Delay-sign the assembly using only the public portion of the strong name key"));
  }

  static optsPublicSign() {
    return toText(printf("Public-sign the assembly using only the public portion of the strong name key, and mark the assembly as signed"));
  }

  static optsWriteXml() {
    return toText(printf("Write the xmldoc of the assembly to the given file"));
  }

  static optsStrongKeyFile() {
    return toText(printf("Specify a strong name key file"));
  }

  static optsStrongKeyContainer() {
    return toText(printf("Specify a strong name key container"));
  }

  static optsPlatform() {
    return toText(printf("Limit which platforms this code can run on: x86, Itanium, x64, anycpu32bitpreferred, or anycpu. The default is anycpu."));
  }

  static optsNoOpt() {
    return toText(printf("Only include optimization information essential for implementing inlined constructs. Inhibits cross-module inlining but improves binary compatibility."));
  }

  static optsNoInterface() {
    return toText(printf("Don't add a resource to the generated assembly containing F#-specific metadata"));
  }

  static optsSig() {
    return toText(printf("Print the inferred interface of the assembly to a file"));
  }

  static optsReference() {
    return toText(printf("Reference an assembly (Short form: -r)"));
  }

  static optsWin32res() {
    return toText(printf("Specify a Win32 resource file (.res)"));
  }

  static optsWin32manifest() {
    return toText(printf("Specify a Win32 manifest file"));
  }

  static optsNowin32manifest() {
    return toText(printf("Do not include the default Win32 manifest"));
  }

  static optsEmbedAllSource() {
    return toText(printf("Embed all source files in the portable PDB file"));
  }

  static optsEmbedSource() {
    return toText(printf("Embed specific source files in the portable PDB file"));
  }

  static optsSourceLink() {
    return toText(printf("Source link information file to embed in the portable PDB file"));
  }

  static optsEmbeddedSourceRequirePortablePDBs() {
    return [1501, toText(printf("--embed switch only supported when emitting a Portable PDB (--debug:portable or --debug:embedded)"))];
  }

  static optsSourceLinkRequirePortablePDBs() {
    return [1502, toText(printf("--sourcelink switch only supported when emitting a Portable PDB (--debug:portable or --debug:embedded)"))];
  }

  static srcFileTooLarge() {
    return toText(printf("Source file is too large to embed in a portable PDB"));
  }

  static optsResource() {
    return toText(printf("Embed the specified managed resource"));
  }

  static optsLinkresource() {
    return toText(printf("Link the specified resource to this assembly where the resinfo format is <file>[,<string name>[,public|private]]"));
  }

  static optsDebugPM() {
    return toText(printf("Emit debug information (Short form: -g)"));
  }

  static optsDebug(a0) {
    return toText(printf("Specify debugging type: full, portable, embedded, pdbonly. ('%s' is the default if no debuggging type specified and enables attaching a debugger to a running program, 'portable' is a cross-platform format, 'embedded' is a cross-platform format embedded into the output file)."))(a0);
  }

  static optsOptimize() {
    return toText(printf("Enable optimizations (Short form: -O)"));
  }

  static optsTailcalls() {
    return toText(printf("Enable or disable tailcalls"));
  }

  static optsDeterministic() {
    return toText(printf("Produce a deterministic assembly (including module version GUID and timestamp)"));
  }

  static optsCrossoptimize() {
    return toText(printf("Enable or disable cross-module optimizations"));
  }

  static optsWarnaserrorPM() {
    return toText(printf("Report all warnings as errors"));
  }

  static optsWarnaserror() {
    return toText(printf("Report specific warnings as errors"));
  }

  static optsWarn() {
    return toText(printf("Set a warning level (0-5)"));
  }

  static optsNowarn() {
    return toText(printf("Disable specific warning messages"));
  }

  static optsWarnOn() {
    return toText(printf("Enable specific warnings that may be off by default"));
  }

  static optsChecked() {
    return toText(printf("Generate overflow checks"));
  }

  static optsDefine() {
    return toText(printf("Define conditional compilation symbols (Short form: -d)"));
  }

  static optsMlcompatibility() {
    return toText(printf("Ignore ML compatibility warnings"));
  }

  static optsNologo() {
    return toText(printf("Suppress compiler copyright message"));
  }

  static optsHelp() {
    return toText(printf("Display this usage message (Short form: -?)"));
  }

  static optsResponseFile() {
    return toText(printf("Read response file for more options"));
  }

  static optsCodepage() {
    return toText(printf("Specify the codepage used to read source files"));
  }

  static optsUtf8output() {
    return toText(printf("Output messages in UTF-8 encoding"));
  }

  static optsFullpaths() {
    return toText(printf("Output messages with fully qualified paths"));
  }

  static optsLib() {
    return toText(printf("Specify a directory for the include path which is used to resolve source files and assemblies (Short form: -I)"));
  }

  static optsBaseaddress() {
    return toText(printf("Base address for the library to be built"));
  }

  static optsNoframework() {
    return toText(printf("Do not reference the default CLI assemblies by default"));
  }

  static optsStandalone() {
    return toText(printf("Statically link the F# library and all referenced DLLs that depend on it into the assembly being generated"));
  }

  static optsStaticlink() {
    return toText(printf("Statically link the given assembly and all referenced DLLs that depend on this assembly. Use an assembly name e.g. mylib, not a DLL name."));
  }

  static optsResident() {
    return toText(printf("Use a resident background compilation service to improve compiler startup times."));
  }

  static optsPdb() {
    return toText(printf("Name the output debug file"));
  }

  static optsSimpleresolution() {
    return toText(printf("Resolve assembly references using directory-based rules rather than MSBuild resolution"));
  }

  static optsUnrecognizedTarget(a0) {
    return [1048, toText(printf("Unrecognized target '%s', expected 'exe', 'winexe', 'library' or 'module'"))(a0)];
  }

  static optsUnrecognizedDebugType(a0) {
    return [1049, toText(printf("Unrecognized debug type '%s', expected 'pdbonly' or 'full'"))(a0)];
  }

  static optsInvalidWarningLevel(a0) {
    return [1050, toText(printf("Invalid warning level '%d'"))(a0)];
  }

  static optsShortFormOf(a0) {
    return toText(printf("Short form of '%s'"))(a0);
  }

  static optsClirootDeprecatedMsg() {
    return toText(printf("The command-line option '--cliroot' has been deprecated. Use an explicit reference to a specific copy of mscorlib.dll instead."));
  }

  static optsClirootDescription() {
    return toText(printf("Use to override where the compiler looks for mscorlib.dll and framework components"));
  }

  static optsHelpBannerOutputFiles() {
    return toText(printf("- OUTPUT FILES -"));
  }

  static optsHelpBannerInputFiles() {
    return toText(printf("- INPUT FILES -"));
  }

  static optsHelpBannerResources() {
    return toText(printf("- RESOURCES -"));
  }

  static optsHelpBannerCodeGen() {
    return toText(printf("- CODE GENERATION -"));
  }

  static optsHelpBannerAdvanced() {
    return toText(printf("- ADVANCED -"));
  }

  static optsHelpBannerMisc() {
    return toText(printf("- MISCELLANEOUS -"));
  }

  static optsHelpBannerLanguage() {
    return toText(printf("- LANGUAGE -"));
  }

  static optsHelpBannerErrsAndWarns() {
    return toText(printf("- ERRORS AND WARNINGS -"));
  }

  static optsUnknownArgumentToTheTestSwitch(a0) {
    return [1063, toText(printf("Unknown --test argument: '%s'"))(a0)];
  }

  static optsUnknownPlatform(a0) {
    return [1064, toText(printf("Unrecognized platform '%s', valid values are 'x86', 'x64', 'Itanium', 'anycpu32bitpreferred', and 'anycpu'"))(a0)];
  }

  static optsInternalNoDescription(a0) {
    return toText(printf("The command-line option '%s' is for test purposes only"))(a0);
  }

  static optsDCLONoDescription(a0) {
    return toText(printf("The command-line option '%s' has been deprecated"))(a0);
  }

  static optsDCLODeprecatedSuggestAlternative(a0, a1) {
    return toText(printf("The command-line option '%s' has been deprecated. Use '%s' instead."))(a0, a1);
  }

  static optsDCLOHtmlDoc(a0) {
    return toText(printf("The command-line option '%s' has been deprecated. HTML document generation is now part of the F# Power Pack, via the tool FsHtmlDoc.exe."))(a0);
  }

  static optsConsoleColors() {
    return toText(printf("Output warning and error messages in color"));
  }

  static optsUseHighEntropyVA() {
    return toText(printf("Enable high-entropy ASLR"));
  }

  static optsSubSystemVersion() {
    return toText(printf("Specify subsystem version of this assembly"));
  }

  static optsTargetProfile() {
    return toText(printf("Specify target framework profile of this assembly. Valid values are mscorlib, netcore or netstandard. Default - mscorlib"));
  }

  static optsEmitDebugInfoInQuotations() {
    return toText(printf("Emit debug information in quotations"));
  }

  static optsPreferredUiLang() {
    return toText(printf("Specify the preferred output language culture name (e.g. es-ES, ja-JP)"));
  }

  static optsNoCopyFsharpCore() {
    return toText(printf("Don't copy FSharp.Core.dll along the produced binaries"));
  }

  static optsInvalidSubSystemVersion(a0) {
    return [1051, toText(printf("Invalid version '%s' for '--subsystemversion'. The version must be 4.00 or greater."))(a0)];
  }

  static optsInvalidTargetProfile(a0) {
    return [1052, toText(printf("Invalid value '%s' for '--targetprofile', valid values are 'mscorlib', 'netcore' or 'netstandard'."))(a0)];
  }

  static typeInfoFullName() {
    return toText(printf("Full name"));
  }

  static typeInfoOtherOverloads(a0) {
    return toText(printf("and %d other overloads"))(a0);
  }

  static typeInfoUnionCase() {
    return toText(printf("union case"));
  }

  static typeInfoActivePatternResult() {
    return toText(printf("active pattern result"));
  }

  static typeInfoActiveRecognizer() {
    return toText(printf("active recognizer"));
  }

  static typeInfoField() {
    return toText(printf("field"));
  }

  static typeInfoEvent() {
    return toText(printf("event"));
  }

  static typeInfoProperty() {
    return toText(printf("property"));
  }

  static typeInfoExtension() {
    return toText(printf("extension"));
  }

  static typeInfoCustomOperation() {
    return toText(printf("custom operation"));
  }

  static typeInfoArgument() {
    return toText(printf("argument"));
  }

  static typeInfoPatternVariable() {
    return toText(printf("patvar"));
  }

  static typeInfoNamespace() {
    return toText(printf("namespace"));
  }

  static typeInfoModule() {
    return toText(printf("module"));
  }

  static typeInfoNamespaceOrModule() {
    return toText(printf("namespace/module"));
  }

  static typeInfoFromFirst(a0) {
    return toText(printf("from %s"))(a0);
  }

  static typeInfoFromNext(a0) {
    return toText(printf("also from %s"))(a0);
  }

  static typeInfoGeneratedProperty() {
    return toText(printf("generated property"));
  }

  static typeInfoGeneratedType() {
    return toText(printf("generated type"));
  }

  static assemblyResolutionFoundByAssemblyFoldersKey() {
    return toText(printf("Found by AssemblyFolders registry key"));
  }

  static assemblyResolutionFoundByAssemblyFoldersExKey() {
    return toText(printf("Found by AssemblyFoldersEx registry key"));
  }

  static assemblyResolutionNetFramework() {
    return toText(printf(".NET Framework"));
  }

  static assemblyResolutionGAC() {
    return toText(printf("Global Assembly Cache"));
  }

  static recursiveClassHierarchy(a0) {
    return [1089, toText(printf("Recursive class hierarchy in type '%s'"))(a0)];
  }

  static InvalidRecursiveReferenceToAbstractSlot() {
    return [1090, toText(printf("Invalid recursive reference to an abstract slot"))];
  }

  static eventHasNonStandardType(a0, a1, a2) {
    return [1091, toText(printf("The event '%s' has a non-standard type. If this event is declared in another CLI language, you may need to access this event using the explicit %s and %s methods for the event. If this event is declared in F#, make the type of the event an instantiation of either 'IDelegateEvent<_>' or 'IEvent<_,_>'."))(a0, a1, a2)];
  }

  static typeIsNotAccessible(a0) {
    return [1092, toText(printf("The type '%s' is not accessible from this code location"))(a0)];
  }

  static unionCasesAreNotAccessible(a0) {
    return [1093, toText(printf("The union cases or fields of the type '%s' are not accessible from this code location"))(a0)];
  }

  static valueIsNotAccessible(a0) {
    return [1094, toText(printf("The value '%s' is not accessible from this code location"))(a0)];
  }

  static unionCaseIsNotAccessible(a0) {
    return [1095, toText(printf("The union case '%s' is not accessible from this code location"))(a0)];
  }

  static fieldIsNotAccessible(a0) {
    return [1096, toText(printf("The record, struct or class field '%s' is not accessible from this code location"))(a0)];
  }

  static structOrClassFieldIsNotAccessible(a0) {
    return [1097, toText(printf("The struct or class field '%s' is not accessible from this code location"))(a0)];
  }

  static experimentalConstruct() {
    return toText(printf("This construct is experimental"));
  }

  static noInvokeMethodsFound() {
    return [1099, toText(printf("No Invoke methods found for delegate type"))];
  }

  static moreThanOneInvokeMethodFound() {
    return toText(printf("More than one Invoke method found for delegate type"));
  }

  static delegatesNotAllowedToHaveCurriedSignatures() {
    return [1101, toText(printf("Delegates are not allowed to have curried signatures"))];
  }

  static tlrUnexpectedTExpr() {
    return [1102, toText(printf("Unexpected Expr.TyChoose"))];
  }

  static tlrLambdaLiftingOptimizationsNotApplied() {
    return [1103, toText(printf("Note: Lambda-lifting optimizations have not been applied because of the use of this local constrained generic function as a first class value. Adding type constraints may resolve this condition."))];
  }

  static lexhlpIdentifiersContainingAtSymbolReserved() {
    return [1104, toText(printf("Identifiers containing '@' are reserved for use in F# code generation"))];
  }

  static lexhlpIdentifierReserved(a0) {
    return toText(printf("The identifier '%s' is reserved for future use by F#"))(a0);
  }

  static patcMissingVariable(a0) {
    return [1106, toText(printf("Missing variable '%s'"))(a0)];
  }

  static patcPartialActivePatternsGenerateOneResult() {
    return [1107, toText(printf("Partial active patterns may only generate one result"))];
  }

  static impTypeRequiredUnavailable(a0, a1) {
    return [1108, toText(printf("The type '%s' is required here and is unavailable. You must add a reference to assembly '%s'."))(a0, a1)];
  }

  static impReferencedTypeCouldNotBeFoundInAssembly(a0, a1) {
    return [1109, toText(printf("A reference to the type '%s' in assembly '%s' was found, but the type could not be found in that assembly"))(a0, a1)];
  }

  static impNotEnoughTypeParamsInScopeWhileImporting() {
    return [1110, toText(printf("Internal error or badly formed metadata: not enough type parameters were in scope while importing"))];
  }

  static impReferenceToDllRequiredByAssembly(a0, a1, a2) {
    return [1111, toText(printf("A reference to the DLL %s is required by assembly %s. The imported type %s is located in the first assembly and could not be resolved."))(a0, a1, a2)];
  }

  static impImportedAssemblyUsesNotPublicType(a0) {
    return [1112, toText(printf("An imported assembly uses the type '%s' but that type is not public"))(a0)];
  }

  static optValueMarkedInlineButIncomplete(a0) {
    return [1113, toText(printf("The value '%s' was marked inline but its implementation makes use of an internal or private function which is not sufficiently accessible"))(a0)];
  }

  static optValueMarkedInlineButWasNotBoundInTheOptEnv(a0) {
    return [1114, toText(printf("The value '%s' was marked inline but was not bound in the optimization environment"))(a0)];
  }

  static optLocalValueNotFoundDuringOptimization(a0) {
    return [1115, toText(printf("Local value %s not found during optimization"))(a0)];
  }

  static optValueMarkedInlineHasUnexpectedValue() {
    return [1116, toText(printf("A value marked as 'inline' has an unexpected value"))];
  }

  static optValueMarkedInlineCouldNotBeInlined() {
    return [1117, toText(printf("A value marked as 'inline' could not be inlined"))];
  }

  static optFailedToInlineValue(a0) {
    return [1118, toText(printf("Failed to inline the value '%s' marked 'inline', perhaps because a recursive value was marked 'inline'"))(a0)];
  }

  static optRecursiveValValue(a0) {
    return [1119, toText(printf("Recursive ValValue %s"))(a0)];
  }

  static lexfltIncorrentIndentationOfIn() {
    return toText(printf("The indentation of this 'in' token is incorrect with respect to the corresponding 'let'"));
  }

  static lexfltTokenIsOffsideOfContextStartedEarlier(a0) {
    return toText(printf("Possible incorrect indentation: this token is offside of context started at position %s. Try indenting this token further or using standard formatting conventions."))(a0);
  }

  static lexfltSeparatorTokensOfPatternMatchMisaligned() {
    return toText(printf("The '|' tokens separating rules of this pattern match are misaligned by one column. Consider realigning your code or using further indentation."));
  }

  static nrInvalidModuleExprType() {
    return [1123, toText(printf("Invalid module/expression/type"))];
  }

  static nrTypeInstantiationNeededToDisambiguateTypesWithSameName(a0, a1) {
    return [1124, toText(printf("Multiple types exist called '%s', taking different numbers of generic parameters. Provide a type instantiation to disambiguate the type resolution, e.g. '%s'."))(a0, a1)];
  }

  static nrTypeInstantiationIsMissingAndCouldNotBeInferred(a0, a1) {
    return [1125, toText(printf("The instantiation of the generic type '%s' is missing and can't be inferred from the arguments or return type of this member. Consider providing a type instantiation when accessing this type, e.g. '%s'."))(a0, a1)];
  }

  static nrGlobalUsedOnlyAsFirstName() {
    return [1126, toText(printf("'global' may only be used as the first name in a qualified path"))];
  }

  static nrIsNotConstructorOrLiteral() {
    return [1127, toText(printf("This is not a constructor or literal, or a constructor is being used incorrectly"))];
  }

  static nrUnexpectedEmptyLongId() {
    return [1128, toText(printf("Unexpected empty long identifier"))];
  }

  static nrRecordDoesNotContainSuchLabel(a0, a1) {
    return [1129, toText(printf("The record type '%s' does not contain a label '%s'."))(a0, a1)];
  }

  static nrInvalidFieldLabel() {
    return [1130, toText(printf("Invalid field label"))];
  }

  static nrInvalidExpression(a0) {
    return [1132, toText(printf("Invalid expression '%s'"))(a0)];
  }

  static nrNoConstructorsAvailableForType(a0) {
    return [1133, toText(printf("No constructors are available for the type '%s'"))(a0)];
  }

  static nrUnionTypeNeedsQualifiedAccess(a0, a1) {
    return [1134, toText(printf("The union type for union case '%s' was defined with the RequireQualifiedAccessAttribute. Include the name of the union type ('%s') in the name you are using."))(a0, a1)];
  }

  static nrRecordTypeNeedsQualifiedAccess(a0, a1) {
    return [1135, toText(printf("The record type for the record field '%s' was defined with the RequireQualifiedAccessAttribute. Include the name of the record type ('%s') in the name you are using."))(a0, a1)];
  }

  static ilwriteErrorCreatingPdb(a0) {
    return [1136, toText(printf("Unexpected error creating debug information file '%s'"))(a0)];
  }

  static lexOutsideIntegerRange() {
    return [1138, toText(printf("This number is outside the allowable range for this integer type"))];
  }

  static lexCharNotAllowedInOperatorNames(a0) {
    return toText(printf("'%s' is not permitted as a character in operator names and is reserved for future use"))(a0);
  }

  static lexUnexpectedChar(a0) {
    return toText(printf("Unexpected character '%s'"))(a0);
  }

  static lexByteArrayCannotEncode() {
    return [1140, toText(printf("This byte array literal contains characters that do not encode as a single byte"))];
  }

  static lexIdentEndInMarkReserved(a0) {
    return [1141, toText(printf("Identifiers followed by '%s' are reserved for future use"))(a0)];
  }

  static lexOutsideEightBitSigned() {
    return [1142, toText(printf("This number is outside the allowable range for 8-bit signed integers"))];
  }

  static lexOutsideEightBitSignedHex() {
    return [1143, toText(printf("This number is outside the allowable range for hexadecimal 8-bit signed integers"))];
  }

  static lexOutsideEightBitUnsigned() {
    return [1144, toText(printf("This number is outside the allowable range for 8-bit unsigned integers"))];
  }

  static lexOutsideSixteenBitSigned() {
    return [1145, toText(printf("This number is outside the allowable range for 16-bit signed integers"))];
  }

  static lexOutsideSixteenBitUnsigned() {
    return [1146, toText(printf("This number is outside the allowable range for 16-bit unsigned integers"))];
  }

  static lexOutsideThirtyTwoBitSigned() {
    return [1147, toText(printf("This number is outside the allowable range for 32-bit signed integers"))];
  }

  static lexOutsideThirtyTwoBitUnsigned() {
    return [1148, toText(printf("This number is outside the allowable range for 32-bit unsigned integers"))];
  }

  static lexOutsideSixtyFourBitSigned() {
    return [1149, toText(printf("This number is outside the allowable range for 64-bit signed integers"))];
  }

  static lexOutsideSixtyFourBitUnsigned() {
    return [1150, toText(printf("This number is outside the allowable range for 64-bit unsigned integers"))];
  }

  static lexOutsideNativeSigned() {
    return [1151, toText(printf("This number is outside the allowable range for signed native integers"))];
  }

  static lexOutsideNativeUnsigned() {
    return [1152, toText(printf("This number is outside the allowable range for unsigned native integers"))];
  }

  static lexInvalidFloat() {
    return [1153, toText(printf("Invalid floating point number"))];
  }

  static lexOusideDecimal() {
    return [1154, toText(printf("This number is outside the allowable range for decimal literals"))];
  }

  static lexOusideThirtyTwoBitFloat() {
    return [1155, toText(printf("This number is outside the allowable range for 32-bit floats"))];
  }

  static lexInvalidNumericLiteral() {
    return [1156, toText(printf("This is not a valid numeric literal. Valid numeric literals include 1, 0x1, 0b0001 (int), 1u (uint32), 1L (int64), 1UL (uint64), 1s (int16), 1y (sbyte), 1uy (byte), 1.0 (float), 1.0f (float32), 1.0m (decimal), 1I (BigInteger)."))];
  }

  static lexInvalidByteLiteral() {
    return [1157, toText(printf("This is not a valid byte literal"))];
  }

  static lexInvalidCharLiteral() {
    return [1158, toText(printf("This is not a valid character literal"))];
  }

  static lexThisUnicodeOnlyInStringLiterals() {
    return [1159, toText(printf("This Unicode encoding is only valid in string literals"))];
  }

  static lexTokenReserved() {
    return [1160, toText(printf("This token is reserved for future use"))];
  }

  static lexTabsNotAllowed() {
    return [1161, toText(printf("TABs are not allowed in F# code unless the #indent \"off\" option is used"))];
  }

  static lexInvalidLineNumber(a0) {
    return [1162, toText(printf("Invalid line number: '%s'"))(a0)];
  }

  static lexHashIfMustBeFirst() {
    return [1163, toText(printf("#if directive must appear as the first non-whitespace character on a line"))];
  }

  static lexHashElseNoMatchingIf() {
    return toText(printf("#else has no matching #if"));
  }

  static lexHashEndifRequiredForElse() {
    return toText(printf("#endif required for #else"));
  }

  static lexHashElseMustBeFirst() {
    return [1166, toText(printf("#else directive must appear as the first non-whitespace character on a line"))];
  }

  static lexHashEndingNoMatchingIf() {
    return toText(printf("#endif has no matching #if"));
  }

  static lexHashEndifMustBeFirst() {
    return [1168, toText(printf("#endif directive must appear as the first non-whitespace character on a line"))];
  }

  static lexHashIfMustHaveIdent() {
    return [1169, toText(printf("#if directive should be immediately followed by an identifier"))];
  }

  static lexWrongNestedHashEndif() {
    return [1170, toText(printf("Syntax error. Wrong nested #endif, unexpected tokens before it."))];
  }

  static lexHashBangMustBeFirstInFile() {
    return toText(printf("#! may only appear as the first line at the start of a file."));
  }

  static pplexExpectedSingleLineComment() {
    return [1171, toText(printf("Expected single line comment or end of line"))];
  }

  static memberOperatorDefinitionWithNoArguments(a0) {
    return [1172, toText(printf("Infix operator member '%s' has no arguments. Expected a tuple of 2 arguments, e.g. static member (+) (x,y) = ..."))(a0)];
  }

  static memberOperatorDefinitionWithNonPairArgument(a0, a1) {
    return [1173, toText(printf("Infix operator member '%s' has %d initial argument(s). Expected a tuple of 2 arguments, e.g. static member (+) (x,y) = ..."))(a0, a1)];
  }

  static memberOperatorDefinitionWithCurriedArguments(a0) {
    return [1174, toText(printf("Infix operator member '%s' has extra curried arguments. Expected a tuple of 2 arguments, e.g. static member (+) (x,y) = ..."))(a0)];
  }

  static tcFSharpCoreRequiresExplicit() {
    return [1175, toText(printf("All record, union and struct types in FSharp.Core.dll must be explicitly labelled with 'StructuralComparison' or 'NoComparison'"))];
  }

  static tcStructuralComparisonNotSatisfied1(a0, a1) {
    return [1176, toText(printf("The struct, record or union type '%s' has the 'StructuralComparison' attribute but the type parameter '%s' does not satisfy the 'comparison' constraint. Consider adding the 'comparison' constraint to the type parameter"))(a0, a1)];
  }

  static tcStructuralComparisonNotSatisfied2(a0, a1) {
    return [1177, toText(printf("The struct, record or union type '%s' has the 'StructuralComparison' attribute but the component type '%s' does not satisfy the 'comparison' constraint"))(a0, a1)];
  }

  static tcNoComparisonNeeded1(a0, a1, a2) {
    return [1178, toText(printf("The struct, record or union type '%s' is not structurally comparable because the type parameter %s does not satisfy the 'comparison' constraint. Consider adding the 'NoComparison' attribute to the type '%s' to clarify that the type is not comparable"))(a0, a1, a2)];
  }

  static tcNoComparisonNeeded2(a0, a1, a2) {
    return [1178, toText(printf("The struct, record or union type '%s' is not structurally comparable because the type '%s' does not satisfy the 'comparison' constraint. Consider adding the 'NoComparison' attribute to the type '%s' to clarify that the type is not comparable"))(a0, a1, a2)];
  }

  static tcNoEqualityNeeded1(a0, a1, a2) {
    return [1178, toText(printf("The struct, record or union type '%s' does not support structural equality because the type parameter %s does not satisfy the 'equality' constraint. Consider adding the 'NoEquality' attribute to the type '%s' to clarify that the type does not support structural equality"))(a0, a1, a2)];
  }

  static tcNoEqualityNeeded2(a0, a1, a2) {
    return [1178, toText(printf("The struct, record or union type '%s' does not support structural equality because the type '%s' does not satisfy the 'equality' constraint. Consider adding the 'NoEquality' attribute to the type '%s' to clarify that the type does not support structural equality"))(a0, a1, a2)];
  }

  static tcStructuralEqualityNotSatisfied1(a0, a1) {
    return [1179, toText(printf("The struct, record or union type '%s' has the 'StructuralEquality' attribute but the type parameter '%s' does not satisfy the 'equality' constraint. Consider adding the 'equality' constraint to the type parameter"))(a0, a1)];
  }

  static tcStructuralEqualityNotSatisfied2(a0, a1) {
    return [1180, toText(printf("The struct, record or union type '%s' has the 'StructuralEquality' attribute but the component type '%s' does not satisfy the 'equality' constraint"))(a0, a1)];
  }

  static tcStructsMustDeclareTypesOfImplicitCtorArgsExplicitly() {
    return [1181, toText(printf("Each argument of the primary constructor for a struct must be given a type, for example 'type S(x1:int, x2: int) = ...'. These arguments determine the fields of the struct."))];
  }

  static chkUnusedValue(a0) {
    return [1182, toText(printf("The value '%s' is unused"))(a0)];
  }

  static chkUnusedThisVariable(a0) {
    return [1183, toText(printf("The recursive object reference '%s' is unused. The presence of a recursive object reference adds runtime initialization checks to members in this and derived types. Consider removing this recursive object reference."))(a0)];
  }

  static parsGetterAtMostOneArgument() {
    return [1184, toText(printf("A getter property may have at most one argument group"))];
  }

  static parsSetterAtMostTwoArguments() {
    return [1185, toText(printf("A setter property may have at most two argument groups"))];
  }

  static parsInvalidProperty() {
    return [1186, toText(printf("Invalid property getter or setter"))];
  }

  static parsIndexerPropertyRequiresAtLeastOneArgument() {
    return [1187, toText(printf("An indexer property must be given at least one argument"))];
  }

  static tastInvalidAddressOfMutableAcrossAssemblyBoundary() {
    return [1188, toText(printf("This operation accesses a mutable top-level value defined in another assembly in an unsupported way. The value cannot be accessed through its address. Consider copying the expression to a mutable local, e.g. 'let mutable x = ...', and if necessary assigning the value back after the completion of the operation"))];
  }

  static parsNonAdjacentTypars() {
    return [1189, toText(printf("Type parameters must be placed directly adjacent to the type name, e.g. \"type C<'T>\", not     type \"C   <'T>\""))];
  }

  static parsNonAdjacentTyargs() {
    return [1190, toText(printf("Type arguments must be placed directly adjacent to the type name, e.g. \"C<'T>\", not \"C  <'T>\""))];
  }

  static parsNonAtomicType() {
    return toText(printf("The use of the type syntax 'int C' and 'C  <int>' is not permitted here. Consider adjusting this type to be written in the form 'C<int>'"));
  }

  static tastUndefinedItemRefModuleNamespace(a0, a1, a2) {
    return [1193, toText(printf("The module/namespace '%s' from compilation unit '%s' did not contain the module/namespace '%s'"))(a0, a1, a2)];
  }

  static tastUndefinedItemRefVal(a0, a1, a2) {
    return [1194, toText(printf("The module/namespace '%s' from compilation unit '%s' did not contain the val '%s'"))(a0, a1, a2)];
  }

  static tastUndefinedItemRefModuleNamespaceType(a0, a1, a2) {
    return [1195, toText(printf("The module/namespace '%s' from compilation unit '%s' did not contain the namespace, module or type '%s'"))(a0, a1, a2)];
  }

  static tcInvalidUseNullAsTrueValue() {
    return [1196, toText(printf("The 'UseNullAsTrueValue' attribute flag may only be used with union types that have one nullary case and at least one non-nullary case"))];
  }

  static tcParameterInferredByref(a0) {
    return [1197, toText(printf("The parameter '%s' was inferred to have byref type. Parameters of byref type must be given an explicit type annotation, e.g. 'x1: byref<int>'. When used, a byref parameter is implicitly dereferenced."))(a0)];
  }

  static tcNonUniformMemberUse(a0) {
    return [1198, toText(printf("The generic member '%s' has been used at a non-uniform instantiation prior to this program point. Consider reordering the members so this member occurs first. Alternatively, specify the full type of the member explicitly, including argument types, return type and any additional generic parameters and constraints."))(a0)];
  }

  static tcAttribArgsDiffer(a0) {
    return [1200, toText(printf("The attribute '%s' appears in both the implementation and the signature, but the attribute arguments differ. Only the attribute from the signature will be included in the compiled code."))(a0)];
  }

  static tcCannotCallAbstractBaseMember(a0) {
    return [1201, toText(printf("Cannot call an abstract base member: '%s'"))(a0)];
  }

  static typrelCannotResolveAmbiguityInUnmanaged() {
    return [1202, toText(printf("Could not resolve the ambiguity in the use of a generic construct with an 'unmanaged' constraint at or near this position"))];
  }

  static mlCompatMessage(a0) {
    return toText(printf("This construct is for ML compatibility. %s. You can disable this warning by using '--mlcompatibility' or '--nowarn:62'."))(a0);
  }

  static ilFieldDoesNotHaveValidOffsetForStructureLayout(a0, a1) {
    return [1206, toText(printf("The type '%s' has been marked as having an Explicit layout, but the field '%s' has not been marked with the 'FieldOffset' attribute"))(a0, a1)];
  }

  static tcInterfacesShouldUseInheritNotInterface() {
    return [1207, toText(printf("Interfaces inherited by other interfaces should be declared using 'inherit ...' instead of 'interface ...'"))];
  }

  static parsInvalidPrefixOperator() {
    return [1208, toText(printf("Invalid prefix operator"))];
  }

  static parsInvalidPrefixOperatorDefinition() {
    return [1208, toText(printf("Invalid operator definition. Prefix operator definitions must use a valid prefix operator name."))];
  }

  static buildCompilingExtensionIsForML() {
    return toText(printf("The file extensions '.ml' and '.mli' are for ML compatibility"));
  }

  static lexIndentOffForML() {
    return toText(printf("Consider using a file with extension '.ml' or '.mli' instead"));
  }

  static activePatternIdentIsNotFunctionTyped(a0) {
    return [1209, toText(printf("Active pattern '%s' is not a function"))(a0)];
  }

  static activePatternChoiceHasFreeTypars(a0) {
    return [1210, toText(printf("Active pattern '%s' has a result type containing type variables that are not determined by the input. The common cause is a when a result case is not mentioned, e.g. 'let (|A|B|) (x:int) = A x'. This can be fixed with a type constraint, e.g. 'let (|A|B|) (x:int) : Choice<int,unit> = A x'"))(a0)];
  }

  static ilFieldHasOffsetForSequentialLayout() {
    return [1211, toText(printf("The FieldOffset attribute can only be placed on members of types marked with the StructLayout(LayoutKind.Explicit)"))];
  }

  static tcOptionalArgsMustComeAfterNonOptionalArgs() {
    return [1212, toText(printf("Optional arguments must come at the end of the argument list, after any non-optional arguments"))];
  }

  static tcConditionalAttributeUsage() {
    return [1213, toText(printf("Attribute 'System.Diagnostics.ConditionalAttribute' is only valid on methods or attribute classes"))];
  }

  static tcMemberOperatorDefinitionInExtrinsic() {
    return [1215, toText(printf("Extension members cannot provide operator overloads.  Consider defining the operator as part of the type definition instead."))];
  }

  static ilwriteMDBFileNameCannotBeChangedWarning() {
    return [1216, toText(printf("The name of the MDB file must be <assembly-file-name>.mdb. The --pdb option will be ignored."))];
  }

  static ilwriteMDBMemberMissing(a0) {
    return [1217, toText(printf("MDB generation failed. Could not find compatible member %s"))(a0)];
  }

  static ilwriteErrorCreatingMdb() {
    return [1218, toText(printf("Cannot generate MDB debug information. Failed to load the 'MonoSymbolWriter' type from the 'Mono.CompilerServices.SymbolWriter.dll' assembly."))];
  }

  static tcUnionCaseNameConflictsWithGeneratedType(a0, a1) {
    return [1219, toText(printf("The union case named '%s' conflicts with the generated type '%s'"))(a0, a1)];
  }

  static chkNoReflectedDefinitionOnStructMember() {
    return [1220, toText(printf("ReflectedDefinitionAttribute may not be applied to an instance member on a struct type, because the instance member takes an implicit 'this' byref parameter"))];
  }

  static tcDllImportNotAllowed() {
    return [1221, toText(printf("DLLImport bindings must be static members in a class or function definitions in a module"))];
  }

  static buildExplicitCoreLibRequiresNoFramework(a0) {
    return [1222, toText(printf("When mscorlib.dll or FSharp.Core.dll is explicitly referenced the %s option must also be passed"))(a0)];
  }

  static buildExpectedSigdataFile(a0) {
    return [1223, toText(printf("FSharp.Core.sigdata not found alongside FSharp.Core. File expected in %s. Consider upgrading to a more recent version of FSharp.Core, where this file is no longer be required."))(a0)];
  }

  static buildExpectedFileAlongSideFSharpCore(a0, a1) {
    return [1225, toText(printf("File '%s' not found alongside FSharp.Core. File expected in %s. Consider upgrading to a more recent version of FSharp.Core, where this file is no longer be required."))(a0, a1)];
  }

  static buildUnexpectedFileNameCharacter(a0, a1) {
    return [1227, toText(printf("Filename '%s' contains invalid character '%s'"))(a0, a1)];
  }

  static tcInvalidUseBangBinding() {
    return [1228, toText(printf("'use!' bindings must be of the form 'use! <var> = <expr>'"))];
  }

  static crefNoInnerGenericsInQuotations() {
    return [1230, toText(printf("Inner generic functions are not permitted in quoted expressions. Consider adding some type constraints until this function is no longer generic."))];
  }

  static tcEnumTypeCannotBeEnumerated(a0) {
    return [1231, toText(printf("The type '%s' is not a valid enumerator type , i.e. does not have a 'MoveNext()' method returning a bool, and a 'Current' property"))(a0)];
  }

  static parsEofInTripleQuoteString() {
    return [1232, toText(printf("End of file in triple-quote string begun at or before here"))];
  }

  static parsEofInTripleQuoteStringInComment() {
    return [1233, toText(printf("End of file in triple-quote string embedded in comment begun at or before here"))];
  }

  static tcTypeTestLosesMeasures(a0) {
    return [1240, toText(printf("This type test or downcast will ignore the unit-of-measure '%s'"))(a0)];
  }

  static parsMissingTypeArgs() {
    return [1241, toText(printf("Expected type argument or static argument"))];
  }

  static parsMissingGreaterThan() {
    return [1242, toText(printf("Unmatched '<'. Expected closing '>'"))];
  }

  static parsUnexpectedQuotationOperatorInTypeAliasDidYouMeanVerbatimString() {
    return [1243, toText(printf("Unexpected quotation operator '<@' in type definition. If you intend to pass a verbatim string as a static argument to a type provider, put a space between the '<' and '@' characters."))];
  }

  static parsErrorParsingAsOperatorName() {
    return [1244, toText(printf("Attempted to parse this as an operator name, but failed"))];
  }

  static lexInvalidUnicodeLiteral(a0) {
    return [1245, toText(printf("\\U%s is not a valid Unicode character escape sequence"))(a0)];
  }

  static tcCallerInfoWrongType(a0, a1, a2) {
    return [1246, toText(printf("'%s' must be applied to an argument of type '%s', but has been applied to an argument of type '%s'"))(a0, a1, a2)];
  }

  static tcCallerInfoNotOptional(a0) {
    return [1247, toText(printf("'%s' can only be applied to optional arguments"))(a0)];
  }

  static toolLocationHelperUnsupportedFrameworkVersion(a0) {
    return [1300, toText(printf("The specified .NET Framework version '%s' is not supported. Please specify a value from the enumeration Microsoft.Build.Utilities.TargetDotNetFrameworkVersion."))(a0)];
  }

  static ilSignInvalidMagicValue() {
    return [1301, toText(printf("Invalid Magic value in CLR Header"))];
  }

  static ilSignBadImageFormat() {
    return [1302, toText(printf("Bad image format"))];
  }

  static ilSignPrivateKeyExpected() {
    return [1303, toText(printf("Private key expected"))];
  }

  static ilSignRsaKeyExpected() {
    return [1304, toText(printf("RSA key expected"))];
  }

  static ilSignInvalidBitLen() {
    return [1305, toText(printf("Invalid bit Length"))];
  }

  static ilSignInvalidRSAParams() {
    return [1306, toText(printf("Invalid RSAParameters structure - '{0}' expected"))];
  }

  static ilSignInvalidAlgId() {
    return [1307, toText(printf("Invalid algId - 'Exponent' expected"))];
  }

  static ilSignInvalidSignatureSize() {
    return [1308, toText(printf("Invalid signature size"))];
  }

  static ilSignNoSignatureDirectory() {
    return [1309, toText(printf("No signature directory"))];
  }

  static ilSignInvalidPKBlob() {
    return [1310, toText(printf("Invalid Public Key blob"))];
  }

  static fscTooManyErrors() {
    return toText(printf("Exiting - too many errors"));
  }

  static docfileNoXmlSuffix() {
    return [2001, toText(printf("The documentation file has no .xml suffix"))];
  }

  static fscNoImplementationFiles() {
    return [2002, toText(printf("No implementation files specified"))];
  }

  static fscBadAssemblyVersion(a0, a1) {
    return [2003, toText(printf("An %s specified version '%s', but this value is invalid and has been ignored"))(a0, a1)];
  }

  static fscTwoResourceManifests() {
    return [2004, toText(printf("Conflicting options specified: 'win32manifest' and 'win32res'. Only one of these can be used."))];
  }

  static fscQuotationLiteralsStaticLinking(a0) {
    return [2005, toText(printf("The code in assembly '%s' makes uses of quotation literals. Static linking may not include components that make use of quotation literals unless all assemblies are compiled with at least F# 4.0."))(a0)];
  }

  static fscQuotationLiteralsStaticLinking0() {
    return [2006, toText(printf("Code in this assembly makes uses of quotation literals. Static linking may not include components that make use of quotation literals unless all assemblies are compiled with at least F# 4.0."))];
  }

  static fscStaticLinkingNoEXE() {
    return [2007, toText(printf("Static linking may not include a .EXE"))];
  }

  static fscStaticLinkingNoMixedDLL() {
    return [2008, toText(printf("Static linking may not include a mixed managed/unmanaged DLL"))];
  }

  static fscIgnoringMixedWhenLinking(a0) {
    return [2009, toText(printf("Ignoring mixed managed/unmanaged assembly '%s' during static linking"))(a0)];
  }

  static fscAssumeStaticLinkContainsNoDependencies(a0) {
    return [2011, toText(printf("Assembly '%s' was referenced transitively and the assembly could not be resolved automatically. Static linking will assume this DLL has no dependencies on the F# library or other statically linked DLLs. Consider adding an explicit reference to this DLL."))(a0)];
  }

  static fscAssemblyNotFoundInDependencySet(a0) {
    return [2012, toText(printf("Assembly '%s' not found in dependency set of target binary. Statically linked roots should be specified using an assembly name, without a DLL or EXE extension. If this assembly was referenced explicitly then it is possible the assembly was not actually required by the generated binary, in which case it should not be statically linked."))(a0)];
  }

  static fscKeyFileCouldNotBeOpened(a0) {
    return [2013, toText(printf("The key file '%s' could not be opened"))(a0)];
  }

  static fscProblemWritingBinary(a0, a1) {
    return [2014, toText(printf("A problem occurred writing the binary '%s': %s"))(a0, a1)];
  }

  static fscAssemblyVersionAttributeIgnored() {
    return [2015, toText(printf("The 'AssemblyVersionAttribute' has been ignored because a version was given using a command line option"))];
  }

  static fscAssemblyCultureAttributeError() {
    return [2016, toText(printf("Error emitting 'System.Reflection.AssemblyCultureAttribute' attribute -- 'Executables cannot be satellite assemblies, Culture should always be empty'"))];
  }

  static fscDelaySignWarning() {
    return [2017, toText(printf("Option '--delaysign' overrides attribute 'System.Reflection.AssemblyDelaySignAttribute' given in a source file or added module"))];
  }

  static fscKeyFileWarning() {
    return [2018, toText(printf("Option '--keyfile' overrides attribute 'System.Reflection.AssemblyKeyFileAttribute' given in a source file or added module"))];
  }

  static fscKeyNameWarning() {
    return [2019, toText(printf("Option '--keycontainer' overrides attribute 'System.Reflection.AssemblyNameAttribute' given in a source file or added module"))];
  }

  static fscReferenceOnCommandLine(a0) {
    return [2020, toText(printf("The assembly '%s' is listed on the command line. Assemblies should be referenced using a command line flag such as '-r'."))(a0)];
  }

  static fscRemotingError() {
    return [2021, toText(printf("The resident compilation service was not used because a problem occured in communicating with the server."))];
  }

  static pathIsInvalid(a0) {
    return [2022, toText(printf("Problem with filename '%s': Illegal characters in path."))(a0)];
  }

  static fscResxSourceFileDeprecated(a0) {
    return [2023, toText(printf("Passing a .resx file (%s) as a source file to the compiler is deprecated. Use resgen.exe to transform the .resx file into a .resources file to pass as a --resource option. If you are using MSBuild, this can be done via an <EmbeddedResource> item in the .fsproj project file."))(a0)];
  }

  static fscStaticLinkingNoProfileMismatches() {
    return [2024, toText(printf("Static linking may not be used on an assembly referencing mscorlib (e.g. a .NET Framework assembly) when generating an assembly that references System.Runtime (e.g. a .NET Core or Portable assembly)."))];
  }

  static fscAssemblyWildcardAndDeterminism(a0, a1) {
    return [2025, toText(printf("An %s specified version '%s', but this value is a wildcard, and you have requested a deterministic build, these are in conflict."))(a0, a1)];
  }

  static fscDeterministicDebugRequiresPortablePdb() {
    return [2026, toText(printf("Determinstic builds only support portable PDBs (--debug:portable or --debug:embedded)"))];
  }

  static etIllegalCharactersInNamespaceName(a0, a1) {
    return [3000, toText(printf("Character '%s' is not allowed in provided namespace name '%s'"))(a0, a1)];
  }

  static etNullOrEmptyMemberName(a0) {
    return [3001, toText(printf("The provided type '%s' returned a member with a null or empty member name"))(a0)];
  }

  static etNullMember(a0) {
    return [3002, toText(printf("The provided type '%s' returned a null member"))(a0)];
  }

  static etNullMemberDeclaringType(a0, a1) {
    return [3003, toText(printf("The provided type '%s' member info '%s' has null declaring type"))(a0, a1)];
  }

  static etNullMemberDeclaringTypeDifferentFromProvidedType(a0, a1, a2) {
    return [3004, toText(printf("The provided type '%s' has member '%s' which has declaring type '%s'. Expected declaring type to be the same as provided type."))(a0, a1, a2)];
  }

  static etHostingAssemblyFoundWithoutHosts(a0, a1) {
    return [3005, toText(printf("Referenced assembly '%s' has assembly level attribute '%s' but no public type provider classes were found"))(a0, a1)];
  }

  static etEmptyNamespaceOfTypeNotAllowed(a0, a1) {
    return [3006, toText(printf("Type '%s' from type provider '%s' has an empty namespace. Use 'null' for the global namespace."))(a0, a1)];
  }

  static etEmptyNamespaceNotAllowed(a0) {
    return [3007, toText(printf("Empty namespace found from the type provider '%s'. Use 'null' for the global namespace."))(a0)];
  }

  static etMustNotBeGeneric(a0) {
    return [3011, toText(printf("Provided type '%s' has 'IsGenericType' as true, but generic types are not supported."))(a0)];
  }

  static etMustNotBeAnArray(a0) {
    return [3013, toText(printf("Provided type '%s' has 'IsArray' as true, but array types are not supported."))(a0)];
  }

  static etMethodHasRequirements(a0, a1) {
    return [3014, toText(printf("Invalid member '%s' on provided type '%s'. Provided type members must be public, and not be generic, virtual, or abstract."))(a0, a1)];
  }

  static etUnsupportedMemberKind(a0, a1) {
    return [3015, toText(printf("Invalid member '%s' on provided type '%s'. Only properties, methods and constructors are allowed"))(a0, a1)];
  }

  static etPropertyCanReadButHasNoGetter(a0, a1) {
    return [3016, toText(printf("Property '%s' on provided type '%s' has CanRead=true but there was no value from GetGetMethod()"))(a0, a1)];
  }

  static etPropertyHasGetterButNoCanRead(a0, a1) {
    return [3017, toText(printf("Property '%s' on provided type '%s' has CanRead=false but GetGetMethod() returned a method"))(a0, a1)];
  }

  static etPropertyCanWriteButHasNoSetter(a0, a1) {
    return [3018, toText(printf("Property '%s' on provided type '%s' has CanWrite=true but there was no value from GetSetMethod()"))(a0, a1)];
  }

  static etPropertyHasSetterButNoCanWrite(a0, a1) {
    return [3019, toText(printf("Property '%s' on provided type '%s' has CanWrite=false but GetSetMethod() returned a method"))(a0, a1)];
  }

  static etOneOrMoreErrorsSeenDuringExtensionTypeSetting() {
    return [3020, toText(printf("One or more errors seen during provided type setup"))];
  }

  static etUnexpectedExceptionFromProvidedTypeMember(a0, a1, a2) {
    return [3021, toText(printf("Unexpected exception from provided type '%s' member '%s': %s"))(a0, a1, a2)];
  }

  static etUnsupportedConstantType(a0) {
    return [3022, toText(printf("Unsupported constant type '%s'. Quotations provided by type providers can only contain simple constants. The implementation of the type provider may need to be adjusted by moving a value declared outside a provided quotation literal to be a 'let' binding inside the quotation literal."))(a0)];
  }

  static etUnsupportedProvidedExpression(a0) {
    return [3025, toText(printf("Unsupported expression '%s' from type provider. If you are the author of this type provider, consider adjusting it to provide a different provided expression."))(a0)];
  }

  static etProvidedTypeHasUnexpectedName(a0, a1) {
    return [3028, toText(printf("Expected provided type named '%s' but provided type has 'Name' with value '%s'"))(a0, a1)];
  }

  static etEventNoAdd(a0, a1) {
    return [3029, toText(printf("Event '%s' on provided type '%s' has no value from GetAddMethod()"))(a0, a1)];
  }

  static etEventNoRemove(a0, a1) {
    return [3030, toText(printf("Event '%s' on provided type '%s' has no value from GetRemoveMethod()"))(a0, a1)];
  }

  static etProviderHasWrongDesignerAssembly(a0, a1, a2) {
    return [3031, toText(printf("Assembly attribute '%s' refers to a designer assembly '%s' which cannot be loaded or doesn't exist. %s"))(a0, a1, a2)];
  }

  static etProviderDoesNotHaveValidConstructor() {
    return [3032, toText(printf("The type provider does not have a valid constructor. A constructor taking either no arguments or one argument of type 'TypeProviderConfig' was expected."))];
  }

  static etProviderError(a0, a1) {
    return [3033, toText(printf("The type provider '%s' reported an error: %s"))(a0, a1)];
  }

  static etIncorrectParameterExpression(a0, a1) {
    return [3034, toText(printf("The type provider '%s' used an invalid parameter in the ParameterExpression: %s"))(a0, a1)];
  }

  static etIncorrectProvidedMethod(a0, a1, a2, a3) {
    return [3035, toText(printf("The type provider '%s' provided a method with a name '%s' and metadata token '%d', which is not reported among its methods of its declaring type '%s'"))(a0, a1, a2, a3)];
  }

  static etIncorrectProvidedConstructor(a0, a1) {
    return [3036, toText(printf("The type provider '%s' provided a constructor which is not reported among the constructors of its declaring type '%s'"))(a0, a1)];
  }

  static etDirectReferenceToGeneratedTypeNotAllowed(a0) {
    return [3039, toText(printf("A direct reference to the generated type '%s' is not permitted. Instead, use a type definition, e.g. 'type TypeAlias = <path>'. This indicates that a type provider adds generated types to your assembly."))(a0)];
  }

  static etProvidedTypeHasUnexpectedPath(a0, a1) {
    return [3041, toText(printf("Expected provided type with path '%s' but provided type has path '%s'"))(a0, a1)];
  }

  static etUnexpectedNullFromProvidedTypeMember(a0, a1) {
    return [3042, toText(printf("Unexpected 'null' return value from provided type '%s' member '%s'"))(a0, a1)];
  }

  static etUnexpectedExceptionFromProvidedMemberMember(a0, a1, a2, a3) {
    return [3043, toText(printf("Unexpected exception from member '%s' of provided type '%s' member '%s': %s"))(a0, a1, a2, a3)];
  }

  static etNestedProvidedTypesDoNotTakeStaticArgumentsOrGenericParameters() {
    return [3044, toText(printf("Nested provided types do not take static arguments or generic parameters"))];
  }

  static etInvalidStaticArgument(a0) {
    return [3045, toText(printf("Invalid static argument to provided type. Expected an argument of kind '%s'."))(a0)];
  }

  static etErrorApplyingStaticArgumentsToType() {
    return [3046, toText(printf("An error occured applying the static arguments to a provided type"))];
  }

  static etUnknownStaticArgumentKind(a0, a1) {
    return [3047, toText(printf("Unknown static argument kind '%s' when resolving a reference to a provided type or method '%s'"))(a0, a1)];
  }

  static invalidNamespaceForProvidedType() {
    return toText(printf("invalid namespace for provided type"));
  }

  static invalidFullNameForProvidedType() {
    return toText(printf("invalid full name for provided type"));
  }

  static etProviderReturnedNull(a0) {
    return [3051, toText(printf("The type provider returned 'null', which is not a valid return value from '%s'"))(a0)];
  }

  static etTypeProviderConstructorException(a0) {
    return [3053, toText(printf("The type provider constructor has thrown an exception: %s"))(a0)];
  }

  static etNullProvidedExpression(a0) {
    return [3056, toText(printf("Type provider '%s' returned null from GetInvokerExpression."))(a0)];
  }

  static etProvidedAppliedTypeHadWrongName(a0, a1, a2) {
    return [3057, toText(printf("The type provider '%s' returned an invalid type from 'ApplyStaticArguments'. A type with name '%s' was expected, but a type with name '%s' was returned."))(a0, a1, a2)];
  }

  static etProvidedAppliedMethodHadWrongName(a0, a1, a2) {
    return [3058, toText(printf("The type provider '%s' returned an invalid method from 'ApplyStaticArgumentsForMethod'. A method with name '%s' was expected, but a method with name '%s' was returned."))(a0, a1, a2)];
  }

  static tcTypeTestLossy(a0, a1) {
    return [3060, toText(printf("This type test or downcast will erase the provided type '%s' to the type '%s'"))(a0, a1)];
  }

  static tcTypeCastErased(a0, a1) {
    return [3061, toText(printf("This downcast will erase the provided type '%s' to the type '%s'."))(a0, a1)];
  }

  static tcTypeTestErased(a0, a1) {
    return [3062, toText(printf("This type test with a provided type '%s' is not allowed because this provided type will be erased to '%s' at runtime."))(a0, a1)];
  }

  static tcCannotInheritFromErasedType() {
    return [3063, toText(printf("Cannot inherit from erased provided type"))];
  }

  static etInvalidTypeProviderAssemblyName(a0, a1) {
    return [3065, toText(printf("Assembly '%s' hase TypeProviderAssembly attribute with invalid value '%s'. The value should be a valid assembly name"))(a0, a1)];
  }

  static tcInvalidMemberNameCtor() {
    return [3066, toText(printf("Invalid member name. Members may not have name '.ctor' or '.cctor'"))];
  }

  static tcInferredGenericTypeGivesRiseToInconsistency(a0, a1) {
    return [3068, toText(printf("The function or member '%s' is used in a way that requires further type annotations at its definition to ensure consistency of inferred types. The inferred signature is '%s'."))(a0, a1)];
  }

  static tcInvalidTypeArgumentCount(a0, a1) {
    return [3069, toText(printf("The number of type arguments did not match: '%d' given, '%d' expected. This may be related to a previously reported error."))(a0, a1)];
  }

  static tcCannotOverrideSealedMethod(a0) {
    return [3070, toText(printf("Cannot override inherited member '%s' because it is sealed"))(a0)];
  }

  static etProviderErrorWithContext(a0, a1, a2, a3) {
    return [3071, toText(printf("The type provider '%s' reported an error in the context of provided type '%s', member '%s'. The error: %s"))(a0, a1, a2, a3)];
  }

  static etProvidedTypeWithNameException(a0, a1) {
    return [3072, toText(printf("An exception occurred when accessing the '%s' of a provided type: %s"))(a0, a1)];
  }

  static etProvidedTypeWithNullOrEmptyName(a0) {
    return [3073, toText(printf("The '%s' of a provided type was null or empty."))(a0)];
  }

  static etIllegalCharactersInTypeName(a0, a1) {
    return [3075, toText(printf("Character '%s' is not allowed in provided type name '%s'"))(a0, a1)];
  }

  static tcJoinMustUseSimplePattern(a0) {
    return [3077, toText(printf("In queries, '%s' must use a simple pattern"))(a0)];
  }

  static tcMissingCustomOperation(a0) {
    return [3078, toText(printf("A custom query operation for '%s' is required but not specified"))(a0)];
  }

  static etBadUnnamedStaticArgs() {
    return [3080, toText(printf("Named static arguments must come after all unnamed static arguments"))];
  }

  static etStaticParameterRequiresAValue(a0, a1, a2, a3) {
    return [3081, toText(printf("The static parameter '%s' of the provided type or method '%s' requires a value. Static parameters to type providers may be optionally specified using named arguments, e.g. '%s<%s=...>'."))(a0, a1, a2, a3)];
  }

  static etNoStaticParameterWithName(a0) {
    return [3082, toText(printf("No static parameter exists with name '%s'"))(a0)];
  }

  static etStaticParameterAlreadyHasValue(a0) {
    return [3083, toText(printf("The static parameter '%s' has already been given a value"))(a0)];
  }

  static etMultipleStaticParameterWithName(a0) {
    return [3084, toText(printf("Multiple static parameters exist with name '%s'"))(a0)];
  }

  static tcCustomOperationMayNotBeUsedInConjunctionWithNonSimpleLetBindings() {
    return [3085, toText(printf("A custom operation may not be used in conjunction with a non-value or recursive 'let' binding in another part of this computation expression"))];
  }

  static tcCustomOperationMayNotBeUsedHere() {
    return [3086, toText(printf("A custom operation may not be used in conjunction with 'use', 'try/with', 'try/finally', 'if/then/else' or 'match' operators within this computation expression"))];
  }

  static tcCustomOperationMayNotBeOverloaded(a0) {
    return [3087, toText(printf("The custom operation '%s' refers to a method which is overloaded. The implementations of custom operations may not be overloaded."))(a0)];
  }

  static tcIfThenElseMayNotBeUsedWithinQueries() {
    return [3090, toText(printf("An if/then/else expression may not be used within queries. Consider using either an if/then expression, or use a sequence expression instead."))];
  }

  static ilxgenUnexpectedArgumentToMethodHandleOfDuringCodegen() {
    return [3091, toText(printf("Invalid argument to 'methodhandleof' during codegen"))];
  }

  static etProvidedTypeReferenceMissingArgument(a0) {
    return [3092, toText(printf("A reference to a provided type was missing a value for the static parameter '%s'. You may need to recompile one or more referenced assemblies."))(a0)];
  }

  static etProvidedTypeReferenceInvalidText(a0) {
    return [3093, toText(printf("A reference to a provided type had an invalid value '%s' for a static parameter. You may need to recompile one or more referenced assemblies."))(a0)];
  }

  static tcCustomOperationNotUsedCorrectly(a0) {
    return [3095, toText(printf("'%s' is not used correctly. This is a custom operation in this query or computation expression."))(a0)];
  }

  static tcCustomOperationNotUsedCorrectly2(a0, a1) {
    return [3095, toText(printf("'%s' is not used correctly. Usage: %s. This is a custom operation in this query or computation expression."))(a0, a1)];
  }

  static customOperationTextLikeJoin(a0, a1, a2) {
    return toText(printf("%s var in collection %s (outerKey = innerKey). Note that parentheses are required after '%s'"))(a0, a1, a2);
  }

  static customOperationTextLikeGroupJoin(a0, a1, a2) {
    return toText(printf("%s var in collection %s (outerKey = innerKey) into group. Note that parentheses are required after '%s'"))(a0, a1, a2);
  }

  static customOperationTextLikeZip(a0) {
    return toText(printf("%s var in collection"))(a0);
  }

  static tcBinaryOperatorRequiresVariable(a0, a1) {
    return [3096, toText(printf("'%s' must be followed by a variable name. Usage: %s."))(a0, a1)];
  }

  static tcOperatorIncorrectSyntax(a0, a1) {
    return [3097, toText(printf("Incorrect syntax for '%s'. Usage: %s."))(a0, a1)];
  }

  static tcBinaryOperatorRequiresBody(a0, a1) {
    return [3098, toText(printf("'%s' must come after a 'for' selection clause and be followed by the rest of the query. Syntax: ... %s ..."))(a0, a1)];
  }

  static tcCustomOperationHasIncorrectArgCount(a0, a1, a2) {
    return [3099, toText(printf("'%s' is used with an incorrect number of arguments. This is a custom operation in this query or computation expression. Expected %d argument(s), but given %d."))(a0, a1, a2)];
  }

  static parsExpectedExpressionAfterToken() {
    return [3100, toText(printf("Expected an expression after this point"))];
  }

  static parsExpectedTypeAfterToken() {
    return [3101, toText(printf("Expected a type after this point"))];
  }

  static parsUnmatchedLBrackLess() {
    return [3102, toText(printf("Unmatched '[<'. Expected closing '>]'"))];
  }

  static parsUnexpectedEndOfFileMatch() {
    return [3103, toText(printf("Unexpected end of input in 'match' expression. Expected 'match <expr> with | <pat> -> <expr> | <pat> -> <expr> ...'."))];
  }

  static parsUnexpectedEndOfFileTry() {
    return [3104, toText(printf("Unexpected end of input in 'try' expression. Expected 'try <expr> with <rules>' or 'try <expr> finally <expr>'."))];
  }

  static parsUnexpectedEndOfFileWhile() {
    return [3105, toText(printf("Unexpected end of input in 'while' expression. Expected 'while <expr> do <expr>'."))];
  }

  static parsUnexpectedEndOfFileFor() {
    return [3106, toText(printf("Unexpected end of input in 'for' expression. Expected 'for <pat> in <expr> do <expr>'."))];
  }

  static parsUnexpectedEndOfFileWith() {
    return [3107, toText(printf("Unexpected end of input in 'match' or 'try' expression"))];
  }

  static parsUnexpectedEndOfFileThen() {
    return [3108, toText(printf("Unexpected end of input in 'then' branch of conditional expression. Expected 'if <expr> then <expr>' or 'if <expr> then <expr> else <expr>'."))];
  }

  static parsUnexpectedEndOfFileElse() {
    return [3109, toText(printf("Unexpected end of input in 'else' branch of conditional expression. Expected 'if <expr> then <expr>' or 'if <expr> then <expr> else <expr>'."))];
  }

  static parsUnexpectedEndOfFileFunBody() {
    return [3110, toText(printf("Unexpected end of input in body of lambda expression. Expected 'fun <pat> ... <pat> -> <expr>'."))];
  }

  static parsUnexpectedEndOfFileTypeArgs() {
    return [3111, toText(printf("Unexpected end of input in type arguments"))];
  }

  static parsUnexpectedEndOfFileTypeSignature() {
    return [3112, toText(printf("Unexpected end of input in type signature"))];
  }

  static parsUnexpectedEndOfFileTypeDefinition() {
    return [3113, toText(printf("Unexpected end of input in type definition"))];
  }

  static parsUnexpectedEndOfFileObjectMembers() {
    return [3114, toText(printf("Unexpected end of input in object members"))];
  }

  static parsUnexpectedEndOfFileDefinition() {
    return [3115, toText(printf("Unexpected end of input in value, function or member definition"))];
  }

  static parsUnexpectedEndOfFileExpression() {
    return [3116, toText(printf("Unexpected end of input in expression"))];
  }

  static parsExpectedNameAfterToken() {
    return [3117, toText(printf("Unexpected end of type. Expected a name after this point."))];
  }

  static parsUnmatchedLet() {
    return [3118, toText(printf("Incomplete value or function definition. If this is in an expression, the body of the expression must be indented to the same column as the 'let' keyword."))];
  }

  static parsUnmatchedLetBang() {
    return [3119, toText(printf("Incomplete value definition. If this is in an expression, the body of the expression must be indented to the same column as the 'let!' keyword."))];
  }

  static parsUnmatchedUseBang() {
    return [3120, toText(printf("Incomplete value definition. If this is in an expression, the body of the expression must be indented to the same column as the 'use!' keyword."))];
  }

  static parsUnmatchedUse() {
    return [3121, toText(printf("Incomplete value definition. If this is in an expression, the body of the expression must be indented to the same column as the 'use' keyword."))];
  }

  static parsWhileDoExpected() {
    return [3122, toText(printf("Missing 'do' in 'while' expression. Expected 'while <expr> do <expr>'."))];
  }

  static parsForDoExpected() {
    return [3123, toText(printf("Missing 'do' in 'for' expression. Expected 'for <pat> in <expr> do <expr>'."))];
  }

  static tcInvalidRelationInJoin(a0) {
    return [3125, toText(printf("Invalid join relation in '%s'. Expected 'expr <op> expr', where <op> is =, =?, ?= or ?=?."))(a0)];
  }

  static typeInfoCallsWord() {
    return toText(printf("Calls"));
  }

  static impInvalidNumberOfGenericArguments(a0, a1, a2) {
    return [3126, toText(printf("Invalid number of generic arguments to type '%s' in provided type. Expected '%d' arguments, given '%d'."))(a0, a1, a2)];
  }

  static impInvalidMeasureArgument1(a0, a1) {
    return [3127, toText(printf("Invalid value '%s' for unit-of-measure parameter '%s'"))(a0, a1)];
  }

  static impInvalidMeasureArgument2(a0) {
    return [3127, toText(printf("Invalid value unit-of-measure parameter '%s'"))(a0)];
  }

  static etPropertyNeedsCanWriteOrCanRead(a0, a1) {
    return [3128, toText(printf("Property '%s' on provided type '%s' is neither readable nor writable as it has CanRead=false and CanWrite=false"))(a0, a1)];
  }

  static tcIntoNeedsRestOfQuery() {
    return [3129, toText(printf("A use of 'into' must be followed by the remainder of the computation"))];
  }

  static tcOperatorDoesntAcceptInto(a0) {
    return [3130, toText(printf("The operator '%s' does not accept the use of 'into'"))(a0)];
  }

  static tcCustomOperationInvalid(a0) {
    return [3131, toText(printf("The definition of the custom operator '%s' does not use a valid combination of attribute flags"))(a0)];
  }

  static tcThisTypeMayNotHaveACLIMutableAttribute() {
    return [3132, toText(printf("This type definition may not have the 'CLIMutable' attribute. Only record types may have this attribute."))];
  }

  static tcAutoPropertyRequiresImplicitConstructionSequence() {
    return [3133, toText(printf("'member val' definitions are only permitted in types with a primary constructor. Consider adding arguments to your type definition, e.g. 'type X(args) = ...'."))];
  }

  static parsMutableOnAutoPropertyShouldBeGetSet() {
    return [3134, toText(printf("Property definitions may not be declared mutable. To indicate that this property can be set, use 'member val PropertyName = expr with get,set'."))];
  }

  static parsMutableOnAutoPropertyShouldBeGetSetNotJustSet() {
    return [3135, toText(printf("To indicate that this property can be set, use 'member val PropertyName = expr with get,set'."))];
  }

  static chkNoByrefsOfByrefs(a0) {
    return [3136, toText(printf("Type '%s' is illegal because in byref<T>, T cannot contain byref types."))(a0)];
  }

  static tastopsMaxArrayThirtyTwo(a0) {
    return [3138, toText(printf("F# supports array ranks between 1 and 32. The value %d is not allowed."))(a0)];
  }

  static tcNoIntegerForLoopInQuery() {
    return [3139, toText(printf("In queries, use the form 'for x in n .. m do ...' for ranging over integers"))];
  }

  static tcNoWhileInQuery() {
    return [3140, toText(printf("'while' expressions may not be used in queries"))];
  }

  static tcNoTryFinallyInQuery() {
    return [3141, toText(printf("'try/finally' expressions may not be used in queries"))];
  }

  static tcUseMayNotBeUsedInQueries() {
    return [3142, toText(printf("'use' expressions may not be used in queries"))];
  }

  static tcBindMayNotBeUsedInQueries() {
    return [3143, toText(printf("'let!', 'use!' and 'do!' expressions may not be used in queries"))];
  }

  static tcReturnMayNotBeUsedInQueries() {
    return [3144, toText(printf("'return' and 'return!' may not be used in queries"))];
  }

  static tcUnrecognizedQueryOperator() {
    return [3145, toText(printf("This is not a known query operator. Query operators are identifiers such as 'select', 'where', 'sortBy', 'thenBy', 'groupBy', 'groupValBy', 'join', 'groupJoin', 'sumBy' and 'averageBy', defined using corresponding methods on the 'QueryBuilder' type."))];
  }

  static tcTryWithMayNotBeUsedInQueries() {
    return [3146, toText(printf("'try/with' expressions may not be used in queries"))];
  }

  static tcNonSimpleLetBindingInQuery() {
    return [3147, toText(printf("This 'let' definition may not be used in a query. Only simple value definitions may be used in queries."))];
  }

  static etTooManyStaticParameters(a0, a1, a2) {
    return [3148, toText(printf("Too many static parameters. Expected at most %d parameters, but got %d unnamed and %d named parameters."))(a0, a1, a2)];
  }

  static infosInvalidProvidedLiteralValue(a0) {
    return [3149, toText(printf("Invalid provided literal value '%s'"))(a0)];
  }

  static invalidPlatformTarget() {
    return [3150, toText(printf("The 'anycpu32bitpreferred' platform can only be used with EXE targets. You must use 'anycpu' instead."))];
  }

  static tcThisValueMayNotBeInlined() {
    return [3151, toText(printf("This member, function or value declaration may not be declared 'inline'"))];
  }

  static etErasedTypeUsedInGeneration(a0, a1) {
    return [3152, toText(printf("The provider '%s' returned a non-generated type '%s' in the context of a set of generated types. Consider adjusting the type provider to only return generated types."))(a0, a1)];
  }

  static tcUnrecognizedQueryBinaryOperator() {
    return [3153, toText(printf("Arguments to query operators may require parentheses, e.g. 'where (x > y)' or 'groupBy (x.Length / 10)'"))];
  }

  static crefNoSetOfHole() {
    return [3155, toText(printf("A quotation may not involve an assignment to or taking the address of a captured local variable"))];
  }

  static nicePrintOtherOverloads1() {
    return toText(printf("+ 1 overload"));
  }

  static nicePrintOtherOverloadsN(a0) {
    return toText(printf("+ %d overloads"))(a0);
  }

  static erasedTo() {
    return toText(printf("Erased to"));
  }

  static parsUnfinishedExpression(a0) {
    return [3156, toText(printf("Unexpected token '%s' or incomplete expression"))(a0)];
  }

  static parsAttributeOnIncompleteCode() {
    return [3158, toText(printf("Cannot find code target for this attribute, possibly because the code after the attribute is incomplete."))];
  }

  static parsTypeNameCannotBeEmpty() {
    return [3159, toText(printf("Type name cannot be empty."))];
  }

  static buildProblemReadingAssembly(a0, a1) {
    return [3160, toText(printf("Problem reading assembly '%s': %s"))(a0, a1)];
  }

  static tcTPFieldMustBeLiteral() {
    return [3161, toText(printf("Invalid provided field. Provided fields of erased provided types must be literals."))];
  }

  static loadingDescription() {
    return toText(printf("(loading description...)"));
  }

  static descriptionUnavailable() {
    return toText(printf("(description unavailable...)"));
  }

  static chkTyparMultipleClassConstraints() {
    return [3162, toText(printf("A type variable has been constrained by multiple different class types. A type variable may only have one class constraint."))];
  }

  static tcMatchMayNotBeUsedWithQuery() {
    return [3163, toText(printf("'match' expressions may not be used in queries"))];
  }

  static memberOperatorDefinitionWithNonTripleArgument(a0, a1) {
    return [3164, toText(printf("Infix operator member '%s' has %d initial argument(s). Expected a tuple of 3 arguments"))(a0, a1)];
  }

  static cannotResolveNullableOperators(a0) {
    return [3165, toText(printf("The operator '%s' cannot be resolved. Consider opening the module 'Microsoft.FSharp.Linq.NullableOperators'."))(a0)];
  }

  static tcOperatorRequiresIn(a0, a1) {
    return [3167, toText(printf("'%s' must be followed by 'in'. Usage: %s."))(a0, a1)];
  }

  static parsIllegalMemberVarInObjectImplementation() {
    return [3168, toText(printf("Neither 'member val' nor 'override val' definitions are permitted in object expressions."))];
  }

  static tcEmptyCopyAndUpdateRecordInvalid() {
    return [3169, toText(printf("Copy-and-update record expressions must include at least one field."))];
  }

  static parsUnderscoreInvalidFieldName() {
    return [3170, toText(printf("'_' cannot be used as field name"))];
  }

  static tcGeneratedTypesShouldBeInternalOrPrivate() {
    return [3171, toText(printf("The provided types generated by this use of a type provider may not be used from other F# assemblies and should be marked internal or private. Consider using 'type internal TypeName = ...' or 'type private TypeName = ...'."))];
  }

  static chkGetterAndSetterHaveSamePropertyType(a0, a1, a2) {
    return [3172, toText(printf("A property's getter and setter must have the same type. Property '%s' has getter of type '%s' but setter of type '%s'."))(a0, a1, a2)];
  }

  static tcRuntimeSuppliedMethodCannotBeUsedInUserCode(a0) {
    return [3173, toText(printf("Array method '%s' is supplied by the runtime and cannot be directly used in code. For operations with array elements consider using family of GetArray/SetArray functions from LanguagePrimitives.IntrinsicFunctions module."))(a0)];
  }

  static tcUnionCaseConstructorDoesNotHaveFieldWithGivenName(a0, a1) {
    return [3174, toText(printf("Union case/exception '%s' does not have field named '%s'."))(a0, a1)];
  }

  static tcUnionCaseFieldCannotBeUsedMoreThanOnce(a0) {
    return [3175, toText(printf("Union case/exception field '%s' cannot be used more than once."))(a0)];
  }

  static tcFieldNameIsUsedModeThanOnce(a0) {
    return [3176, toText(printf("Named field '%s' is used more than once."))(a0)];
  }

  static tcFieldNameConflictsWithGeneratedNameForAnonymousField(a0) {
    return [3176, toText(printf("Named field '%s' conflicts with autogenerated name for anonymous field."))(a0)];
  }

  static tastConstantExpressionOverflow() {
    return [3177, toText(printf("This literal expression or attribute argument results in an arithmetic overflow."))];
  }

  static tcIllegalStructTypeForConstantExpression() {
    return [3178, toText(printf("This is not valid literal expression. The [<Literal>] attribute will be ignored."))];
  }

  static fscSystemRuntimeInteropServicesIsRequired() {
    return [3179, toText(printf("System.Runtime.InteropServices assembly is required to use UnknownWrapper\\DispatchWrapper classes."))];
  }

  static abImplicitHeapAllocation(a0) {
    return [3180, toText(printf("The mutable local '%s' is implicitly allocated as a reference cell because it has been captured by a closure. This warning is for informational purposes only to indicate where implicit allocations are performed."))(a0)];
  }

  static estApplyStaticArgumentsForMethodNotImplemented() {
    return toText(printf("A type provider implemented GetStaticParametersForMethod, but ApplyStaticArgumentsForMethod was not implemented or invalid"));
  }

  static etErrorApplyingStaticArgumentsToMethod() {
    return [3181, toText(printf("An error occured applying the static arguments to a provided method"))];
  }

  static pplexUnexpectedChar(a0) {
    return [3182, toText(printf("Unexpected character '%s' in preprocessor expression"))(a0)];
  }

  static ppparsUnexpectedToken(a0) {
    return [3183, toText(printf("Unexpected token '%s' in preprocessor expression"))(a0)];
  }

  static ppparsIncompleteExpression() {
    return [3184, toText(printf("Incomplete preprocessor expression"))];
  }

  static ppparsMissingToken(a0) {
    return [3185, toText(printf("Missing token '%s' in preprocessor expression"))(a0)];
  }

  static pickleMissingDefinition(a0, a1, a2) {
    return [3186, toText(printf("An error occurred while reading the F# metadata node at position %d in table '%s' of assembly '%s'. The node had no matching declaration. Please report this warning. You may need to recompile the F# assembly you are using."))(a0, a1, a2)];
  }

  static checkNotSufficientlyGenericBecauseOfScope(a0) {
    return [3187, toText(printf("Type inference caused the type variable %s to escape its scope. Consider adding an explicit type parameter declaration or adjusting your code to be less generic."))(a0)];
  }

  static checkNotSufficientlyGenericBecauseOfScopeAnon() {
    return [3188, toText(printf("Type inference caused an inference type variable to escape its scope. Consider adding type annotations to make your code less generic."))];
  }

  static checkRaiseFamilyFunctionArgumentCount(a0, a1, a2) {
    return [3189, toText(printf("Redundant arguments are being ignored in function '%s'. Expected %d but got %d arguments."))(a0, a1, a2)];
  }

  static checkLowercaseLiteralBindingInPattern(a0) {
    return [3190, toText(printf("Lowercase literal '%s' is being shadowed by a new pattern with the same name. Only uppercase and module-prefixed literals can be used as named patterns."))(a0)];
  }

  static tcLiteralDoesNotTakeArguments() {
    return [3191, toText(printf("This literal pattern does not take arguments"))];
  }

  static tcConstructorsIllegalInAugmentation() {
    return [3192, toText(printf("Constructors are not permitted as extension members - they must be defined as part of the original definition of the type"))];
  }

  static optsInvalidResponseFile(a0, a1) {
    return [3193, toText(printf("Invalid response file '%s' ( '%s' )"))(a0, a1)];
  }

  static optsResponseFileNotFound(a0, a1) {
    return [3194, toText(printf("Response file '%s' not found in '%s'"))(a0, a1)];
  }

  static optsResponseFileNameInvalid(a0) {
    return [3195, toText(printf("Response file name '%s' is empty, contains invalid characters, has a drive specification without an absolute path, or is too long"))(a0)];
  }

  static fsharpCoreNotFoundToBeCopied() {
    return [3196, toText(printf("Cannot find FSharp.Core.dll in compiler's directory"))];
  }

  static tcTupleStructMismatch() {
    return toText(printf("One tuple type is a struct tuple, the other is a reference tuple"));
  }

  static etMissingStaticArgumentsToMethod() {
    return [3197, toText(printf("This provided method requires static parameters"))];
  }

  static considerUpcast(a0, a1) {
    return [3198, toText(printf("The conversion from %s to %s is a compile-time safe upcast, not a downcast. Consider using 'upcast' instead of 'downcast'."))(a0, a1)];
  }

  static considerUpcastOperator(a0, a1) {
    return [3198, toText(printf("The conversion from %s to %s is a compile-time safe upcast, not a downcast. Consider using the :> (upcast) operator instead of the :?> (downcast) operator."))(a0, a1)];
  }

  static tcRecImplied() {
    return [3199, toText(printf("The 'rec' on this module is implied by an outer 'rec' declaration and is being ignored"))];
  }

  static tcOpenFirstInMutRec() {
    return [3200, toText(printf("In a recursive declaration group, 'open' declarations must come first in each module"))];
  }

  static tcModuleAbbrevFirstInMutRec() {
    return [3201, toText(printf("In a recursive declaration group, module abbreviations must come after all 'open' declarations and before other declarations"))];
  }

  static tcUnsupportedMutRecDecl() {
    return [3202, toText(printf("This declaration is not supported in recursive declaration groups"))];
  }

  static parsInvalidUseOfRec() {
    return [3203, toText(printf("Invalid use of 'rec' keyword"))];
  }

  static tcStructUnionMultiCaseDistinctFields() {
    return [3204, toText(printf("If a union type has more than one case and is a struct, then all fields within the union type must be given unique names."))];
  }

  static CallerMemberNameIsOverriden(a0) {
    return [3206, toText(printf("The CallerMemberNameAttribute applied to parameter '%s' will have no effect. It is overridden by the CallerFilePathAttribute."))(a0)];
  }

  static tcFixedNotAllowed() {
    return [3207, toText(printf("Invalid use of 'fixed'. 'fixed' may only be used in a declaration of the form 'use x = fixed expr' where the expression is an array, the address of a field, the address of an array element or a string'"))];
  }

  static tcCouldNotFindOffsetToStringData() {
    return [3208, toText(printf("Could not find method System.Runtime.CompilerServices.OffsetToStringData in references when building 'fixed' expression."))];
  }

  static chkNoByrefReturnOfLocal(a0) {
    return [3209, toText(printf("The address of the variable '%s' cannot be used at this point. A method or function may not return the address of this local value."))(a0)];
  }

  static tcNamedActivePattern(a0) {
    return [3210, toText(printf("%s is an active pattern and cannot be treated as a discriminated union case with named fields."))(a0)];
  }

  static DefaultParameterValueNotAppropriateForArgument() {
    return [3211, toText(printf("The default value does not have the same type as the argument. The DefaultParameterValue attribute and any Optional attribute will be ignored. Note: 'null' needs to be annotated with the correct type, e.g. 'DefaultParameterValue(null:obj)'."))];
  }

  static tcGlobalsSystemTypeNotFound(a0) {
    return toText(printf("The system type '%s' was required but no referenced system DLL contained this type"))(a0);
  }

  static typrelMemberHasMultiplePossibleDispatchSlots(a0, a1) {
    return [3213, toText(printf("The member '%s' matches multiple overloads of the same method.\nPlease restrict it to one of the following:%s."))(a0, a1)];
  }

  static methodIsNotStatic(a0) {
    return [3214, toText(printf("Method or object constructor '%s' is not static"))(a0)];
  }

  static parsUnexpectedSymbolEqualsInsteadOfIn() {
    return [3215, toText(printf("Unexpected symbol '=' in expression. Did you intend to use 'for x in y .. z do' instead?"))];
  }

  static keywordDescriptionAbstract() {
    return toText(printf("Indicates a method that either has no implementation in the type in which it is declared or that is virtual and has a default implementation."));
  }

  static keyworkDescriptionAnd() {
    return toText(printf("Used in mutually recursive bindings, in property declarations, and with multiple constraints on generic parameters."));
  }

  static keywordDescriptionAs() {
    return toText(printf("Used to give the current class object an object name. Also used to give a name to a whole pattern within a pattern match."));
  }

  static keywordDescriptionAssert() {
    return toText(printf("Used to verify code during debugging."));
  }

  static keywordDescriptionBase() {
    return toText(printf("Used as the name of the base class object."));
  }

  static keywordDescriptionBegin() {
    return toText(printf("In verbose syntax, indicates the start of a code block."));
  }

  static keywordDescriptionClass() {
    return toText(printf("In verbose syntax, indicates the start of a class definition."));
  }

  static keywordDescriptionDefault() {
    return toText(printf("Indicates an implementation of an abstract method; used together with an abstract method declaration to create a virtual method."));
  }

  static keywordDescriptionDelegate() {
    return toText(printf("Used to declare a delegate."));
  }

  static keywordDescriptionDo() {
    return toText(printf("Used in looping constructs or to execute imperative code."));
  }

  static keywordDescriptionDone() {
    return toText(printf("In verbose syntax, indicates the end of a block of code in a looping expression."));
  }

  static keywordDescriptionDowncast() {
    return toText(printf("Used to convert to a type that is lower in the inheritance chain."));
  }

  static keywordDescriptionDownto() {
    return toText(printf("In a for expression, used when counting in reverse."));
  }

  static keywordDescriptionElif() {
    return toText(printf("Used in conditional branching. A short form of else if."));
  }

  static keywordDescriptionElse() {
    return toText(printf("Used in conditional branching."));
  }

  static keywordDescriptionEnd() {
    return toText(printf("In type definitions and type extensions, indicates the end of a section of member definitions. In verbose syntax, used to specify the end of a code block that starts with the begin keyword."));
  }

  static keywordDescriptionException() {
    return toText(printf("Used to declare an exception type."));
  }

  static keywordDescriptionExtern() {
    return toText(printf("Indicates that a declared program element is defined in another binary or assembly."));
  }

  static keywordDescriptionTrueFalse() {
    return toText(printf("Used as a Boolean literal."));
  }

  static keywordDescriptionFinally() {
    return toText(printf("Used together with try to introduce a block of code that executes regardless of whether an exception occurs."));
  }

  static keywordDescriptionFor() {
    return toText(printf("Used in looping constructs."));
  }

  static keywordDescriptionFun() {
    return toText(printf("Used in lambda expressions, also known as anonymous functions."));
  }

  static keywordDescriptionFunction() {
    return toText(printf("Used as a shorter alternative to the fun keyword and a match expression in a lambda expression that has pattern matching on a single argument."));
  }

  static keywordDescriptionGlobal() {
    return toText(printf("Used to reference the top-level .NET namespace."));
  }

  static keywordDescriptionIf() {
    return toText(printf("Used in conditional branching constructs."));
  }

  static keywordDescriptionIn() {
    return toText(printf("Used for sequence expressions and, in verbose syntax, to separate expressions from bindings."));
  }

  static keywordDescriptionInherit() {
    return toText(printf("Used to specify a base class or base interface."));
  }

  static keywordDescriptionInline() {
    return toText(printf("Used to indicate a function that should be integrated directly into the caller's code."));
  }

  static keywordDescriptionInterface() {
    return toText(printf("Used to declare and implement interfaces."));
  }

  static keywordDescriptionInternal() {
    return toText(printf("Used to specify that a member is visible inside an assembly but not outside it."));
  }

  static keywordDescriptionLazy() {
    return toText(printf("Used to specify a computation that is to be performed only when a result is needed."));
  }

  static keywordDescriptionLet() {
    return toText(printf("Used to associate, or bind, a name to a value or function."));
  }

  static keywordDescriptionLetBang() {
    return toText(printf("Used in asynchronous workflows to bind a name to the result of an asynchronous computation, or, in other computation expressions, used to bind a name to a result, which is of the computation type."));
  }

  static keywordDescriptionMatch() {
    return toText(printf("Used to branch by comparing a value to a pattern."));
  }

  static keywordDescriptionMember() {
    return toText(printf("Used to declare a property or method in an object type."));
  }

  static keywordDescriptionModule() {
    return toText(printf("Used to associate a name with a group of related types, values, and functions, to logically separate it from other code."));
  }

  static keywordDescriptionMutable() {
    return toText(printf("Used to declare a variable, that is, a value that can be changed."));
  }

  static keywordDescriptionNamespace() {
    return toText(printf("Used to associate a name with a group of related types and modules, to logically separate it from other code."));
  }

  static keywordDescriptionNew() {
    return toText(printf("Used to declare, define, or invoke a constructor that creates or that can create an object. Also used in generic parameter constraints to indicate that a type must have a certain constructor."));
  }

  static keywordDescriptionNot() {
    return toText(printf("Not actually a keyword. However, not struct in combination is used as a generic parameter constraint."));
  }

  static keywordDescriptionNull() {
    return toText(printf("Indicates the absence of an object. Also used in generic parameter constraints."));
  }

  static keywordDescriptionOf() {
    return toText(printf("Used in discriminated unions to indicate the type of categories of values, and in delegate and exception declarations."));
  }

  static keywordDescriptionOpen() {
    return toText(printf("Used to make the contents of a namespace or module available without qualification."));
  }

  static keywordDescriptionOr() {
    return toText(printf("Used with Boolean conditions as a Boolean or operator. Equivalent to ||. Also used in member constraints."));
  }

  static keywordDescriptionOverride() {
    return toText(printf("Used to implement a version of an abstract or virtual method that differs from the base version."));
  }

  static keywordDescriptionPrivate() {
    return toText(printf("Restricts access to a member to code in the same type or module."));
  }

  static keywordDescriptionPublic() {
    return toText(printf("Allows access to a member from outside the type."));
  }

  static keywordDescriptionRec() {
    return toText(printf("Used to indicate that a function is recursive."));
  }

  static keywordDescriptionReturn() {
    return toText(printf("Used to indicate a value to provide as the result of a computation expression."));
  }

  static keywordDescriptionReturnBang() {
    return toText(printf("Used to indicate a computation expression that, when evaluated, provides the result of the containing computation expression."));
  }

  static keywordDescriptionSelect() {
    return toText(printf("Used in query expressions to specify what fields or columns to extract. Note that this is a contextual keyword, which means that it is not actually a reserved word and it only acts like a keyword in appropriate context."));
  }

  static keywordDescriptionStatic() {
    return toText(printf("Used to indicate a method or property that can be called without an instance of a type, or a value member that is shared among all instances of a type."));
  }

  static keywordDescriptionStruct() {
    return toText(printf("Used to declare a structure type. Also used in generic parameter constraints. Used for OCaml compatibility in module definitions."));
  }

  static keywordDescriptionThen() {
    return toText(printf("Used in conditional expressions. Also used to perform side effects after object construction."));
  }

  static keywordDescriptionTo() {
    return toText(printf("Used in for loops to indicate a range."));
  }

  static keywordDescriptionTry() {
    return toText(printf("Used to introduce a block of code that might generate an exception. Used together with with or finally."));
  }

  static keywordDescriptionType() {
    return toText(printf("Used to declare a class, record, structure, discriminated union, enumeration type, unit of measure, or type abbreviation."));
  }

  static keywordDescriptionUpcast() {
    return toText(printf("Used to convert to a type that is higher in the inheritance chain."));
  }

  static keywordDescriptionUse() {
    return toText(printf("Used instead of let for values that require Dispose to be called to free resources."));
  }

  static keywordDescriptionUseBang() {
    return toText(printf("Used instead of let! in asynchronous workflows and other computation expressions for values that require Dispose to be called to free resources."));
  }

  static keywordDescriptionVal() {
    return toText(printf("Used in a signature to indicate a value, or in a type to declare a member, in limited situations."));
  }

  static keywordDescriptionVoid() {
    return toText(printf("Indicates the .NET void type. Used when interoperating with other .NET languages."));
  }

  static keywordDescriptionWhen() {
    return toText(printf("Used for Boolean conditions (when guards) on pattern matches and to introduce a constraint clause for a generic type parameter."));
  }

  static keywordDescriptionWhile() {
    return toText(printf("Introduces a looping construct."));
  }

  static keywordDescriptionWith() {
    return toText(printf("Used together with the match keyword in pattern matching expressions. Also used in object expressions, record copying expressions, and type extensions to introduce member definitions, and to introduce exception handlers."));
  }

  static keywordDescriptionYield() {
    return toText(printf("Used in a sequence expression to produce a value for a sequence."));
  }

  static keywordDescriptionYieldBang() {
    return toText(printf("Used in a computation expression to append the result of a given computation expression to a collection of results for the containing computation expression."));
  }

  static keywordDescriptionRightArrow() {
    return toText(printf("In function types, delimits arguments and return values. Yields an expression (in sequence expressions); equivalent to the yield keyword. Used in match expressions"));
  }

  static keywordDescriptionLeftArrow() {
    return toText(printf("Assigns a value to a variable."));
  }

  static keywordDescriptionCast() {
    return toText(printf("Converts a type to type that is higher in the hierarchy."));
  }

  static keywordDescriptionDynamicCast() {
    return toText(printf("Converts a type to a type that is lower in the hierarchy."));
  }

  static keywordDescriptionTypedQuotation() {
    return toText(printf("Delimits a typed code quotation."));
  }

  static keywordDescriptionUntypedQuotation() {
    return toText(printf("Delimits a untyped code quotation."));
  }

  static itemNotFoundDuringDynamicCodeGen(a0, a1, a2) {
    return [3216, toText(printf("%s '%s' not found in assembly '%s'. A possible cause may be a version incompatibility. You may need to explicitly reference the correct version of this assembly to allow all referenced components to use the correct version."))(a0, a1, a2)];
  }

  static itemNotFoundInTypeDuringDynamicCodeGen(a0, a1, a2, a3) {
    return [3216, toText(printf("%s '%s' not found in type '%s' from assembly '%s'. A possible cause may be a version incompatibility. You may need to explicitly reference the correct version of this assembly to allow all referenced components to use the correct version."))(a0, a1, a2, a3)];
  }

  static descriptionWordIs() {
    return toText(printf("is"));
  }

  static notAFunction() {
    return toText(printf("This value is not a function and cannot be applied."));
  }

  static notAFunctionButMaybeIndexerWithName(a0) {
    return toText(printf("This value is not a function and cannot be applied. Did you intend to access the indexer via %s.[index] instead?"))(a0);
  }

  static notAFunctionButMaybeIndexer() {
    return toText(printf("This expression is not a function and cannot be applied. Did you intend to access the indexer via expr.[index] instead?"));
  }

  static notAFunctionButMaybeIndexerErrorCode() {
    return [3217, toText(printf(""))];
  }

  static notAFunctionButMaybeDeclaration() {
    return toText(printf("This value is not a function and cannot be applied. Did you forget to terminate a declaration?"));
  }

  static ArgumentsInSigAndImplMismatch(a0, a1) {
    return [3218, toText(printf("The argument names in the signature '%s' and implementation '%s' do not match. The argument name from the signature file will be used. This may cause problems when debugging or profiling."))(a0, a1)];
  }

  static pickleUnexpectedNonZero(a0) {
    return [3219, toText(printf("An error occurred while reading the F# metadata of assembly '%s'. A reserved construct was utilized. You may need to upgrade your F# compiler or use an earlier version of the assembly that doesn't make use of a specific construct."))(a0)];
  }

  static tcTupleMemberNotNormallyUsed() {
    return [3220, toText(printf("This method or property is not normally used from F# code, use an explicit tuple pattern for deconstruction instead."))];
  }

  static implicitlyDiscardedInSequenceExpression(a0) {
    return [3221, toText(printf("This expression returns a value of type '%s' but is implicitly discarded. Consider using 'let' to bind the result to a name, e.g. 'let result = expression'. If you intended to use the expression as a value in the sequence then use an explicit 'yield'."))(a0)];
  }

  static implicitlyDiscardedSequenceInSequenceExpression(a0) {
    return [3222, toText(printf("This expression returns a value of type '%s' but is implicitly discarded. Consider using 'let' to bind the result to a name, e.g. 'let result = expression'. If you intended to use the expression as a value in the sequence then use an explicit 'yield!'."))(a0)];
  }

  static ilreadFileChanged(a0) {
    return [3223, toText(printf("The file '%s' changed on disk unexpectedly, please reload."))(a0)];
  }

}
setType("FSComp.SR", SR);