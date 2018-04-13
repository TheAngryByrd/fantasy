import { fileOfFileIndex, rangeN } from "./range";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { mkRawStructTupleTy, primEntityRefEq, ValLinkagePartialKey, mkRawRefTupleTy, primValRefEq, primUnionCaseRefEq, tupInfoStruct, tupInfoRef, ERefNonLocal, mkNestedNonLocalEntityRef, mkUnionCaseRef, mkTyparTy, NewRigidTypar, CcuThunk, UnionCaseRef, ValRef, EntityRef, mkNonLocalEntityRef, mkNonLocalTyconRef, mkNonLocalValRef, ValLinkageFullKey, TType, NonLocalEntityRef } from "./tast";
import { FSharpLib as FSharpLib_1 } from "./ast";
import { mkILNonGenericTySpec, mkILCustomAttrs, ILSourceDocument, mkILTyRef, mkSimpleAssRef, ILScopeRef, splitILTypeName, mkILTyRefInTyRef, ILAttribElem, mkILCustomAttribute, mkILNonGenericBoxedTy, mkILNonGenericValueTy, ILType, ILGlobals, ILTypeDef, ILAttribute, ILTypeRef, splitNamespace } from "../absil/il";
import { append, map as map_2, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { equals, hash, Tuple, makeGeneric, Interface, Array as _Array, Option } from "../fable-core/Util";
import { newIlxPubCloEnv, cenv } from "../ilx/EraseClosures";
import { empty, singleton, append as append_1, sum, foldBack, item, map, delay, toList, initialize } from "../fable-core/Seq";
import { join, replicate } from "../fable-core/String";
import { tryGetValue, create } from "../fable-core/Map";
import { fromEqualityComparer } from "../fable-core/Comparer";
import { MemoizationTable } from "../absil/illib";
import { Filename } from "./lib";
import { CompileOpName } from "./PrettyNaming";
import { map as map_1 } from "../fable-core/Array";
import { getValue, defaultArg } from "../fable-core/Option";
import CurriedLambda from "../fable-core/CurriedLambda";
import { mkClassUnionDef } from "../ilx/EraseUnions";
import { SR } from "../codegen/FSComp";
import { ilxFsharpCoreLibScopeRef } from "../ilx/ilxsettings";
export const DummyFileNameForRangesWithoutASpecificLocation = "startup";
const envRange = rangeN(DummyFileNameForRangesWithoutASpecificLocation, 0);
export class IntrinsicValRef {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TcGlobals.IntrinsicValRef",
      interfaces: ["FSharpUnion"],
      cases: [["IntrinsicValRef", NonLocalEntityRef, "string", "boolean", TType, ValLinkageFullKey]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.TcGlobals.IntrinsicValRef", IntrinsicValRef);
export function ValRefForIntrinsic(_arg1) {
  return mkNonLocalValRef(_arg1.data[0], _arg1.data[4]);
}
export const FSharpLib = function (__exports) {
  const CoreOperatorsName = __exports.CoreOperatorsName = FSharpLib_1.Root + ".Core.Operators";
  const CoreOperatorsCheckedName = __exports.CoreOperatorsCheckedName = FSharpLib_1.Root + ".Core.Operators.Checked";
  const ControlName = __exports.ControlName = FSharpLib_1.Root + ".Control";
  const LinqName = __exports.LinqName = FSharpLib_1.Root + ".Linq";
  const CollectionsName = __exports.CollectionsName = FSharpLib_1.Root + ".Collections";
  const LanguagePrimitivesName = __exports.LanguagePrimitivesName = FSharpLib_1.Root + ".Core.LanguagePrimitives";
  const CompilerServicesName = __exports.CompilerServicesName = FSharpLib_1.Root + ".Core.CompilerServices";
  const LinqRuntimeHelpersName = __exports.LinqRuntimeHelpersName = FSharpLib_1.Root + ".Linq.RuntimeHelpers";
  const RuntimeHelpersName = __exports.RuntimeHelpersName = FSharpLib_1.Root + ".Core.CompilerServices.RuntimeHelpers";
  const ExtraTopLevelOperatorsName = __exports.ExtraTopLevelOperatorsName = FSharpLib_1.Root + ".Core.ExtraTopLevelOperators";
  const HashCompareName = __exports.HashCompareName = FSharpLib_1.Root + ".Core.LanguagePrimitives.HashCompare";
  const QuotationsName = __exports.QuotationsName = FSharpLib_1.Root + ".Quotations";
  const OperatorsPath = __exports.OperatorsPath = Array.from(splitNamespace(CoreOperatorsName));
  const OperatorsCheckedPath = __exports.OperatorsCheckedPath = Array.from(splitNamespace(CoreOperatorsCheckedName));
  const ControlPath = __exports.ControlPath = splitNamespace(ControlName);
  const LinqPath = __exports.LinqPath = splitNamespace(LinqName);
  const CollectionsPath = __exports.CollectionsPath = splitNamespace(CollectionsName);
  const LanguagePrimitivesPath = __exports.LanguagePrimitivesPath = Array.from(splitNamespace(LanguagePrimitivesName));
  const HashComparePath = __exports.HashComparePath = Array.from(splitNamespace(HashCompareName));
  const CompilerServicesPath = __exports.CompilerServicesPath = Array.from(splitNamespace(CompilerServicesName));
  const LinqRuntimeHelpersPath = __exports.LinqRuntimeHelpersPath = Array.from(splitNamespace(LinqRuntimeHelpersName));
  const RuntimeHelpersPath = __exports.RuntimeHelpersPath = Array.from(splitNamespace(RuntimeHelpersName));
  const QuotationsPath = __exports.QuotationsPath = Array.from(splitNamespace(QuotationsName));
  const ExtraTopLevelOperatorsPath = __exports.ExtraTopLevelOperatorsPath = Array.from(splitNamespace(ExtraTopLevelOperatorsName));
  const RootPathArray = __exports.RootPathArray = Array.from(FSharpLib_1.RootPath);
  const CorePathArray = __exports.CorePathArray = Array.from(FSharpLib_1.CorePath);
  const LinqPathArray = __exports.LinqPathArray = Array.from(LinqPath);
  const ControlPathArray = __exports.ControlPathArray = Array.from(ControlPath);
  const CollectionsPathArray = __exports.CollectionsPathArray = Array.from(CollectionsPath);
  return __exports;
}({});

function mkNonGenericTy(tcref) {
  return new TType(1, [tcref, new List()]);
}

export function mkNonLocalTyconRef2(ccu, path, n) {
  return mkNonLocalTyconRef(mkNonLocalEntityRef(ccu, path), n);
}
export function mk_MFCore_tcref(ccu, n) {
  return mkNonLocalTyconRef2(ccu, FSharpLib.CorePathArray, n);
}
export function mk_MFQuotations_tcref(ccu, n) {
  return mkNonLocalTyconRef2(ccu, FSharpLib.QuotationsPath, n);
}
export function mk_MFLinq_tcref(ccu, n) {
  return mkNonLocalTyconRef2(ccu, FSharpLib.LinqPathArray, n);
}
export function mk_MFCollections_tcref(ccu, n) {
  return mkNonLocalTyconRef2(ccu, FSharpLib.CollectionsPathArray, n);
}
export function mk_MFCompilerServices_tcref(ccu, n) {
  return mkNonLocalTyconRef2(ccu, FSharpLib.CompilerServicesPath, n);
}
export function mk_MFRuntimeHelpers_tcref(ccu, n) {
  return mkNonLocalTyconRef2(ccu, FSharpLib.RuntimeHelpersPath, n);
}
export function mk_MFControl_tcref(ccu, n) {
  return mkNonLocalTyconRef2(ccu, FSharpLib.ControlPathArray, n);
}
export class BuiltinAttribInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TcGlobals.BuiltinAttribInfo",
      interfaces: ["FSharpUnion"],
      cases: [["AttribInfo", ILTypeRef, EntityRef]]
    };
  }

  get TyconRef() {
    return this.data[1];
  }

  get TypeRef() {
    return this.data[0];
  }

}
setType("Microsoft.FSharp.Compiler.TcGlobals.BuiltinAttribInfo", BuiltinAttribInfo);
export class TcGlobals {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TcGlobals.TcGlobals",
      properties: {
        CompilerGeneratedAttribute: ILAttribute,
        DebuggerBrowsableNeverAttribute: ILAttribute,
        IComparer_ty: TType,
        IEqualityComparer_ty: TType,
        addrof2_vref: ValRef,
        addrof_vref: ValRef,
        and2_vref: ValRef,
        and_vref: ValRef,
        array2D_get_info: IntrinsicValRef,
        array2D_get_vref: ValRef,
        array2D_set_info: IntrinsicValRef,
        array3D_get_info: IntrinsicValRef,
        array3D_get_vref: ValRef,
        array3D_set_info: IntrinsicValRef,
        array4D_get_info: IntrinsicValRef,
        array4D_get_vref: ValRef,
        array4D_set_info: IntrinsicValRef,
        array_get_info: IntrinsicValRef,
        array_get_vref: ValRef,
        array_length_info: IntrinsicValRef,
        array_set_info: IntrinsicValRef,
        array_tcr_nice: EntityRef,
        attrib_AbstractClassAttribute: BuiltinAttribInfo,
        attrib_AllowNullLiteralAttribute: BuiltinAttribInfo,
        attrib_AttributeUsageAttribute: BuiltinAttribInfo,
        attrib_AutoOpenAttribute: BuiltinAttribInfo,
        attrib_AutoSerializableAttribute: BuiltinAttribInfo,
        attrib_CLIEventAttribute: BuiltinAttribInfo,
        attrib_CLIMutableAttribute: BuiltinAttribInfo,
        attrib_CallerFilePathAttribute: BuiltinAttribInfo,
        attrib_CallerLineNumberAttribute: BuiltinAttribInfo,
        attrib_CallerMemberNameAttribute: BuiltinAttribInfo,
        attrib_ClassAttribute: BuiltinAttribInfo,
        attrib_ComImportAttribute: Option(BuiltinAttribInfo),
        attrib_ComVisibleAttribute: BuiltinAttribInfo,
        attrib_ComparisonConditionalOnAttribute: BuiltinAttribInfo,
        attrib_CompilationArgumentCountsAttribute: BuiltinAttribInfo,
        attrib_CompilationMappingAttribute: BuiltinAttribInfo,
        attrib_CompilationRepresentationAttribute: BuiltinAttribInfo,
        attrib_CompiledNameAttribute: BuiltinAttribInfo,
        attrib_CompilerMessageAttribute: BuiltinAttribInfo,
        attrib_ComponentModelEditorBrowsableAttribute: BuiltinAttribInfo,
        attrib_ConditionalAttribute: BuiltinAttribInfo,
        attrib_ContextStaticAttribute: Option(BuiltinAttribInfo),
        attrib_CustomComparisonAttribute: BuiltinAttribInfo,
        attrib_CustomEqualityAttribute: BuiltinAttribInfo,
        attrib_CustomOperationAttribute: BuiltinAttribInfo,
        attrib_DebuggerDisplayAttribute: BuiltinAttribInfo,
        attrib_DebuggerTypeProxyAttribute: BuiltinAttribInfo,
        attrib_DefaultAugmentationAttribute: BuiltinAttribInfo,
        attrib_DefaultMemberAttribute: BuiltinAttribInfo,
        attrib_DefaultParameterValueAttribute: Option(BuiltinAttribInfo),
        attrib_DefaultValueAttribute: BuiltinAttribInfo,
        attrib_DllImportAttribute: Option(BuiltinAttribInfo),
        attrib_EntryPointAttribute: BuiltinAttribInfo,
        attrib_EqualityConditionalOnAttribute: BuiltinAttribInfo,
        attrib_ExperimentalAttribute: BuiltinAttribInfo,
        attrib_ExtensionAttribute: BuiltinAttribInfo,
        attrib_FieldOffsetAttribute: BuiltinAttribInfo,
        attrib_FlagsAttribute: BuiltinAttribInfo,
        attrib_GeneralizableValueAttribute: BuiltinAttribInfo,
        attrib_IDispatchConstantAttribute: Option(BuiltinAttribInfo),
        attrib_IUnknownConstantAttribute: Option(BuiltinAttribInfo),
        attrib_InAttribute: Option(BuiltinAttribInfo),
        attrib_InterfaceAttribute: BuiltinAttribInfo,
        attrib_InternalsVisibleToAttribute: BuiltinAttribInfo,
        attrib_LiteralAttribute: BuiltinAttribInfo,
        attrib_MarshalAsAttribute: Option(BuiltinAttribInfo),
        attrib_MeasureAttribute: BuiltinAttribInfo,
        attrib_MeasureableAttribute: BuiltinAttribInfo,
        attrib_MethodImplAttribute: BuiltinAttribInfo,
        attrib_NoComparisonAttribute: BuiltinAttribInfo,
        attrib_NoDynamicInvocationAttribute: BuiltinAttribInfo,
        attrib_NoEqualityAttribute: BuiltinAttribInfo,
        attrib_NonSerializedAttribute: Option(BuiltinAttribInfo),
        attrib_OptionalArgumentAttribute: BuiltinAttribInfo,
        attrib_OptionalAttribute: Option(BuiltinAttribInfo),
        attrib_OutAttribute: BuiltinAttribInfo,
        attrib_ParamArrayAttribute: BuiltinAttribInfo,
        attrib_PreserveSigAttribute: Option(BuiltinAttribInfo),
        attrib_ProjectionParameterAttribute: BuiltinAttribInfo,
        attrib_ReferenceEqualityAttribute: BuiltinAttribInfo,
        attrib_ReflectedDefinitionAttribute: BuiltinAttribInfo,
        attrib_RequireQualifiedAccessAttribute: BuiltinAttribInfo,
        attrib_RequiresExplicitTypeArgumentsAttribute: BuiltinAttribInfo,
        attrib_SealedAttribute: BuiltinAttribInfo,
        attrib_SecurityAttribute: Option(BuiltinAttribInfo),
        attrib_SecurityCriticalAttribute: BuiltinAttribInfo,
        attrib_SecuritySafeCriticalAttribute: BuiltinAttribInfo,
        attrib_SpecialNameAttribute: Option(BuiltinAttribInfo),
        attrib_StructAttribute: BuiltinAttribInfo,
        attrib_StructLayoutAttribute: BuiltinAttribInfo,
        attrib_StructuralComparisonAttribute: BuiltinAttribInfo,
        attrib_StructuralEqualityAttribute: BuiltinAttribInfo,
        attrib_SystemObsolete: BuiltinAttribInfo,
        attrib_ThreadStaticAttribute: Option(BuiltinAttribInfo),
        attrib_TypeForwardedToAttribute: BuiltinAttribInfo,
        attrib_UnverifiableAttribute: BuiltinAttribInfo,
        attrib_VolatileFieldAttribute: BuiltinAttribInfo,
        bitwise_and_info: IntrinsicValRef,
        bitwise_and_vref: ValRef,
        bitwise_or_info: IntrinsicValRef,
        bitwise_or_vref: ValRef,
        bitwise_shift_left_info: IntrinsicValRef,
        bitwise_shift_left_vref: ValRef,
        bitwise_shift_right_info: IntrinsicValRef,
        bitwise_shift_right_vref: ValRef,
        bitwise_unary_not_info: IntrinsicValRef,
        bitwise_unary_not_vref: ValRef,
        bitwise_xor_info: IntrinsicValRef,
        bitwise_xor_vref: ValRef,
        bool_tcr: EntityRef,
        bool_ty: TType,
        box_info: IntrinsicValRef,
        byref_tcr: EntityRef,
        byte_checked_info: IntrinsicValRef,
        byte_operator_info: IntrinsicValRef,
        byte_tcr: EntityRef,
        byte_ty: TType,
        cast_quotation_info: IntrinsicValRef,
        char_operator_info: IntrinsicValRef,
        char_tcr: EntityRef,
        char_ty: TType,
        check_this_info: IntrinsicValRef,
        checked_addition_info: IntrinsicValRef,
        checked_multiply_info: IntrinsicValRef,
        checked_subtraction_info: IntrinsicValRef,
        checked_unary_minus_info: IntrinsicValRef,
        choice2_tcr: EntityRef,
        choice3_tcr: EntityRef,
        choice4_tcr: EntityRef,
        choice5_tcr: EntityRef,
        choice6_tcr: EntityRef,
        choice7_tcr: EntityRef,
        compare_operator_vref: ValRef,
        compilingFslib: "boolean",
        cons_ucref: UnionCaseRef,
        create_event_info: IntrinsicValRef,
        create_instance_info: IntrinsicValRef,
        date_tcr: EntityRef,
        decimal_tcr: EntityRef,
        decimal_ty: TType,
        deserialize_quoted_FSharp_20_plus_info: IntrinsicValRef,
        deserialize_quoted_FSharp_40_plus_info: IntrinsicValRef,
        directoryToResolveRelativePaths: "string",
        dispose_info: IntrinsicValRef,
        emitDebugInfoInQuotations: "boolean",
        enumOfValue_vref: ValRef,
        enum_operator_info: IntrinsicValRef,
        enum_vref: ValRef,
        equals_nullable_operator_vref: ValRef,
        equals_operator_info: IntrinsicValRef,
        equals_operator_vref: ValRef,
        eraseClassUnionDef: ILTypeDef,
        exn_tcr: EntityRef,
        exn_ty: TType,
        expr_tcr: EntityRef,
        fail_init_info: IntrinsicValRef,
        fail_static_init_info: IntrinsicValRef,
        failwith_info: IntrinsicValRef,
        failwith_vref: ValRef,
        failwithf_info: IntrinsicValRef,
        failwithf_vref: ValRef,
        fastFunc_tcr: EntityRef,
        float32_operator_info: IntrinsicValRef,
        float32_tcr: EntityRef,
        float32_ty: TType,
        float_operator_info: IntrinsicValRef,
        float_tcr: EntityRef,
        float_ty: TType,
        format_tcr: EntityRef,
        fsharpref_vref: ValRef,
        fslibCcu: CcuThunk,
        fslib_IDelegateEvent_tcr: EntityRef,
        fslib_IEvent2_tcr: EntityRef,
        generic_compare_withc_tuple2_vref: ValRef,
        generic_compare_withc_tuple3_vref: ValRef,
        generic_compare_withc_tuple4_vref: ValRef,
        generic_compare_withc_tuple5_vref: ValRef,
        generic_comparison_inner_vref: ValRef,
        generic_comparison_withc_inner_vref: ValRef,
        generic_comparison_withc_outer_info: IntrinsicValRef,
        generic_equality_er_inner_vref: ValRef,
        generic_equality_er_outer_info: IntrinsicValRef,
        generic_equality_per_inner_vref: ValRef,
        generic_equality_withc_inner_vref: ValRef,
        generic_equality_withc_outer_info: IntrinsicValRef,
        generic_equality_withc_outer_vref: ValRef,
        generic_equals_withc_tuple2_vref: ValRef,
        generic_equals_withc_tuple3_vref: ValRef,
        generic_equals_withc_tuple4_vref: ValRef,
        generic_equals_withc_tuple5_vref: ValRef,
        generic_hash_inner_vref: ValRef,
        generic_hash_withc_inner_vref: ValRef,
        generic_hash_withc_outer_info: IntrinsicValRef,
        generic_hash_withc_tuple2_vref: ValRef,
        generic_hash_withc_tuple3_vref: ValRef,
        generic_hash_withc_tuple4_vref: ValRef,
        generic_hash_withc_tuple5_vref: ValRef,
        get_generic_comparer_info: IntrinsicValRef,
        get_generic_er_equality_comparer_info: IntrinsicValRef,
        get_generic_per_equality_comparer_info: IntrinsicValRef,
        getstring_info: IntrinsicValRef,
        greater_than_operator: IntrinsicValRef,
        greater_than_operator_vref: ValRef,
        greater_than_or_equals_operator: IntrinsicValRef,
        greater_than_or_equals_operator_vref: ValRef,
        hash_info: IntrinsicValRef,
        il_arr_tcr_map: _Array(EntityRef),
        ilg: ILGlobals,
        ilsigptr_tcr: EntityRef,
        iltyp_AsyncCallback: ILType,
        iltyp_Exception: ILType,
        iltyp_IAsyncResult: ILType,
        iltyp_IComparable: ILType,
        iltyp_Missing: ILType,
        iltyp_RuntimeFieldHandle: ILType,
        iltyp_RuntimeMethodHandle: ILType,
        iltyp_RuntimeTypeHandle: ILType,
        iltyp_SerializationInfo: Option(ILType),
        iltyp_StreamingContext: Option(ILType),
        iltyp_TypedReference: Option(ILType),
        iltyp_ValueType: ILType,
        ilxPubCloEnv: cenv,
        int16_checked_info: IntrinsicValRef,
        int16_operator_info: IntrinsicValRef,
        int16_tcr: EntityRef,
        int16_ty: TType,
        int32_checked_info: IntrinsicValRef,
        int32_operator_info: IntrinsicValRef,
        int32_tcr: EntityRef,
        int32_ty: TType,
        int64_checked_info: IntrinsicValRef,
        int64_operator_info: IntrinsicValRef,
        int64_tcr: EntityRef,
        int64_ty: TType,
        int_checked_info: IntrinsicValRef,
        int_operator_info: IntrinsicValRef,
        int_tcr: EntityRef,
        int_ty: TType,
        invalid_arg_info: IntrinsicValRef,
        invalid_arg_vref: ValRef,
        invalid_op_info: IntrinsicValRef,
        invalid_op_vref: ValRef,
        isInteractive: "boolean",
        isnotnull_info: IntrinsicValRef,
        isnull_info: IntrinsicValRef,
        istype_fast_info: IntrinsicValRef,
        istype_fast_vref: ValRef,
        istype_info: IntrinsicValRef,
        istype_vref: ValRef,
        knownFSharpCoreModules: Interface("System.Collections.Generic.IDictionary"),
        knownIntrinsics: makeGeneric(Map, {
          TKey: Tuple(["string", "string"]),
          TValue: ValRef
        }),
        lazy_create_info: IntrinsicValRef,
        lazy_force_info: IntrinsicValRef,
        lazy_tcr_canon: EntityRef,
        lazy_tcr_nice: EntityRef,
        less_than_operator: IntrinsicValRef,
        less_than_operator_vref: ValRef,
        less_than_or_equals_operator: IntrinsicValRef,
        less_than_or_equals_operator_vref: ValRef,
        lift_value_info: IntrinsicValRef,
        lift_value_with_defn_info: IntrinsicValRef,
        lift_value_with_name_info: IntrinsicValRef,
        list_tcr_canon: EntityRef,
        list_tcr_nice: EntityRef,
        map_tcr_canon: EntityRef,
        measureinverse_tcr: EntityRef,
        measureone_tcr: EntityRef,
        measureproduct_tcr: EntityRef,
        methodhandleof_info: IntrinsicValRef,
        methodhandleof_vref: ValRef,
        mk_IComparable_ty: TType,
        mk_IStructuralComparable_ty: TType,
        mk_IStructuralEquatable_ty: TType,
        mlCompatibility: "boolean",
        nativeint_checked_info: IntrinsicValRef,
        nativeint_operator_info: IntrinsicValRef,
        nativeint_tcr: EntityRef,
        nativeint_ty: TType,
        nativeptr_tcr: EntityRef,
        new_decimal_info: IntrinsicValRef,
        new_format_info: IntrinsicValRef,
        new_format_vref: ValRef,
        new_query_source_info: IntrinsicValRef,
        nil_ucref: UnionCaseRef,
        not_equals_operator: IntrinsicValRef,
        not_equals_operator_vref: ValRef,
        null_arg_info: IntrinsicValRef,
        null_arg_vref: ValRef,
        nullable_equals_nullable_operator_vref: ValRef,
        nullable_equals_operator_vref: ValRef,
        obj_ty: TType,
        option_tcr_canon: EntityRef,
        option_tcr_nice: EntityRef,
        or2_vref: ValRef,
        or_vref: ValRef,
        pdecimal_tcr: EntityRef,
        pfloat32_tcr: EntityRef,
        pfloat_tcr: EntityRef,
        pint16_tcr: EntityRef,
        pint64_tcr: EntityRef,
        pint8_tcr: EntityRef,
        pint_tcr: EntityRef,
        query_builder_tcref: EntityRef,
        query_for_vref: ValRef,
        query_run_enumerable_vref: ValRef,
        query_run_value_vref: ValRef,
        query_select_vref: ValRef,
        query_source_as_enum_info: IntrinsicValRef,
        query_source_vref: ValRef,
        query_value_vref: ValRef,
        query_where_vref: ValRef,
        query_yield_from_vref: ValRef,
        query_yield_vref: ValRef,
        query_zero_vref: ValRef,
        quote_to_linq_lambda_info: IntrinsicValRef,
        raise_info: IntrinsicValRef,
        raise_vref: ValRef,
        range_int32_op_vref: ValRef,
        range_op_vref: ValRef,
        range_step_op_vref: ValRef,
        raw_expr_tcr: EntityRef,
        ref_tuple1_tcr: EntityRef,
        ref_tuple2_tcr: EntityRef,
        ref_tuple3_tcr: EntityRef,
        ref_tuple4_tcr: EntityRef,
        ref_tuple5_tcr: EntityRef,
        ref_tuple6_tcr: EntityRef,
        ref_tuple7_tcr: EntityRef,
        ref_tuple8_tcr: EntityRef,
        refcell_tcr_canon: EntityRef,
        refcell_tcr_nice: EntityRef,
        reference_equality_inner_vref: ValRef,
        reraise_info: IntrinsicValRef,
        reraise_vref: ValRef,
        sbyte_checked_info: IntrinsicValRef,
        sbyte_operator_info: IntrinsicValRef,
        sbyte_tcr: EntityRef,
        sbyte_ty: TType,
        seq_append_info: IntrinsicValRef,
        seq_append_vref: ValRef,
        seq_base_tcr: EntityRef,
        seq_collect_info: IntrinsicValRef,
        seq_collect_vref: ValRef,
        seq_delay_info: IntrinsicValRef,
        seq_delay_vref: ValRef,
        seq_empty_info: IntrinsicValRef,
        seq_empty_vref: ValRef,
        seq_finally_info: IntrinsicValRef,
        seq_finally_vref: ValRef,
        seq_generated_info: IntrinsicValRef,
        seq_generated_vref: ValRef,
        seq_info: IntrinsicValRef,
        seq_map_info: IntrinsicValRef,
        seq_map_vref: ValRef,
        seq_of_functions_info: IntrinsicValRef,
        seq_of_functions_vref: ValRef,
        seq_singleton_info: IntrinsicValRef,
        seq_singleton_vref: ValRef,
        seq_tcr: EntityRef,
        seq_to_array_info: IntrinsicValRef,
        seq_to_list_info: IntrinsicValRef,
        seq_using_info: IntrinsicValRef,
        seq_using_vref: ValRef,
        seq_vref: ValRef,
        set_tcr_canon: EntityRef,
        sizeof_vref: ValRef,
        splice_expr_vref: ValRef,
        splice_raw_expr_vref: ValRef,
        sprintf_vref: ValRef,
        string_ty: TType,
        struct_tuple1_tcr: EntityRef,
        struct_tuple2_tcr: EntityRef,
        struct_tuple3_tcr: EntityRef,
        struct_tuple4_tcr: EntityRef,
        struct_tuple5_tcr: EntityRef,
        struct_tuple6_tcr: EntityRef,
        struct_tuple7_tcr: EntityRef,
        struct_tuple8_tcr: EntityRef,
        suppressed_types: makeGeneric(List, {
          T: EntityRef
        }),
        system_ArgIterator_tcref: Option(EntityRef),
        system_Array_tcref: EntityRef,
        system_Array_typ: TType,
        system_Bool_tcref: EntityRef,
        system_Byte_tcref: EntityRef,
        system_Char_tcref: EntityRef,
        system_Decimal_tcref: EntityRef,
        system_Delegate_typ: TType,
        system_Double_tcref: EntityRef,
        system_Enum_typ: TType,
        system_Exception_typ: TType,
        system_GenericIComparable_tcref: EntityRef,
        system_GenericIEquatable_tcref: EntityRef,
        system_IDisposable_typ: TType,
        system_IndexOutOfRangeException_tcref: EntityRef,
        system_Int16_tcref: EntityRef,
        system_Int32_tcref: EntityRef,
        system_Int32_typ: TType,
        system_Int64_tcref: EntityRef,
        system_IntPtr_tcref: EntityRef,
        system_LinqExpression_tcref: EntityRef,
        system_MarshalByRefObject_tcref: Option(EntityRef),
        system_MarshalByRefObject_typ: Option(TType),
        system_MulticastDelegate_typ: TType,
        system_Nullable_tcref: EntityRef,
        system_Object_tcref: EntityRef,
        system_Object_typ: TType,
        system_Reflection_MethodInfo_typ: TType,
        system_RuntimeArgumentHandle_tcref: Option(EntityRef),
        system_RuntimeHelpers_typ: TType,
        system_RuntimeMethodHandle_typ: TType,
        system_RuntimeTypeHandle_typ: TType,
        system_SByte_tcref: EntityRef,
        system_Single_tcref: EntityRef,
        system_String_tcref: EntityRef,
        system_String_typ: TType,
        system_Type_typ: TType,
        system_TypedReference_tcref: Option(EntityRef),
        system_UInt16_tcref: EntityRef,
        system_UInt32_tcref: EntityRef,
        system_UInt64_tcref: EntityRef,
        system_UIntPtr_tcref: EntityRef,
        system_Value_typ: TType,
        system_Void_tcref: EntityRef,
        tcref_IObservable: EntityRef,
        tcref_IObserver: EntityRef,
        tcref_IQueryable: EntityRef,
        tcref_LanguagePrimitives: EntityRef,
        tcref_System_Attribute: EntityRef,
        tcref_System_Collections_Generic_Dictionary: EntityRef,
        tcref_System_Collections_Generic_ICollection: EntityRef,
        tcref_System_Collections_Generic_IDictionary: EntityRef,
        tcref_System_Collections_Generic_IEnumerable: EntityRef,
        tcref_System_Collections_Generic_IEnumerator: EntityRef,
        tcref_System_Collections_Generic_IEqualityComparer: EntityRef,
        tcref_System_Collections_Generic_IList: EntityRef,
        tcref_System_Collections_Generic_IReadOnlyCollection: EntityRef,
        tcref_System_Collections_Generic_IReadOnlyList: EntityRef,
        tcref_System_Collections_Generic_List: EntityRef,
        tcref_System_Collections_IComparer: EntityRef,
        tcref_System_Collections_IEnumerable: EntityRef,
        tcref_System_Collections_IEqualityComparer: EntityRef,
        tcref_System_IComparable: EntityRef,
        tcref_System_IDisposable: EntityRef,
        tcref_System_IStructuralComparable: EntityRef,
        tcref_System_IStructuralEquatable: EntityRef,
        typedefof_info: IntrinsicValRef,
        typedefof_vref: ValRef,
        typeof_info: IntrinsicValRef,
        typeof_vref: ValRef,
        uint16_checked_info: IntrinsicValRef,
        uint16_operator_info: IntrinsicValRef,
        uint16_tcr: EntityRef,
        uint16_ty: TType,
        uint32_checked_info: IntrinsicValRef,
        uint32_operator_info: IntrinsicValRef,
        uint32_tcr: EntityRef,
        uint32_ty: TType,
        uint64_checked_info: IntrinsicValRef,
        uint64_operator_info: IntrinsicValRef,
        uint64_tcr: EntityRef,
        uint64_ty: TType,
        unativeint_checked_info: IntrinsicValRef,
        unativeint_operator_info: IntrinsicValRef,
        unativeint_tcr: EntityRef,
        unativeint_ty: TType,
        unbox_fast_info: IntrinsicValRef,
        unbox_fast_vref: ValRef,
        unbox_info: IntrinsicValRef,
        unbox_vref: ValRef,
        unchecked_addition_info: IntrinsicValRef,
        unchecked_addition_vref: ValRef,
        unchecked_defaultof_vref: ValRef,
        unchecked_division_info: IntrinsicValRef,
        unchecked_modulus_info: IntrinsicValRef,
        unchecked_multiply_info: IntrinsicValRef,
        unchecked_multiply_vref: ValRef,
        unchecked_subtraction_info: IntrinsicValRef,
        unchecked_subtraction_vref: ValRef,
        unchecked_unary_minus_info: IntrinsicValRef,
        unchecked_unary_minus_vref: ValRef,
        unchecked_unary_not_info: IntrinsicValRef,
        unchecked_unary_not_vref: ValRef,
        unchecked_unary_plus_info: IntrinsicValRef,
        unchecked_unary_plus_vref: ValRef,
        unit_tcr_canon: EntityRef,
        unit_tcr_nice: EntityRef,
        unit_ty: TType
      }
    };
  }

  constructor(compilingFslib, ilg, fslibCcu, directoryToResolveRelativePaths, mlCompatibility, isInteractive, tryFindSysTypeCcu, emitDebugInfoInQuotations, noDebugData) {
    var $var1;
    var $var4;
    var bty;
    var cty;
    var dty;
    var ty1;
    var d;
    var r;
    var d_1;
    var r_1;
    var d_2;
    var r_2;
    var d_3;
    var r_3;
    var r_4;
    var r_5;
    var d_5;
    var d_4;
    var r_7;
    var r_6;
    var bty_1;
    var cty_1;
    var dty_1;
    var d_6;
    var ty_17;
    var ty_18;
    var ty_19;
    var ty_20;
    var ty_21;
    var aty;
    var ty2;
    var r_8;
    var ty2_1;
    var r_9;
    var tcref;
    var tcref_1;
    this["compilingFslib@160"] = compilingFslib;
    this["ilg@160"] = ilg;
    this["fslibCcu@160"] = fslibCcu;
    this["directoryToResolveRelativePaths@160"] = directoryToResolveRelativePaths;
    this["mlCompatibility@161"] = mlCompatibility;
    this["isInteractive@161"] = isInteractive;
    this.tryFindSysTypeCcu = tryFindSysTypeCcu;
    this["emitDebugInfoInQuotations@164"] = emitDebugInfoInQuotations;
    this.noDebugData = noDebugData;
    const vara = NewRigidTypar("a", envRange);
    const varb = NewRigidTypar("b", envRange);
    const varc = NewRigidTypar("c", envRange);
    const vard = NewRigidTypar("d", envRange);
    const vare = NewRigidTypar("e", envRange);
    const varaTy = mkTyparTy(vara);
    const varbTy = mkTyparTy(varb);
    const varcTy = mkTyparTy(varc);
    const vardTy = mkTyparTy(vard);
    const vareTy = mkTyparTy(vare);
    this.v_int_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "int");
    this.v_nativeint_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "nativeint");
    this.v_unativeint_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "unativeint");
    this.v_int32_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "int32");
    this.v_int16_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "int16");
    this.v_int64_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "int64");
    this.v_uint16_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "uint16");
    this.v_uint32_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "uint32");
    this.v_uint64_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "uint64");
    this.v_sbyte_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "sbyte");
    this.v_decimal_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "decimal");
    this.v_pdecimal_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "decimal`1");
    this.v_byte_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "byte");
    this.v_bool_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "bool");
    const v_string_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "string");
    const v_obj_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "obj");
    this.v_unit_tcr_canon = mk_MFCore_tcref(this["fslibCcu@160"], "Unit");
    this.v_unit_tcr_nice = mk_MFCore_tcref(this["fslibCcu@160"], "unit");
    this.v_exn_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "exn");
    this.v_char_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "char");
    this.v_float_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "float");
    this.v_float32_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "float32");
    this.v_pfloat_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "float`1");
    this.v_pfloat32_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "float32`1");
    this.v_pint_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "int`1");
    this.v_pint8_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "sbyte`1");
    this.v_pint16_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "int16`1");
    this.v_pint64_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "int64`1");
    this.v_byref_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "byref`1");
    this.v_nativeptr_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "nativeptr`1");
    this.v_ilsigptr_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "ilsigptr`1");
    this.v_fastFunc_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "FSharpFunc`2");
    this.v_refcell_tcr_canon = mk_MFCore_tcref(this["fslibCcu@160"], "Ref`1");
    const v_refcell_tcr_nice = mk_MFCore_tcref(this["fslibCcu@160"], "ref`1");
    const sys = ofArray(["System"]);
    const sysLinq = ofArray(["System", "Linq"]);
    const sysCollections = ofArray(["System", "Collections"]);
    const sysGenerics = ofArray(["System", "Collections", "Generic"]);
    const sysCompilerServices = ofArray(["System", "Runtime", "CompilerServices"]);
    this.lazy_tcr = this.findSysTyconRef(sys, "Lazy`1");
    this.v_fslib_IEvent2_tcr = mk_MFControl_tcref(this["fslibCcu@160"], "IEvent`2");
    this.v_tcref_IQueryable = this.findSysTyconRef(sysLinq, "IQueryable`1");
    this.v_tcref_IObservable = this.findSysTyconRef(sys, "IObservable`1");
    this.v_tcref_IObserver = this.findSysTyconRef(sys, "IObserver`1");
    this.v_fslib_IDelegateEvent_tcr = mk_MFControl_tcref(this["fslibCcu@160"], "IDelegateEvent`1");
    this.v_option_tcr_nice = mk_MFCore_tcref(this["fslibCcu@160"], "option`1");
    this.v_list_tcr_canon = mk_MFCollections_tcref(this["fslibCcu@160"], "List`1");
    this.v_list_tcr_nice = mk_MFCollections_tcref(this["fslibCcu@160"], "list`1");
    this.v_lazy_tcr_nice = mk_MFControl_tcref(this["fslibCcu@160"], "Lazy`1");
    this.v_seq_tcr = mk_MFCollections_tcref(this["fslibCcu@160"], "seq`1");
    this.v_format_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "PrintfFormat`5");
    this.v_format4_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "PrintfFormat`4");
    this.v_date_tcr = this.findSysTyconRef(sys, "DateTime");
    this.v_IEnumerable_tcr = this.findSysTyconRef(sysGenerics, "IEnumerable`1");
    this.v_IEnumerator_tcr = this.findSysTyconRef(sysGenerics, "IEnumerator`1");
    this.v_System_Attribute_tcr = this.findSysTyconRef(sys, "Attribute");
    this.v_expr_tcr = mk_MFQuotations_tcref(this["fslibCcu@160"], "Expr`1");
    this.v_raw_expr_tcr = mk_MFQuotations_tcref(this["fslibCcu@160"], "Expr");
    this.v_query_builder_tcref = mk_MFLinq_tcref(this["fslibCcu@160"], "QueryBuilder");
    this.v_querySource_tcr = mk_MFLinq_tcref(this["fslibCcu@160"], "QuerySource`2");
    const path = ofArray(["System", "Linq", "Expressions"]);
    this.v_linqExpression_tcr = this.findSysTyconRef(path, "Expression`1");
    this.v_il_arr_tcr_map = Array.from(initialize(32, idx => {
      let type_sig;
      const rank = idx + 1 | 0;

      if (rank === 1) {
        type_sig = "[]`1";
      } else {
        type_sig = "[" + replicate(rank - 1, ",") + "]`1";
      }

      return mk_MFCore_tcref(this["fslibCcu@160"], type_sig);
    }));
    this.v_byte_ty = mkNonGenericTy(this.v_byte_tcr);
    const v_sbyte_ty = mkNonGenericTy(this.v_sbyte_tcr);
    const v_int16_ty = mkNonGenericTy(this.v_int16_tcr);
    const v_uint16_ty = mkNonGenericTy(this.v_uint16_tcr);
    this.v_int_ty = mkNonGenericTy(this.v_int_tcr);
    const v_int32_ty = mkNonGenericTy(this.v_int32_tcr);
    const v_uint32_ty = mkNonGenericTy(this.v_uint32_tcr);
    const v_int64_ty = mkNonGenericTy(this.v_int64_tcr);
    const v_uint64_ty = mkNonGenericTy(this.v_uint64_tcr);
    const v_float32_ty = mkNonGenericTy(this.v_float32_tcr);
    const v_float_ty = mkNonGenericTy(this.v_float_tcr);
    const v_nativeint_ty = mkNonGenericTy(this.v_nativeint_tcr);
    const v_unativeint_ty = mkNonGenericTy(this.v_unativeint_tcr);
    const v_enum_ty = mkNonGenericTy(this.v_int_tcr);
    this.v_bool_ty = mkNonGenericTy(this.v_bool_tcr);
    this.v_char_ty = mkNonGenericTy(this.v_char_tcr);
    this.v_obj_ty = mkNonGenericTy(v_obj_tcr);
    this.v_string_ty = mkNonGenericTy(v_string_tcr);
    this.v_decimal_ty = this.mkSysNonGenericTy(sys, "Decimal");
    this.v_unit_ty = mkNonGenericTy(this.v_unit_tcr_nice);
    this.v_system_Type_typ = this.mkSysNonGenericTy(sys, "Type");
    const path_1 = ofArray(["System", "Reflection"]);
    this.v_system_Reflection_MethodInfo_typ = this.mkSysNonGenericTy(path_1, "MethodInfo");
    this.v_nullable_tcr = this.findSysTyconRef(sys, "Nullable`1");
    this.v_knownIntrinsics = create(null, fromEqualityComparer(($var1 = this, {
      GetHashCode(x) {
        return (obj => hash(obj))(x) | 0;
      },

      Equals(x, y) {
        return ((e1, e2) => equals(e1, e2))(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    })));
    this.v_IComparer_ty = this.mkSysNonGenericTy(sysCollections, "IComparer");
    this.v_IEqualityComparer_ty = this.mkSysNonGenericTy(sysCollections, "IEqualityComparer");
    this.v_system_RuntimeMethodHandle_typ = this.mkSysNonGenericTy(sys, "RuntimeMethodHandle");
    this.v_tcref_System_Collections_IEnumerable = this.findSysTyconRef(sysCollections, "IEnumerable");
    const mkRawQuotedExprTy = new TType(1, [this.v_raw_expr_tcr, new List()]);
    const mkQueryBuilderTy = new TType(1, [this.v_query_builder_tcref, new List()]);
    this.v_cons_ucref = mkUnionCaseRef(this.v_list_tcr_canon, "op_ColonColon");
    this.v_nil_ucref = mkUnionCaseRef(this.v_list_tcr_canon, "op_Nil");
    const fslib_MF_nleref = mkNonLocalEntityRef(this["fslibCcu@160"], FSharpLib.RootPathArray);
    const fslib_MFCore_nleref = mkNonLocalEntityRef(this["fslibCcu@160"], FSharpLib.CorePathArray);
    const fslib_MFLinq_nleref = mkNonLocalEntityRef(this["fslibCcu@160"], FSharpLib.LinqPathArray);
    const fslib_MFCollections_nleref = mkNonLocalEntityRef(this["fslibCcu@160"], FSharpLib.CollectionsPathArray);
    const fslib_MFCompilerServices_nleref = mkNonLocalEntityRef(this["fslibCcu@160"], FSharpLib.CompilerServicesPath);
    const fslib_MFLinqRuntimeHelpers_nleref = mkNonLocalEntityRef(this["fslibCcu@160"], FSharpLib.LinqRuntimeHelpersPath);
    const fslib_MFControl_nleref = mkNonLocalEntityRef(this["fslibCcu@160"], FSharpLib.ControlPathArray);
    const fslib_MFLanguagePrimitives_nleref = mkNestedNonLocalEntityRef(fslib_MFCore_nleref, "LanguagePrimitives");
    const fslib_MFIntrinsicOperators_nleref = mkNestedNonLocalEntityRef(fslib_MFLanguagePrimitives_nleref, "IntrinsicOperators");
    const fslib_MFIntrinsicFunctions_nleref = mkNestedNonLocalEntityRef(fslib_MFLanguagePrimitives_nleref, "IntrinsicFunctions");
    const fslib_MFHashCompare_nleref = mkNestedNonLocalEntityRef(fslib_MFLanguagePrimitives_nleref, "HashCompare");
    const fslib_MFOperators_nleref = mkNestedNonLocalEntityRef(fslib_MFCore_nleref, "Operators");
    const fslib_MFOperatorIntrinsics_nleref = mkNestedNonLocalEntityRef(fslib_MFOperators_nleref, "OperatorIntrinsics");
    const fslib_MFOperatorsUnchecked_nleref = mkNestedNonLocalEntityRef(fslib_MFOperators_nleref, "Unchecked");
    const fslib_MFOperatorsChecked_nleref = mkNestedNonLocalEntityRef(fslib_MFOperators_nleref, "Checked");
    const fslib_MFExtraTopLevelOperators_nleref = mkNestedNonLocalEntityRef(fslib_MFCore_nleref, "ExtraTopLevelOperators");
    const fslib_MFNullableOperators_nleref = mkNestedNonLocalEntityRef(fslib_MFLinq_nleref, "NullableOperators");
    const fslib_MFQueryRunExtensions_nleref = mkNestedNonLocalEntityRef(fslib_MFLinq_nleref, "QueryRunExtensions");
    const fslib_MFQueryRunExtensionsLowPriority_nleref = mkNestedNonLocalEntityRef(fslib_MFQueryRunExtensions_nleref, "LowPriority");
    const fslib_MFQueryRunExtensionsHighPriority_nleref = mkNestedNonLocalEntityRef(fslib_MFQueryRunExtensions_nleref, "HighPriority");
    const fslib_MFSeqModule_nleref = mkNestedNonLocalEntityRef(fslib_MFCollections_nleref, "SeqModule");
    const fslib_MFListModule_nleref = mkNestedNonLocalEntityRef(fslib_MFCollections_nleref, "ListModule");
    const fslib_MFArrayModule_nleref = mkNestedNonLocalEntityRef(fslib_MFCollections_nleref, "ArrayModule");
    const fslib_MFArray2DModule_nleref = mkNestedNonLocalEntityRef(fslib_MFCollections_nleref, "Array2DModule");
    const fslib_MFArray3DModule_nleref = mkNestedNonLocalEntityRef(fslib_MFCollections_nleref, "Array3DModule");
    const fslib_MFArray4DModule_nleref = mkNestedNonLocalEntityRef(fslib_MFCollections_nleref, "Array4DModule");
    const fslib_MFSetModule_nleref = mkNestedNonLocalEntityRef(fslib_MFCollections_nleref, "SetModule");
    const fslib_MFMapModule_nleref = mkNestedNonLocalEntityRef(fslib_MFCollections_nleref, "MapModule");
    const fslib_MFStringModule_nleref = mkNestedNonLocalEntityRef(fslib_MFCollections_nleref, "StringModule");
    const fslib_MFOptionModule_nleref = mkNestedNonLocalEntityRef(fslib_MFCore_nleref, "OptionModule");
    const fslib_MFRuntimeHelpers_nleref = mkNestedNonLocalEntityRef(fslib_MFCompilerServices_nleref, "RuntimeHelpers");
    const fslib_MFQuotations_nleref = mkNestedNonLocalEntityRef(fslib_MF_nleref, "Quotations");
    const fslib_MFLinqRuntimeHelpersQuotationConverter_nleref = mkNestedNonLocalEntityRef(fslib_MFLinqRuntimeHelpers_nleref, "LeafExpressionConverter");
    const fslib_MFLazyExtensions_nleref = mkNestedNonLocalEntityRef(fslib_MFControl_nleref, "LazyExtensions");
    this.v_ref_tuple1_tcr = this.findSysTyconRef(sys, "Tuple`1");
    this.v_ref_tuple2_tcr = this.findSysTyconRef(sys, "Tuple`2");
    this.v_ref_tuple3_tcr = this.findSysTyconRef(sys, "Tuple`3");
    this.v_ref_tuple4_tcr = this.findSysTyconRef(sys, "Tuple`4");
    this.v_ref_tuple5_tcr = this.findSysTyconRef(sys, "Tuple`5");
    this.v_ref_tuple6_tcr = this.findSysTyconRef(sys, "Tuple`6");
    this.v_ref_tuple7_tcr = this.findSysTyconRef(sys, "Tuple`7");
    this.v_ref_tuple8_tcr = this.findSysTyconRef(sys, "Tuple`8");
    this.v_struct_tuple1_tcr = this.findSysTyconRef(sys, "ValueTuple`1");
    this.v_struct_tuple2_tcr = this.findSysTyconRef(sys, "ValueTuple`2");
    this.v_struct_tuple3_tcr = this.findSysTyconRef(sys, "ValueTuple`3");
    this.v_struct_tuple4_tcr = this.findSysTyconRef(sys, "ValueTuple`4");
    this.v_struct_tuple5_tcr = this.findSysTyconRef(sys, "ValueTuple`5");
    this.v_struct_tuple6_tcr = this.findSysTyconRef(sys, "ValueTuple`6");
    this.v_struct_tuple7_tcr = this.findSysTyconRef(sys, "ValueTuple`7");
    this.v_struct_tuple8_tcr = this.findSysTyconRef(sys, "ValueTuple`8");
    this.v_choice2_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "Choice`2");
    this.v_choice3_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "Choice`3");
    this.v_choice4_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "Choice`4");
    this.v_choice5_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "Choice`5");
    this.v_choice6_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "Choice`6");
    this.v_choice7_tcr = mk_MFCore_tcref(this["fslibCcu@160"], "Choice`7");
    this.v_suppressed_types = ofArray([mk_MFCore_tcref(this["fslibCcu@160"], "Option`1"), mk_MFCore_tcref(this["fslibCcu@160"], "Ref`1"), mk_MFCore_tcref(this["fslibCcu@160"], "FSharpTypeFunc"), mk_MFCore_tcref(this["fslibCcu@160"], "FSharpFunc`2"), mk_MFCore_tcref(this["fslibCcu@160"], "Unit")]);
    this.v_knownFSharpCoreModules = new Map(toList(delay(() => map(nleref => [nleref.LastItemMangledName, ERefNonLocal(nleref)], ofArray([fslib_MFLanguagePrimitives_nleref, fslib_MFIntrinsicOperators_nleref, fslib_MFIntrinsicFunctions_nleref, fslib_MFHashCompare_nleref, fslib_MFOperators_nleref, fslib_MFOperatorIntrinsics_nleref, fslib_MFOperatorsUnchecked_nleref, fslib_MFOperatorsChecked_nleref, fslib_MFExtraTopLevelOperators_nleref, fslib_MFNullableOperators_nleref, fslib_MFQueryRunExtensions_nleref, fslib_MFQueryRunExtensionsLowPriority_nleref, fslib_MFQueryRunExtensionsHighPriority_nleref, fslib_MFSeqModule_nleref, fslib_MFListModule_nleref, fslib_MFArrayModule_nleref, fslib_MFArray2DModule_nleref, fslib_MFArray3DModule_nleref, fslib_MFArray4DModule_nleref, fslib_MFSetModule_nleref, fslib_MFMapModule_nleref, fslib_MFStringModule_nleref, fslib_MFOptionModule_nleref, fslib_MFRuntimeHelpers_nleref])))));
    this.v_memoize_file = new MemoizationTable($var3 => (filename => this.mk_doc(filename))(($var2 => Filename.fullpath(this["directoryToResolveRelativePaths@160"], fileOfFileIndex($var2)))($var3)), ($var4 = this, {
      GetHashCode(x) {
        return (obj_1 => hash(obj_1))(x) | 0;
      },

      Equals(x, y) {
        return ((e1_1, e2_1) => equals(e1_1, e2_1))(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    }));
    let v_and_info;
    const logicalName = CompileOpName("&");
    const memberParentName = null;
    const compiledNameOpt = null;
    const typars = new List();

    let _arg1;

    const ty = this.v_bool_ty;
    _arg1 = this.mk_rel_sig(ty);
    v_and_info = this.makeIntrinsicValRef(fslib_MFIntrinsicOperators_nleref, logicalName, memberParentName, compiledNameOpt, typars, _arg1);
    let v_addrof_info;
    const logicalName_1 = CompileOpName("~&");
    const memberParentName_1 = null;
    const compiledNameOpt_1 = null;
    const typars_1 = ofArray([vara]);
    const _arg1_1 = [ofArray([ofArray([varaTy])]), this.mkByrefTy(varaTy)];
    v_addrof_info = this.makeIntrinsicValRef(fslib_MFIntrinsicOperators_nleref, logicalName_1, memberParentName_1, compiledNameOpt_1, typars_1, _arg1_1);
    let v_addrof2_info;
    const logicalName_2 = CompileOpName("~&&");
    const memberParentName_2 = null;
    const compiledNameOpt_2 = null;
    const typars_2 = ofArray([vara]);
    const _arg1_2 = [ofArray([ofArray([varaTy])]), this.mkNativePtrTy(varaTy)];
    v_addrof2_info = this.makeIntrinsicValRef(fslib_MFIntrinsicOperators_nleref, logicalName_2, memberParentName_2, compiledNameOpt_2, typars_2, _arg1_2);
    let v_and2_info;
    const logicalName_3 = CompileOpName("&&");
    const memberParentName_3 = null;
    const compiledNameOpt_3 = null;
    const typars_3 = new List();

    let _arg1_3;

    const ty_1 = this.v_bool_ty;
    _arg1_3 = this.mk_rel_sig(ty_1);
    v_and2_info = this.makeIntrinsicValRef(fslib_MFIntrinsicOperators_nleref, logicalName_3, memberParentName_3, compiledNameOpt_3, typars_3, _arg1_3);
    let v_or_info;
    const memberParentName_4 = null;
    const compiledNameOpt_4 = "Or";
    const typars_4 = new List();

    let _arg1_4;

    const ty_2 = this.v_bool_ty;
    _arg1_4 = this.mk_rel_sig(ty_2);
    v_or_info = this.makeIntrinsicValRef(fslib_MFIntrinsicOperators_nleref, "or", memberParentName_4, compiledNameOpt_4, typars_4, _arg1_4);
    let v_or2_info;
    const logicalName_4 = CompileOpName("||");
    const memberParentName_5 = null;
    const compiledNameOpt_5 = null;
    const typars_5 = new List();

    let _arg1_5;

    const ty_3 = this.v_bool_ty;
    _arg1_5 = this.mk_rel_sig(ty_3);
    v_or2_info = this.makeIntrinsicValRef(fslib_MFIntrinsicOperators_nleref, logicalName_4, memberParentName_5, compiledNameOpt_5, typars_5, _arg1_5);
    let v_compare_operator_info;
    const memberParentName_6 = null;
    const compiledNameOpt_6 = "Compare";
    const typars_6 = ofArray([vara]);

    const _arg1_6 = this.mk_compare_sig(varaTy);

    v_compare_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "compare", memberParentName_6, compiledNameOpt_6, typars_6, _arg1_6);
    const logicalName_5 = CompileOpName("=");
    const memberParentName_7 = null;
    const compiledNameOpt_7 = null;
    const typars_7 = ofArray([vara]);

    const _arg1_7 = this.mk_rel_sig(varaTy);

    this.v_equals_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, logicalName_5, memberParentName_7, compiledNameOpt_7, typars_7, _arg1_7);
    let v_equals_nullable_operator_info;
    const logicalName_6 = CompileOpName("=?");
    const memberParentName_8 = null;
    const compiledNameOpt_8 = null;
    const typars_8 = ofArray([vara]);
    const _arg1_8 = [ofArray([ofArray([varaTy]), ofArray([this.mkNullableTy(varaTy)])]), this.v_bool_ty];
    v_equals_nullable_operator_info = this.makeIntrinsicValRef(fslib_MFNullableOperators_nleref, logicalName_6, memberParentName_8, compiledNameOpt_8, typars_8, _arg1_8);
    let v_nullable_equals_operator_info;
    const logicalName_7 = CompileOpName("?=");
    const memberParentName_9 = null;
    const compiledNameOpt_9 = null;
    const typars_9 = ofArray([vara]);
    const _arg1_9 = [ofArray([ofArray([this.mkNullableTy(varaTy)]), ofArray([varaTy])]), this.v_bool_ty];
    v_nullable_equals_operator_info = this.makeIntrinsicValRef(fslib_MFNullableOperators_nleref, logicalName_7, memberParentName_9, compiledNameOpt_9, typars_9, _arg1_9);
    let v_nullable_equals_nullable_operator_info;
    const logicalName_8 = CompileOpName("?=?");
    const memberParentName_10 = null;
    const compiledNameOpt_10 = null;
    const typars_10 = ofArray([vara]);
    const _arg1_10 = [ofArray([ofArray([this.mkNullableTy(varaTy)]), ofArray([this.mkNullableTy(varaTy)])]), this.v_bool_ty];
    v_nullable_equals_nullable_operator_info = this.makeIntrinsicValRef(fslib_MFNullableOperators_nleref, logicalName_8, memberParentName_10, compiledNameOpt_10, typars_10, _arg1_10);
    const logicalName_9 = CompileOpName("<>");
    const memberParentName_11 = null;
    const compiledNameOpt_11 = null;
    const typars_11 = ofArray([vara]);

    const _arg1_11 = this.mk_rel_sig(varaTy);

    this.v_not_equals_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, logicalName_9, memberParentName_11, compiledNameOpt_11, typars_11, _arg1_11);
    const logicalName_10 = CompileOpName("<");
    const memberParentName_12 = null;
    const compiledNameOpt_12 = null;
    const typars_12 = ofArray([vara]);

    const _arg1_12 = this.mk_rel_sig(varaTy);

    this.v_less_than_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, logicalName_10, memberParentName_12, compiledNameOpt_12, typars_12, _arg1_12);
    const logicalName_11 = CompileOpName("<=");
    const memberParentName_13 = null;
    const compiledNameOpt_13 = null;
    const typars_13 = ofArray([vara]);

    const _arg1_13 = this.mk_rel_sig(varaTy);

    this.v_less_than_or_equals_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, logicalName_11, memberParentName_13, compiledNameOpt_13, typars_13, _arg1_13);
    const logicalName_12 = CompileOpName(">");
    const memberParentName_14 = null;
    const compiledNameOpt_14 = null;
    const typars_14 = ofArray([vara]);

    const _arg1_14 = this.mk_rel_sig(varaTy);

    this.v_greater_than_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, logicalName_12, memberParentName_14, compiledNameOpt_14, typars_14, _arg1_14);
    const logicalName_13 = CompileOpName(">=");
    const memberParentName_15 = null;
    const compiledNameOpt_15 = null;
    const typars_15 = ofArray([vara]);

    const _arg1_15 = this.mk_rel_sig(varaTy);

    this.v_greater_than_or_equals_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, logicalName_13, memberParentName_15, compiledNameOpt_15, typars_15, _arg1_15);
    let v_enumOfValue_info;
    const memberParentName_16 = null;
    const compiledNameOpt_16 = null;
    const typars_16 = ofArray([vara, varb]);
    const _arg1_16 = [ofArray([ofArray([varaTy])]), varbTy];
    v_enumOfValue_info = this.makeIntrinsicValRef(fslib_MFLanguagePrimitives_nleref, "EnumOfValue", memberParentName_16, compiledNameOpt_16, typars_16, _arg1_16);
    const memberParentName_17 = null;
    const compiledNameOpt_17 = null;
    const typars_17 = ofArray([vara]);

    const _arg1_17 = this.mk_compare_withc_sig(varaTy);

    this.v_generic_comparison_withc_outer_info = this.makeIntrinsicValRef(fslib_MFLanguagePrimitives_nleref, "GenericComparisonWithComparer", memberParentName_17, compiledNameOpt_17, typars_17, _arg1_17);
    let v_generic_hash_withc_tuple2_info;
    const memberParentName_18 = null;
    const compiledNameOpt_18 = null;
    const typars_18 = ofArray([vara, varb]);

    let _arg1_18;

    let ty_4;
    const l = ofArray([varaTy, varbTy]);
    ty_4 = this.decodeTupleTy(tupInfoRef, l);
    _arg1_18 = this.mk_hash_withc_sig(ty_4);
    v_generic_hash_withc_tuple2_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastHashTuple2", memberParentName_18, compiledNameOpt_18, typars_18, _arg1_18);
    let v_generic_hash_withc_tuple3_info;
    const memberParentName_19 = null;
    const compiledNameOpt_19 = null;
    const typars_19 = ofArray([vara, varb, varc]);

    let _arg1_19;

    let ty_5;
    const l_1 = ofArray([varaTy, varbTy, varcTy]);
    ty_5 = this.decodeTupleTy(tupInfoRef, l_1);
    _arg1_19 = this.mk_hash_withc_sig(ty_5);
    v_generic_hash_withc_tuple3_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastHashTuple3", memberParentName_19, compiledNameOpt_19, typars_19, _arg1_19);
    let v_generic_hash_withc_tuple4_info;
    const memberParentName_20 = null;
    const compiledNameOpt_20 = null;
    const typars_20 = ofArray([vara, varb, varc, vard]);

    let _arg1_20;

    let ty_6;
    const l_2 = ofArray([varaTy, varbTy, varcTy, vardTy]);
    ty_6 = this.decodeTupleTy(tupInfoRef, l_2);
    _arg1_20 = this.mk_hash_withc_sig(ty_6);
    v_generic_hash_withc_tuple4_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastHashTuple4", memberParentName_20, compiledNameOpt_20, typars_20, _arg1_20);
    let v_generic_hash_withc_tuple5_info;
    const memberParentName_21 = null;
    const compiledNameOpt_21 = null;
    const typars_21 = ofArray([vara, varb, varc, vard, vare]);

    let _arg1_21;

    let ty_7;
    const l_3 = ofArray([varaTy, varbTy, varcTy, vardTy, vareTy]);
    ty_7 = this.decodeTupleTy(tupInfoRef, l_3);
    _arg1_21 = this.mk_hash_withc_sig(ty_7);
    v_generic_hash_withc_tuple5_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastHashTuple5", memberParentName_21, compiledNameOpt_21, typars_21, _arg1_21);
    let v_generic_equals_withc_tuple2_info;
    const memberParentName_22 = null;
    const compiledNameOpt_22 = null;
    const typars_22 = ofArray([vara, varb]);

    let _arg1_22;

    let ty_8;
    const l_4 = ofArray([varaTy, varbTy]);
    ty_8 = this.decodeTupleTy(tupInfoRef, l_4);
    _arg1_22 = this.mk_equality_withc_sig(ty_8);
    v_generic_equals_withc_tuple2_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastEqualsTuple2", memberParentName_22, compiledNameOpt_22, typars_22, _arg1_22);
    let v_generic_equals_withc_tuple3_info;
    const memberParentName_23 = null;
    const compiledNameOpt_23 = null;
    const typars_23 = ofArray([vara, varb, varc]);

    let _arg1_23;

    let ty_9;
    const l_5 = ofArray([varaTy, varbTy, varcTy]);
    ty_9 = this.decodeTupleTy(tupInfoRef, l_5);
    _arg1_23 = this.mk_equality_withc_sig(ty_9);
    v_generic_equals_withc_tuple3_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastEqualsTuple3", memberParentName_23, compiledNameOpt_23, typars_23, _arg1_23);
    let v_generic_equals_withc_tuple4_info;
    const memberParentName_24 = null;
    const compiledNameOpt_24 = null;
    const typars_24 = ofArray([vara, varb, varc, vard]);

    let _arg1_24;

    let ty_10;
    const l_6 = ofArray([varaTy, varbTy, varcTy, vardTy]);
    ty_10 = this.decodeTupleTy(tupInfoRef, l_6);
    _arg1_24 = this.mk_equality_withc_sig(ty_10);
    v_generic_equals_withc_tuple4_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastEqualsTuple4", memberParentName_24, compiledNameOpt_24, typars_24, _arg1_24);
    let v_generic_equals_withc_tuple5_info;
    const memberParentName_25 = null;
    const compiledNameOpt_25 = null;
    const typars_25 = ofArray([vara, varb, varc, vard, vare]);

    let _arg1_25;

    let ty_11;
    const l_7 = ofArray([varaTy, varbTy, varcTy, vardTy, vareTy]);
    ty_11 = this.decodeTupleTy(tupInfoRef, l_7);
    _arg1_25 = this.mk_equality_withc_sig(ty_11);
    v_generic_equals_withc_tuple5_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastEqualsTuple5", memberParentName_25, compiledNameOpt_25, typars_25, _arg1_25);
    let v_generic_compare_withc_tuple2_info;
    const memberParentName_26 = null;
    const compiledNameOpt_26 = null;
    const typars_26 = ofArray([vara, varb]);

    let _arg1_26;

    let ty_12;
    const l_8 = ofArray([varaTy, varbTy]);
    ty_12 = this.decodeTupleTy(tupInfoRef, l_8);
    _arg1_26 = this.mk_compare_withc_sig(ty_12);
    v_generic_compare_withc_tuple2_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastCompareTuple2", memberParentName_26, compiledNameOpt_26, typars_26, _arg1_26);
    let v_generic_compare_withc_tuple3_info;
    const memberParentName_27 = null;
    const compiledNameOpt_27 = null;
    const typars_27 = ofArray([vara, varb, varc]);

    let _arg1_27;

    let ty_13;
    const l_9 = ofArray([varaTy, varbTy, varcTy]);
    ty_13 = this.decodeTupleTy(tupInfoRef, l_9);
    _arg1_27 = this.mk_compare_withc_sig(ty_13);
    v_generic_compare_withc_tuple3_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastCompareTuple3", memberParentName_27, compiledNameOpt_27, typars_27, _arg1_27);
    let v_generic_compare_withc_tuple4_info;
    const memberParentName_28 = null;
    const compiledNameOpt_28 = null;
    const typars_28 = ofArray([vara, varb, varc, vard]);

    let _arg1_28;

    let ty_14;
    const l_10 = ofArray([varaTy, varbTy, varcTy, vardTy]);
    ty_14 = this.decodeTupleTy(tupInfoRef, l_10);
    _arg1_28 = this.mk_compare_withc_sig(ty_14);
    v_generic_compare_withc_tuple4_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastCompareTuple4", memberParentName_28, compiledNameOpt_28, typars_28, _arg1_28);
    let v_generic_compare_withc_tuple5_info;
    const memberParentName_29 = null;
    const compiledNameOpt_29 = null;
    const typars_29 = ofArray([vara, varb, varc, vard, vare]);

    let _arg1_29;

    let ty_15;
    const l_11 = ofArray([varaTy, varbTy, varcTy, vardTy, vareTy]);
    ty_15 = this.decodeTupleTy(tupInfoRef, l_11);
    _arg1_29 = this.mk_compare_withc_sig(ty_15);
    v_generic_compare_withc_tuple5_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "FastCompareTuple5", memberParentName_29, compiledNameOpt_29, typars_29, _arg1_29);
    const memberParentName_30 = null;
    const compiledNameOpt_30 = null;
    const typars_30 = ofArray([vara]);

    const _arg1_30 = this.mk_rel_sig(varaTy);

    this.v_generic_equality_er_outer_info = this.makeIntrinsicValRef(fslib_MFLanguagePrimitives_nleref, "GenericEqualityER", memberParentName_30, compiledNameOpt_30, typars_30, _arg1_30);
    const memberParentName_31 = null;
    const compiledNameOpt_31 = null;
    const typars_31 = new List();
    const _arg1_31 = [new List(), this.v_IComparer_ty];
    this.v_get_generic_comparer_info = this.makeIntrinsicValRef(fslib_MFLanguagePrimitives_nleref, "GenericComparer", memberParentName_31, compiledNameOpt_31, typars_31, _arg1_31);
    const memberParentName_32 = null;
    const compiledNameOpt_32 = null;
    const typars_32 = new List();
    const _arg1_32 = [new List(), this.v_IEqualityComparer_ty];
    this.v_get_generic_er_equality_comparer_info = this.makeIntrinsicValRef(fslib_MFLanguagePrimitives_nleref, "GenericEqualityERComparer", memberParentName_32, compiledNameOpt_32, typars_32, _arg1_32);
    const memberParentName_33 = null;
    const compiledNameOpt_33 = null;
    const typars_33 = new List();
    const _arg1_33 = [new List(), this.v_IEqualityComparer_ty];
    this.v_get_generic_per_equality_comparer_info = this.makeIntrinsicValRef(fslib_MFLanguagePrimitives_nleref, "GenericEqualityComparer", memberParentName_33, compiledNameOpt_33, typars_33, _arg1_33);
    const memberParentName_34 = null;
    const compiledNameOpt_34 = null;
    const typars_34 = ofArray([vara]);

    const _arg1_34 = this.mk_equality_withc_sig(varaTy);

    this.v_generic_equality_withc_outer_info = this.makeIntrinsicValRef(fslib_MFLanguagePrimitives_nleref, "GenericEqualityWithComparer", memberParentName_34, compiledNameOpt_34, typars_34, _arg1_34);
    const memberParentName_35 = null;
    const compiledNameOpt_35 = null;
    const typars_35 = ofArray([vara]);

    const _arg1_35 = this.mk_hash_withc_sig(varaTy);

    this.v_generic_hash_withc_outer_info = this.makeIntrinsicValRef(fslib_MFLanguagePrimitives_nleref, "GenericHashWithComparer", memberParentName_35, compiledNameOpt_35, typars_35, _arg1_35);
    let v_generic_equality_er_inner_info;
    const memberParentName_36 = null;
    const compiledNameOpt_36 = null;
    const typars_36 = ofArray([vara]);

    const _arg1_36 = this.mk_rel_sig(varaTy);

    v_generic_equality_er_inner_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "GenericEqualityERIntrinsic", memberParentName_36, compiledNameOpt_36, typars_36, _arg1_36);
    let v_generic_equality_per_inner_info;
    const memberParentName_37 = null;
    const compiledNameOpt_37 = null;
    const typars_37 = ofArray([vara]);

    const _arg1_37 = this.mk_rel_sig(varaTy);

    v_generic_equality_per_inner_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "GenericEqualityIntrinsic", memberParentName_37, compiledNameOpt_37, typars_37, _arg1_37);
    let v_generic_equality_withc_inner_info;
    const memberParentName_38 = null;
    const compiledNameOpt_38 = null;
    const typars_38 = ofArray([vara]);

    const _arg1_38 = this.mk_equality_withc_sig(varaTy);

    v_generic_equality_withc_inner_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "GenericEqualityWithComparerIntrinsic", memberParentName_38, compiledNameOpt_38, typars_38, _arg1_38);
    let v_generic_comparison_inner_info;
    const memberParentName_39 = null;
    const compiledNameOpt_39 = null;
    const typars_39 = ofArray([vara]);

    const _arg1_39 = this.mk_compare_sig(varaTy);

    v_generic_comparison_inner_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "GenericComparisonIntrinsic", memberParentName_39, compiledNameOpt_39, typars_39, _arg1_39);
    let v_generic_comparison_withc_inner_info;
    const memberParentName_40 = null;
    const compiledNameOpt_40 = null;
    const typars_40 = ofArray([vara]);

    const _arg1_40 = this.mk_compare_withc_sig(varaTy);

    v_generic_comparison_withc_inner_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "GenericComparisonWithComparerIntrinsic", memberParentName_40, compiledNameOpt_40, typars_40, _arg1_40);
    let v_generic_hash_inner_info;
    const memberParentName_41 = null;
    const compiledNameOpt_41 = null;
    const typars_41 = ofArray([vara]);

    const _arg1_41 = this.mk_hash_sig(varaTy);

    v_generic_hash_inner_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "GenericHashIntrinsic", memberParentName_41, compiledNameOpt_41, typars_41, _arg1_41);
    let v_generic_hash_withc_inner_info;
    const memberParentName_42 = null;
    const compiledNameOpt_42 = null;
    const typars_42 = ofArray([vara]);

    const _arg1_42 = this.mk_hash_withc_sig(varaTy);

    v_generic_hash_withc_inner_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "GenericHashWithComparerIntrinsic", memberParentName_42, compiledNameOpt_42, typars_42, _arg1_42);
    const memberParentName_43 = null;
    const compiledNameOpt_43 = null;
    const typars_43 = ofArray([vara]);
    const _arg1_43 = [ofArray([ofArray([this.v_unit_ty])]), varaTy];
    this.v_create_instance_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "CreateInstance", memberParentName_43, compiledNameOpt_43, typars_43, _arg1_43);
    const memberParentName_44 = null;
    const compiledNameOpt_44 = null;
    const typars_44 = ofArray([vara]);
    const _arg1_44 = [ofArray([ofArray([this.v_obj_ty])]), varaTy];
    this.v_unbox_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "UnboxGeneric", memberParentName_44, compiledNameOpt_44, typars_44, _arg1_44);
    const memberParentName_45 = null;
    const compiledNameOpt_45 = null;
    const typars_45 = ofArray([vara]);
    const _arg1_45 = [ofArray([ofArray([this.v_obj_ty])]), varaTy];
    this.v_unbox_fast_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "UnboxFast", memberParentName_45, compiledNameOpt_45, typars_45, _arg1_45);
    const memberParentName_46 = null;
    const compiledNameOpt_46 = null;
    const typars_46 = ofArray([vara]);
    const _arg1_46 = [ofArray([ofArray([this.v_obj_ty])]), this.v_bool_ty];
    this.v_istype_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "TypeTestGeneric", memberParentName_46, compiledNameOpt_46, typars_46, _arg1_46);
    const memberParentName_47 = null;
    const compiledNameOpt_47 = null;
    const typars_47 = ofArray([vara]);
    const _arg1_47 = [ofArray([ofArray([this.v_obj_ty])]), this.v_bool_ty];
    this.v_istype_fast_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "TypeTestFast", memberParentName_47, compiledNameOpt_47, typars_47, _arg1_47);
    const memberParentName_48 = null;
    const compiledNameOpt_48 = null;
    const typars_48 = ofArray([vara]);
    const _arg1_48 = [ofArray([ofArray([varaTy])]), this.v_unit_ty];
    this.v_dispose_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "Dispose", memberParentName_48, compiledNameOpt_48, typars_48, _arg1_48);
    const memberParentName_49 = null;
    const compiledNameOpt_49 = null;
    const typars_49 = new List();
    const _arg1_49 = [ofArray([ofArray([this.v_string_ty]), ofArray([this.v_int_ty])]), this.v_char_ty];
    this.v_getstring_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "GetString", memberParentName_49, compiledNameOpt_49, typars_49, _arg1_49);
    let v_reference_equality_inner_info;
    const memberParentName_50 = null;
    const compiledNameOpt_50 = null;
    const typars_50 = ofArray([vara]);

    const _arg1_50 = this.mk_rel_sig(varaTy);

    v_reference_equality_inner_info = this.makeIntrinsicValRef(fslib_MFHashCompare_nleref, "PhysicalEqualityIntrinsic", memberParentName_50, compiledNameOpt_50, typars_50, _arg1_50);
    const memberParentName_51 = null;
    const compiledNameOpt_51 = null;
    const typars_51 = ofArray([vara]);

    const _arg1_51 = this.mk_binop_ty(varaTy);

    this.v_bitwise_or_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_BitwiseOr", memberParentName_51, compiledNameOpt_51, typars_51, _arg1_51);
    const memberParentName_52 = null;
    const compiledNameOpt_52 = null;
    const typars_52 = ofArray([vara]);

    const _arg1_52 = this.mk_binop_ty(varaTy);

    this.v_bitwise_and_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_BitwiseAnd", memberParentName_52, compiledNameOpt_52, typars_52, _arg1_52);
    const memberParentName_53 = null;
    const compiledNameOpt_53 = null;
    const typars_53 = ofArray([vara]);

    const _arg1_53 = this.mk_binop_ty(varaTy);

    this.v_bitwise_xor_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_ExclusiveOr", memberParentName_53, compiledNameOpt_53, typars_53, _arg1_53);
    const memberParentName_54 = null;
    const compiledNameOpt_54 = null;
    const typars_54 = ofArray([vara]);

    const _arg1_54 = this.mk_unop_ty(varaTy);

    this.v_bitwise_unary_not_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_LogicalNot", memberParentName_54, compiledNameOpt_54, typars_54, _arg1_54);
    const memberParentName_55 = null;
    const compiledNameOpt_55 = null;
    const typars_55 = ofArray([vara]);

    const _arg1_55 = this.mk_shiftop_ty(varaTy);

    this.v_bitwise_shift_left_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_LeftShift", memberParentName_55, compiledNameOpt_55, typars_55, _arg1_55);
    const memberParentName_56 = null;
    const compiledNameOpt_56 = null;
    const typars_56 = ofArray([vara]);

    const _arg1_56 = this.mk_shiftop_ty(varaTy);

    this.v_bitwise_shift_right_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_RightShift", memberParentName_56, compiledNameOpt_56, typars_56, _arg1_56);
    const memberParentName_57 = null;
    const compiledNameOpt_57 = null;
    const typars_57 = ofArray([vara, varb, varc]);

    const _arg1_57 = this.mk_binop_ty3(varaTy, varbTy, varcTy);

    this.v_unchecked_addition_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_Addition", memberParentName_57, compiledNameOpt_57, typars_57, _arg1_57);
    const memberParentName_58 = null;
    const compiledNameOpt_58 = null;
    const typars_58 = ofArray([vara, varb, varc]);

    const _arg1_58 = this.mk_binop_ty3(varaTy, varbTy, varcTy);

    this.v_unchecked_subtraction_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_Subtraction", memberParentName_58, compiledNameOpt_58, typars_58, _arg1_58);
    const memberParentName_59 = null;
    const compiledNameOpt_59 = null;
    const typars_59 = ofArray([vara, varb, varc]);

    const _arg1_59 = this.mk_binop_ty3(varaTy, varbTy, varcTy);

    this.v_unchecked_multiply_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_Multiply", memberParentName_59, compiledNameOpt_59, typars_59, _arg1_59);
    const memberParentName_60 = null;
    const compiledNameOpt_60 = null;
    const typars_60 = ofArray([vara, varb, varc]);

    const _arg1_60 = this.mk_binop_ty3(varaTy, varbTy, varcTy);

    this.v_unchecked_division_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_Division", memberParentName_60, compiledNameOpt_60, typars_60, _arg1_60);
    const memberParentName_61 = null;
    const compiledNameOpt_61 = null;
    const typars_61 = ofArray([vara, varb, varc]);

    const _arg1_61 = this.mk_binop_ty3(varaTy, varbTy, varcTy);

    this.v_unchecked_modulus_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_Modulus", memberParentName_61, compiledNameOpt_61, typars_61, _arg1_61);
    const memberParentName_62 = null;
    const compiledNameOpt_62 = null;
    const typars_62 = ofArray([vara]);

    const _arg1_62 = this.mk_unop_ty(varaTy);

    this.v_unchecked_unary_plus_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_UnaryPlus", memberParentName_62, compiledNameOpt_62, typars_62, _arg1_62);
    const memberParentName_63 = null;
    const compiledNameOpt_63 = null;
    const typars_63 = ofArray([vara]);

    const _arg1_63 = this.mk_unop_ty(varaTy);

    this.v_unchecked_unary_minus_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_UnaryNegation", memberParentName_63, compiledNameOpt_63, typars_63, _arg1_63);
    const memberParentName_64 = null;
    const compiledNameOpt_64 = "Not";
    const typars_64 = new List();

    let _arg1_64;

    const ty_16 = this.v_bool_ty;
    _arg1_64 = this.mk_unop_ty(ty_16);
    this.v_unchecked_unary_not_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "not", memberParentName_64, compiledNameOpt_64, typars_64, _arg1_64);
    const memberParentName_65 = null;
    const compiledNameOpt_65 = null;
    const typars_65 = ofArray([vara, varb, varc]);

    const _arg1_65 = this.mk_binop_ty3(varaTy, varbTy, varcTy);

    this.v_checked_addition_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "op_Addition", memberParentName_65, compiledNameOpt_65, typars_65, _arg1_65);
    const memberParentName_66 = null;
    const compiledNameOpt_66 = null;
    const typars_66 = ofArray([vara, varb, varc]);

    const _arg1_66 = this.mk_binop_ty3(varaTy, varbTy, varcTy);

    this.v_checked_subtraction_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "op_Subtraction", memberParentName_66, compiledNameOpt_66, typars_66, _arg1_66);
    const memberParentName_67 = null;
    const compiledNameOpt_67 = null;
    const typars_67 = ofArray([vara, varb, varc]);

    const _arg1_67 = this.mk_binop_ty3(varaTy, varbTy, varcTy);

    this.v_checked_multiply_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "op_Multiply", memberParentName_67, compiledNameOpt_67, typars_67, _arg1_67);
    const memberParentName_68 = null;
    const compiledNameOpt_68 = null;
    const typars_68 = ofArray([vara]);

    const _arg1_68 = this.mk_unop_ty(varaTy);

    this.v_checked_unary_minus_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "op_UnaryNegation", memberParentName_68, compiledNameOpt_68, typars_68, _arg1_68);
    const memberParentName_69 = null;
    const compiledNameOpt_69 = "ToByte";
    const typars_69 = ofArray([vara]);
    const _arg1_69 = [ofArray([ofArray([varaTy])]), this.v_byte_ty];
    this.v_byte_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "byte", memberParentName_69, compiledNameOpt_69, typars_69, _arg1_69);
    const memberParentName_70 = null;
    const compiledNameOpt_70 = "ToSByte";
    const typars_70 = ofArray([vara]);
    const _arg1_70 = [ofArray([ofArray([varaTy])]), v_sbyte_ty];
    this.v_sbyte_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "sbyte", memberParentName_70, compiledNameOpt_70, typars_70, _arg1_70);
    const memberParentName_71 = null;
    const compiledNameOpt_71 = "ToInt16";
    const typars_71 = ofArray([vara]);
    const _arg1_71 = [ofArray([ofArray([varaTy])]), v_int16_ty];
    this.v_int16_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "int16", memberParentName_71, compiledNameOpt_71, typars_71, _arg1_71);
    const memberParentName_72 = null;
    const compiledNameOpt_72 = "ToUInt16";
    const typars_72 = ofArray([vara]);
    const _arg1_72 = [ofArray([ofArray([varaTy])]), v_uint16_ty];
    this.v_uint16_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "uint16", memberParentName_72, compiledNameOpt_72, typars_72, _arg1_72);
    const memberParentName_73 = null;
    const compiledNameOpt_73 = "ToInt";
    const typars_73 = ofArray([vara]);
    const _arg1_73 = [ofArray([ofArray([varaTy])]), this.v_int_ty];
    this.v_int_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "int", memberParentName_73, compiledNameOpt_73, typars_73, _arg1_73);
    const memberParentName_74 = null;
    const compiledNameOpt_74 = "ToInt32";
    const typars_74 = ofArray([vara]);
    const _arg1_74 = [ofArray([ofArray([varaTy])]), v_int32_ty];
    this.v_int32_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "int32", memberParentName_74, compiledNameOpt_74, typars_74, _arg1_74);
    const memberParentName_75 = null;
    const compiledNameOpt_75 = "ToUInt32";
    const typars_75 = ofArray([vara]);
    const _arg1_75 = [ofArray([ofArray([varaTy])]), v_uint32_ty];
    this.v_uint32_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "uint32", memberParentName_75, compiledNameOpt_75, typars_75, _arg1_75);
    const memberParentName_76 = null;
    const compiledNameOpt_76 = "ToInt64";
    const typars_76 = ofArray([vara]);
    const _arg1_76 = [ofArray([ofArray([varaTy])]), v_int64_ty];
    this.v_int64_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "int64", memberParentName_76, compiledNameOpt_76, typars_76, _arg1_76);
    const memberParentName_77 = null;
    const compiledNameOpt_77 = "ToUInt64";
    const typars_77 = ofArray([vara]);
    const _arg1_77 = [ofArray([ofArray([varaTy])]), v_uint64_ty];
    this.v_uint64_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "uint64", memberParentName_77, compiledNameOpt_77, typars_77, _arg1_77);
    const memberParentName_78 = null;
    const compiledNameOpt_78 = "ToIntPtr";
    const typars_78 = ofArray([vara]);
    const _arg1_78 = [ofArray([ofArray([varaTy])]), v_nativeint_ty];
    this.v_nativeint_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "nativeint", memberParentName_78, compiledNameOpt_78, typars_78, _arg1_78);
    const memberParentName_79 = null;
    const compiledNameOpt_79 = "ToUIntPtr";
    const typars_79 = ofArray([vara]);
    const _arg1_79 = [ofArray([ofArray([varaTy])]), v_unativeint_ty];
    this.v_unativeint_checked_info = this.makeIntrinsicValRef(fslib_MFOperatorsChecked_nleref, "unativeint", memberParentName_79, compiledNameOpt_79, typars_79, _arg1_79);
    const memberParentName_80 = null;
    const compiledNameOpt_80 = "ToByte";
    const typars_80 = ofArray([vara]);
    const _arg1_80 = [ofArray([ofArray([varaTy])]), this.v_byte_ty];
    this.v_byte_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "byte", memberParentName_80, compiledNameOpt_80, typars_80, _arg1_80);
    const memberParentName_81 = null;
    const compiledNameOpt_81 = "ToSByte";
    const typars_81 = ofArray([vara]);
    const _arg1_81 = [ofArray([ofArray([varaTy])]), v_sbyte_ty];
    this.v_sbyte_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "sbyte", memberParentName_81, compiledNameOpt_81, typars_81, _arg1_81);
    const memberParentName_82 = null;
    const compiledNameOpt_82 = "ToInt16";
    const typars_82 = ofArray([vara]);
    const _arg1_82 = [ofArray([ofArray([varaTy])]), v_int16_ty];
    this.v_int16_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "int16", memberParentName_82, compiledNameOpt_82, typars_82, _arg1_82);
    const memberParentName_83 = null;
    const compiledNameOpt_83 = "ToUInt16";
    const typars_83 = ofArray([vara]);
    const _arg1_83 = [ofArray([ofArray([varaTy])]), v_uint16_ty];
    this.v_uint16_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "uint16", memberParentName_83, compiledNameOpt_83, typars_83, _arg1_83);
    const memberParentName_84 = null;
    const compiledNameOpt_84 = "ToInt";
    const typars_84 = ofArray([vara]);
    const _arg1_84 = [ofArray([ofArray([varaTy])]), this.v_int_ty];
    this.v_int_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "int", memberParentName_84, compiledNameOpt_84, typars_84, _arg1_84);
    const memberParentName_85 = null;
    const compiledNameOpt_85 = "ToInt32";
    const typars_85 = ofArray([vara]);
    const _arg1_85 = [ofArray([ofArray([varaTy])]), v_int32_ty];
    this.v_int32_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "int32", memberParentName_85, compiledNameOpt_85, typars_85, _arg1_85);
    const memberParentName_86 = null;
    const compiledNameOpt_86 = "ToUInt32";
    const typars_86 = ofArray([vara]);
    const _arg1_86 = [ofArray([ofArray([varaTy])]), v_uint32_ty];
    this.v_uint32_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "uint32", memberParentName_86, compiledNameOpt_86, typars_86, _arg1_86);
    const memberParentName_87 = null;
    const compiledNameOpt_87 = "ToInt64";
    const typars_87 = ofArray([vara]);
    const _arg1_87 = [ofArray([ofArray([varaTy])]), v_int64_ty];
    this.v_int64_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "int64", memberParentName_87, compiledNameOpt_87, typars_87, _arg1_87);
    const memberParentName_88 = null;
    const compiledNameOpt_88 = "ToUInt64";
    const typars_88 = ofArray([vara]);
    const _arg1_88 = [ofArray([ofArray([varaTy])]), v_uint64_ty];
    this.v_uint64_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "uint64", memberParentName_88, compiledNameOpt_88, typars_88, _arg1_88);
    const memberParentName_89 = null;
    const compiledNameOpt_89 = "ToSingle";
    const typars_89 = ofArray([vara]);
    const _arg1_89 = [ofArray([ofArray([varaTy])]), v_float32_ty];
    this.v_float32_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "float32", memberParentName_89, compiledNameOpt_89, typars_89, _arg1_89);
    const memberParentName_90 = null;
    const compiledNameOpt_90 = "ToDouble";
    const typars_90 = ofArray([vara]);
    const _arg1_90 = [ofArray([ofArray([varaTy])]), v_float_ty];
    this.v_float_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "float", memberParentName_90, compiledNameOpt_90, typars_90, _arg1_90);
    const memberParentName_91 = null;
    const compiledNameOpt_91 = "ToIntPtr";
    const typars_91 = ofArray([vara]);
    const _arg1_91 = [ofArray([ofArray([varaTy])]), v_nativeint_ty];
    this.v_nativeint_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "nativeint", memberParentName_91, compiledNameOpt_91, typars_91, _arg1_91);
    const memberParentName_92 = null;
    const compiledNameOpt_92 = "ToUIntPtr";
    const typars_92 = ofArray([vara]);
    const _arg1_92 = [ofArray([ofArray([varaTy])]), v_unativeint_ty];
    this.v_unativeint_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "unativeint", memberParentName_92, compiledNameOpt_92, typars_92, _arg1_92);
    const memberParentName_93 = null;
    const compiledNameOpt_93 = "ToChar";
    const typars_93 = ofArray([vara]);
    const _arg1_93 = [ofArray([ofArray([varaTy])]), this.v_char_ty];
    this.v_char_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "char", memberParentName_93, compiledNameOpt_93, typars_93, _arg1_93);
    const memberParentName_94 = null;
    const compiledNameOpt_94 = "ToEnum";
    const typars_94 = ofArray([vara]);
    const _arg1_94 = [ofArray([ofArray([varaTy])]), v_enum_ty];
    this.v_enum_operator_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "enum", memberParentName_94, compiledNameOpt_94, typars_94, _arg1_94);
    const memberParentName_95 = null;
    const compiledNameOpt_95 = "Hash";
    const typars_95 = ofArray([vara]);
    const _arg1_95 = [ofArray([ofArray([varaTy])]), this.v_int_ty];
    this.v_hash_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "hash", memberParentName_95, compiledNameOpt_95, typars_95, _arg1_95);
    const memberParentName_96 = null;
    const compiledNameOpt_96 = "Box";
    const typars_96 = ofArray([vara]);
    const _arg1_96 = [ofArray([ofArray([varaTy])]), this.v_obj_ty];
    this.v_box_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "box", memberParentName_96, compiledNameOpt_96, typars_96, _arg1_96);
    const memberParentName_97 = null;
    const compiledNameOpt_97 = "IsNull";
    const typars_97 = ofArray([vara]);
    const _arg1_97 = [ofArray([ofArray([varaTy])]), this.v_bool_ty];
    this.v_isnull_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "isNull", memberParentName_97, compiledNameOpt_97, typars_97, _arg1_97);
    const memberParentName_98 = null;
    const compiledNameOpt_98 = "IsNotNull";
    const typars_98 = ofArray([vara]);
    const _arg1_98 = [ofArray([ofArray([varaTy])]), this.v_bool_ty];
    this.v_isnotnull_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "isNotNull", memberParentName_98, compiledNameOpt_98, typars_98, _arg1_98);
    const memberParentName_99 = null;
    const compiledNameOpt_99 = "Raise";
    const typars_99 = ofArray([vara]);
    const _arg1_99 = [ofArray([ofArray([this.mkSysNonGenericTy(sys, "Exception")])]), varaTy];
    this.v_raise_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "raise", memberParentName_99, compiledNameOpt_99, typars_99, _arg1_99);
    const memberParentName_100 = null;
    const compiledNameOpt_100 = "FailWith";
    const typars_100 = ofArray([vara]);
    const _arg1_100 = [ofArray([ofArray([this.v_string_ty])]), varaTy];
    this.v_failwith_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "failwith", memberParentName_100, compiledNameOpt_100, typars_100, _arg1_100);
    const memberParentName_101 = null;
    const compiledNameOpt_101 = "InvalidArg";
    const typars_101 = ofArray([vara]);
    const _arg1_101 = [ofArray([ofArray([this.v_string_ty]), ofArray([this.v_string_ty])]), varaTy];
    this.v_invalid_arg_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "invalidArg", memberParentName_101, compiledNameOpt_101, typars_101, _arg1_101);
    const memberParentName_102 = null;
    const compiledNameOpt_102 = "NullArg";
    const typars_102 = ofArray([vara]);
    const _arg1_102 = [ofArray([ofArray([this.v_string_ty])]), varaTy];
    this.v_null_arg_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "nullArg", memberParentName_102, compiledNameOpt_102, typars_102, _arg1_102);
    const memberParentName_103 = null;
    const compiledNameOpt_103 = "InvalidOp";
    const typars_103 = ofArray([vara]);
    const _arg1_103 = [ofArray([ofArray([this.v_string_ty])]), varaTy];
    this.v_invalid_op_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "invalidOp", memberParentName_103, compiledNameOpt_103, typars_103, _arg1_103);
    const memberParentName_104 = null;
    const compiledNameOpt_104 = "PrintFormatToStringThenFail";
    const typars_104 = ofArray([vara, varb]);
    const _arg1_104 = [ofArray([ofArray([(bty = this.v_unit_ty, cty = this.v_string_ty, dty = this.v_string_ty, this.mk_format4_ty(varaTy, bty, cty, dty))])]), varaTy];
    this.v_failwithf_info = this.makeIntrinsicValRef(fslib_MFExtraTopLevelOperators_nleref, "failwithf", memberParentName_104, compiledNameOpt_104, typars_104, _arg1_104);
    const memberParentName_105 = null;
    const compiledNameOpt_105 = "Reraise";
    const typars_105 = ofArray([vara]);
    const _arg1_105 = [ofArray([ofArray([this.v_unit_ty])]), varaTy];
    this.v_reraise_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "reraise", memberParentName_105, compiledNameOpt_105, typars_105, _arg1_105);
    const memberParentName_106 = null;
    const compiledNameOpt_106 = "TypeOf";
    const typars_106 = ofArray([vara]);
    const _arg1_106 = [new List(), this.v_system_Type_typ];
    this.v_typeof_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "typeof", memberParentName_106, compiledNameOpt_106, typars_106, _arg1_106);
    const memberParentName_107 = null;
    const compiledNameOpt_107 = "MethodHandleOf";
    const typars_107 = ofArray([vara, varb]);
    const _arg1_107 = [ofArray([ofArray([this.op_MinusMinusGreater(varaTy, varbTy)])]), this.v_system_RuntimeMethodHandle_typ];
    this.v_methodhandleof_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "methodhandleof", memberParentName_107, compiledNameOpt_107, typars_107, _arg1_107);
    let v_sizeof_info;
    const memberParentName_108 = null;
    const compiledNameOpt_108 = "SizeOf";
    const typars_108 = ofArray([vara]);
    const _arg1_108 = [new List(), this.v_int_ty];
    v_sizeof_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "sizeof", memberParentName_108, compiledNameOpt_108, typars_108, _arg1_108);
    let v_unchecked_defaultof_info;
    const memberParentName_109 = null;
    const compiledNameOpt_109 = "DefaultOf";
    const typars_109 = ofArray([vara]);
    const _arg1_109 = [new List(), varaTy];
    v_unchecked_defaultof_info = this.makeIntrinsicValRef(fslib_MFOperatorsUnchecked_nleref, "defaultof", memberParentName_109, compiledNameOpt_109, typars_109, _arg1_109);
    const memberParentName_110 = null;
    const compiledNameOpt_110 = "TypeDefOf";
    const typars_110 = ofArray([vara]);
    const _arg1_110 = [new List(), this.v_system_Type_typ];
    this.v_typedefof_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "typedefof", memberParentName_110, compiledNameOpt_110, typars_110, _arg1_110);
    let v_range_op_info;
    const memberParentName_111 = null;
    const compiledNameOpt_111 = null;
    const typars_111 = ofArray([vara]);
    const _arg1_111 = [ofArray([ofArray([varaTy]), ofArray([varaTy])]), this.mkSeqTy(varaTy)];
    v_range_op_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_Range", memberParentName_111, compiledNameOpt_111, typars_111, _arg1_111);
    let v_range_step_op_info;
    const memberParentName_112 = null;
    const compiledNameOpt_112 = null;
    const typars_112 = ofArray([vara, varb]);
    const _arg1_112 = [ofArray([ofArray([varaTy]), ofArray([varbTy]), ofArray([varaTy])]), this.mkSeqTy(varaTy)];
    v_range_step_op_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "op_RangeStep", memberParentName_112, compiledNameOpt_112, typars_112, _arg1_112);
    let v_range_int32_op_info;
    const memberParentName_113 = null;
    const compiledNameOpt_113 = null;
    const typars_113 = new List();
    const _arg1_113 = [ofArray([ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty])]), (ty1 = this.v_int_ty, this.mkSeqTy(ty1))];
    v_range_int32_op_info = this.makeIntrinsicValRef(fslib_MFOperatorIntrinsics_nleref, "RangeInt32", memberParentName_113, compiledNameOpt_113, typars_113, _arg1_113);
    const memberParentName_114 = null;
    const compiledNameOpt_114 = "Length";
    const typars_114 = ofArray([vara]);
    const _arg1_114 = [ofArray([ofArray([this.mkArrayType(1, varaTy)])]), this.v_int_ty];
    this.v_array_length_info = this.makeIntrinsicValRef(fslib_MFArrayModule_nleref, "length", memberParentName_114, compiledNameOpt_114, typars_114, _arg1_114);
    const memberParentName_115 = null;
    const compiledNameOpt_115 = null;
    const typars_115 = ofArray([vara]);
    const _arg1_115 = [ofArray([ofArray([this.mkArrayType(1, varaTy)]), ofArray([this.v_int_ty])]), varaTy];
    this.v_array_get_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "GetArray", memberParentName_115, compiledNameOpt_115, typars_115, _arg1_115);
    const memberParentName_116 = null;
    const compiledNameOpt_116 = null;
    const typars_116 = ofArray([vara]);
    const _arg1_116 = [ofArray([ofArray([this.mkArrayType(2, varaTy)]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty])]), varaTy];
    this.v_array2D_get_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "GetArray2D", memberParentName_116, compiledNameOpt_116, typars_116, _arg1_116);
    const memberParentName_117 = null;
    const compiledNameOpt_117 = null;
    const typars_117 = ofArray([vara]);
    const _arg1_117 = [ofArray([ofArray([this.mkArrayType(3, varaTy)]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty])]), varaTy];
    this.v_array3D_get_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "GetArray3D", memberParentName_117, compiledNameOpt_117, typars_117, _arg1_117);
    const memberParentName_118 = null;
    const compiledNameOpt_118 = null;
    const typars_118 = ofArray([vara]);
    const _arg1_118 = [ofArray([ofArray([this.mkArrayType(4, varaTy)]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty])]), varaTy];
    this.v_array4D_get_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "GetArray4D", memberParentName_118, compiledNameOpt_118, typars_118, _arg1_118);
    const memberParentName_119 = null;
    const compiledNameOpt_119 = null;
    const typars_119 = ofArray([vara]);
    const _arg1_119 = [ofArray([ofArray([this.mkArrayType(1, varaTy)]), ofArray([this.v_int_ty]), ofArray([varaTy])]), this.v_unit_ty];
    this.v_array_set_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "SetArray", memberParentName_119, compiledNameOpt_119, typars_119, _arg1_119);
    const memberParentName_120 = null;
    const compiledNameOpt_120 = null;
    const typars_120 = ofArray([vara]);
    const _arg1_120 = [ofArray([ofArray([this.mkArrayType(2, varaTy)]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([varaTy])]), this.v_unit_ty];
    this.v_array2D_set_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "SetArray2D", memberParentName_120, compiledNameOpt_120, typars_120, _arg1_120);
    const memberParentName_121 = null;
    const compiledNameOpt_121 = null;
    const typars_121 = ofArray([vara]);
    const _arg1_121 = [ofArray([ofArray([this.mkArrayType(3, varaTy)]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([varaTy])]), this.v_unit_ty];
    this.v_array3D_set_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "SetArray3D", memberParentName_121, compiledNameOpt_121, typars_121, _arg1_121);
    const memberParentName_122 = null;
    const compiledNameOpt_122 = null;
    const typars_122 = ofArray([vara]);
    const _arg1_122 = [ofArray([ofArray([this.mkArrayType(4, varaTy)]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([varaTy])]), this.v_unit_ty];
    this.v_array4D_set_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "SetArray4D", memberParentName_122, compiledNameOpt_122, typars_122, _arg1_122);
    const memberParentName_123 = null;
    const compiledNameOpt_123 = "Collect";
    const typars_123 = ofArray([vara, varb, varc]);
    const _arg1_123 = [ofArray([ofArray([this.op_MinusMinusGreater(varaTy, varbTy)]), ofArray([this.mkSeqTy(varaTy)])]), this.mkSeqTy(varcTy)];
    this.v_seq_collect_info = this.makeIntrinsicValRef(fslib_MFSeqModule_nleref, "collect", memberParentName_123, compiledNameOpt_123, typars_123, _arg1_123);
    const memberParentName_124 = null;
    const compiledNameOpt_124 = "Delay";
    const typars_124 = ofArray([varb]);
    const _arg1_124 = [ofArray([ofArray([(d = this.v_unit_ty, r = this.mkSeqTy(varbTy), this.op_MinusMinusGreater(d, r))])]), this.mkSeqTy(varbTy)];
    this.v_seq_delay_info = this.makeIntrinsicValRef(fslib_MFSeqModule_nleref, "delay", memberParentName_124, compiledNameOpt_124, typars_124, _arg1_124);
    const memberParentName_125 = null;
    const compiledNameOpt_125 = "Append";
    const typars_125 = ofArray([varb]);
    const _arg1_125 = [ofArray([ofArray([this.mkSeqTy(varbTy)]), ofArray([this.mkSeqTy(varbTy)])]), this.mkSeqTy(varbTy)];
    this.v_seq_append_info = this.makeIntrinsicValRef(fslib_MFSeqModule_nleref, "append", memberParentName_125, compiledNameOpt_125, typars_125, _arg1_125);
    const memberParentName_126 = null;
    const compiledNameOpt_126 = null;
    const typars_126 = ofArray([vara, varb, varc]);
    const _arg1_126 = [ofArray([ofArray([varaTy]), ofArray([this.op_MinusMinusGreater(varaTy, varbTy)])]), this.mkSeqTy(varcTy)];
    this.v_seq_using_info = this.makeIntrinsicValRef(fslib_MFRuntimeHelpers_nleref, "EnumerateUsing", memberParentName_126, compiledNameOpt_126, typars_126, _arg1_126);
    const memberParentName_127 = null;
    const compiledNameOpt_127 = null;
    const typars_127 = ofArray([varb]);
    const _arg1_127 = [ofArray([ofArray([(d_1 = this.v_unit_ty, r_1 = this.v_bool_ty, this.op_MinusMinusGreater(d_1, r_1))]), ofArray([this.mkSeqTy(varbTy)])]), this.mkSeqTy(varbTy)];
    this.v_seq_generated_info = this.makeIntrinsicValRef(fslib_MFRuntimeHelpers_nleref, "EnumerateWhile", memberParentName_127, compiledNameOpt_127, typars_127, _arg1_127);
    const memberParentName_128 = null;
    const compiledNameOpt_128 = null;
    const typars_128 = ofArray([varb]);
    const _arg1_128 = [ofArray([ofArray([this.mkSeqTy(varbTy)]), ofArray([(d_2 = this.v_unit_ty, r_2 = this.v_unit_ty, this.op_MinusMinusGreater(d_2, r_2))])]), this.mkSeqTy(varbTy)];
    this.v_seq_finally_info = this.makeIntrinsicValRef(fslib_MFRuntimeHelpers_nleref, "EnumerateThenFinally", memberParentName_128, compiledNameOpt_128, typars_128, _arg1_128);
    const memberParentName_129 = null;
    const compiledNameOpt_129 = null;
    const typars_129 = ofArray([vara, varb]);
    const _arg1_129 = [ofArray([ofArray([(d_3 = this.v_unit_ty, this.op_MinusMinusGreater(d_3, varaTy))]), ofArray([(r_3 = this.v_bool_ty, this.op_MinusMinusGreater(varaTy, r_3))]), ofArray([this.op_MinusMinusGreater(varaTy, varbTy)])]), this.mkSeqTy(varbTy)];
    this.v_seq_of_functions_info = this.makeIntrinsicValRef(fslib_MFRuntimeHelpers_nleref, "EnumerateFromFunctions", memberParentName_129, compiledNameOpt_129, typars_129, _arg1_129);
    const memberParentName_130 = null;
    const compiledNameOpt_130 = null;
    const typars_130 = ofArray([vara, varb]);
    const _arg1_130 = [ofArray([ofArray([(r_4 = this.v_unit_ty, this.op_MinusMinusGreater(varaTy, r_4))]), ofArray([(r_5 = this.v_unit_ty, this.op_MinusMinusGreater(varaTy, r_5))]), ofArray([(d_5 = (d_4 = this.v_obj_ty, r_7 = (r_6 = this.v_unit_ty, this.op_MinusMinusGreater(varbTy, r_6)), this.op_MinusMinusGreater(d_4, r_7)), this.op_MinusMinusGreater(d_5, varaTy))])]), new TType(1, [this.v_fslib_IEvent2_tcr, ofArray([varaTy, varbTy])])];
    this.v_create_event_info = this.makeIntrinsicValRef(fslib_MFRuntimeHelpers_nleref, "CreateEvent", memberParentName_130, compiledNameOpt_130, typars_130, _arg1_130);
    const memberParentName_131 = null;
    const compiledNameOpt_131 = "ToArray";
    const typars_131 = ofArray([varb]);
    const _arg1_131 = [ofArray([ofArray([this.mkSeqTy(varbTy)])]), this.mkArrayType(1, varbTy)];
    this.v_seq_to_array_info = this.makeIntrinsicValRef(fslib_MFSeqModule_nleref, "toArray", memberParentName_131, compiledNameOpt_131, typars_131, _arg1_131);
    const memberParentName_132 = null;
    const compiledNameOpt_132 = "ToList";
    const typars_132 = ofArray([varb]);
    const _arg1_132 = [ofArray([ofArray([this.mkSeqTy(varbTy)])]), this.mkListTy(varbTy)];
    this.v_seq_to_list_info = this.makeIntrinsicValRef(fslib_MFSeqModule_nleref, "toList", memberParentName_132, compiledNameOpt_132, typars_132, _arg1_132);
    const memberParentName_133 = null;
    const compiledNameOpt_133 = "Map";
    const typars_133 = ofArray([vara, varb]);
    const _arg1_133 = [ofArray([ofArray([this.op_MinusMinusGreater(varaTy, varbTy)]), ofArray([this.mkSeqTy(varaTy)])]), this.mkSeqTy(varbTy)];
    this.v_seq_map_info = this.makeIntrinsicValRef(fslib_MFSeqModule_nleref, "map", memberParentName_133, compiledNameOpt_133, typars_133, _arg1_133);
    const memberParentName_134 = null;
    const compiledNameOpt_134 = "Singleton";
    const typars_134 = ofArray([vara]);
    const _arg1_134 = [ofArray([ofArray([varaTy])]), this.mkSeqTy(varaTy)];
    this.v_seq_singleton_info = this.makeIntrinsicValRef(fslib_MFSeqModule_nleref, "singleton", memberParentName_134, compiledNameOpt_134, typars_134, _arg1_134);
    const memberParentName_135 = null;
    const compiledNameOpt_135 = "Empty";
    const typars_135 = ofArray([vara]);
    const _arg1_135 = [new List(), this.mkSeqTy(varaTy)];
    this.v_seq_empty_info = this.makeIntrinsicValRef(fslib_MFSeqModule_nleref, "empty", memberParentName_135, compiledNameOpt_135, typars_135, _arg1_135);
    const memberParentName_136 = "PrintfFormat`5";
    const compiledNameOpt_136 = null;
    const typars_136 = ofArray([vara, varb, varc, vard, vare]);
    const _arg1_136 = [ofArray([ofArray([this.v_string_ty])]), this.mkPrintfFormatTy(varaTy, varbTy, varcTy, vardTy, vareTy)];
    this.v_new_format_info = this.makeIntrinsicValRef(fslib_MFCore_nleref, ".ctor", memberParentName_136, compiledNameOpt_136, typars_136, _arg1_136);
    let v_sprintf_info;
    const memberParentName_137 = null;
    const compiledNameOpt_137 = "PrintFormatToStringThen";
    const typars_137 = ofArray([vara]);
    const _arg1_137 = [ofArray([ofArray([(bty_1 = this.v_unit_ty, cty_1 = this.v_string_ty, dty_1 = this.v_string_ty, this.mk_format4_ty(varaTy, bty_1, cty_1, dty_1))])]), varaTy];
    v_sprintf_info = this.makeIntrinsicValRef(fslib_MFExtraTopLevelOperators_nleref, "sprintf", memberParentName_137, compiledNameOpt_137, typars_137, _arg1_137);
    const memberParentName_138 = "Lazy`1";
    const compiledNameOpt_138 = null;
    const typars_138 = ofArray([vara]);
    const _arg1_138 = [ofArray([ofArray([this.mkLazyTy(varaTy)]), new List()]), varaTy];
    this.v_lazy_force_info = this.makeIntrinsicValRef(fslib_MFLazyExtensions_nleref, "Force", memberParentName_138, compiledNameOpt_138, typars_138, _arg1_138);
    const memberParentName_139 = "Lazy`1";
    const compiledNameOpt_139 = null;
    const typars_139 = ofArray([vara]);
    const _arg1_139 = [ofArray([ofArray([(d_6 = this.v_unit_ty, this.op_MinusMinusGreater(d_6, varaTy))])]), this.mkLazyTy(varaTy)];
    this.v_lazy_create_info = this.makeIntrinsicValRef(fslib_MFLazyExtensions_nleref, "Create", memberParentName_139, compiledNameOpt_139, typars_139, _arg1_139);
    const memberParentName_140 = null;
    const compiledNameOpt_140 = "CreateSequence";
    const typars_140 = ofArray([vara]);
    const _arg1_140 = [ofArray([ofArray([this.mkSeqTy(varaTy)])]), this.mkSeqTy(varaTy)];
    this.v_seq_info = this.makeIntrinsicValRef(fslib_MFOperators_nleref, "seq", memberParentName_140, compiledNameOpt_140, typars_140, _arg1_140);
    let v_refcell_info;
    const memberParentName_141 = "FSharpRef`1";
    const compiledNameOpt_141 = null;
    const typars_141 = ofArray([vara]);
    const _arg1_141 = [ofArray([ofArray([this.mkRefCellTy(varaTy)]), new List()]), varaTy];
    v_refcell_info = this.makeIntrinsicValRef(fslib_MFCore_nleref, "ref", memberParentName_141, compiledNameOpt_141, typars_141, _arg1_141);
    let v_splice_expr_info;
    const memberParentName_142 = null;
    const compiledNameOpt_142 = null;
    const typars_142 = ofArray([vara]);
    const _arg1_142 = [ofArray([ofArray([this.mkQuotedExprTy(varaTy)])]), varaTy];
    v_splice_expr_info = this.makeIntrinsicValRef(fslib_MFExtraTopLevelOperators_nleref, "op_Splice", memberParentName_142, compiledNameOpt_142, typars_142, _arg1_142);
    let v_splice_raw_expr_info;
    const memberParentName_143 = null;
    const compiledNameOpt_143 = null;
    const typars_143 = ofArray([vara]);
    const _arg1_143 = [ofArray([ofArray([mkRawQuotedExprTy])]), varaTy];
    v_splice_raw_expr_info = this.makeIntrinsicValRef(fslib_MFExtraTopLevelOperators_nleref, "op_SpliceUntyped", memberParentName_143, compiledNameOpt_143, typars_143, _arg1_143);
    const memberParentName_144 = null;
    const compiledNameOpt_144 = null;
    const typars_144 = new List();
    const _arg1_144 = [ofArray([ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([this.v_int_ty]), ofArray([this.v_bool_ty]), ofArray([this.v_byte_ty])]), this.v_decimal_ty];
    this.v_new_decimal_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "MakeDecimal", memberParentName_144, compiledNameOpt_144, typars_144, _arg1_144);
    const memberParentName_145 = "Expr";
    const compiledNameOpt_145 = null;
    const typars_145 = new List();
    const _arg1_145 = [ofArray([ofArray([this.v_system_Type_typ, (ty_17 = this.v_system_Type_typ, this.mkListTy(ty_17)), this.mkListTy(mkRawQuotedExprTy), (ty_18 = this.v_byte_ty, this.mkArrayType(1, ty_18))])]), mkRawQuotedExprTy];
    this.v_deserialize_quoted_FSharp_20_plus_info = this.makeIntrinsicValRef(fslib_MFQuotations_nleref, "Deserialize", memberParentName_145, compiledNameOpt_145, typars_145, _arg1_145);
    const memberParentName_146 = "Expr";
    const compiledNameOpt_146 = null;
    const typars_146 = new List();
    const _arg1_146 = [ofArray([ofArray([this.v_system_Type_typ, (ty_19 = this.v_system_Type_typ, this.mkArrayType(1, ty_19)), (ty_20 = this.v_system_Type_typ, this.mkArrayType(1, ty_20)), this.mkArrayType(1, mkRawQuotedExprTy), (ty_21 = this.v_byte_ty, this.mkArrayType(1, ty_21))])]), mkRawQuotedExprTy];
    this.v_deserialize_quoted_FSharp_40_plus_info = this.makeIntrinsicValRef(fslib_MFQuotations_nleref, "Deserialize40", memberParentName_146, compiledNameOpt_146, typars_146, _arg1_146);
    const memberParentName_147 = "Expr";
    const compiledNameOpt_147 = null;
    const typars_147 = ofArray([vara]);
    const _arg1_147 = [ofArray([ofArray([mkRawQuotedExprTy])]), this.mkQuotedExprTy(varaTy)];
    this.v_cast_quotation_info = this.makeIntrinsicValRef(fslib_MFQuotations_nleref, "Cast", memberParentName_147, compiledNameOpt_147, typars_147, _arg1_147);
    const memberParentName_148 = "Expr";
    const compiledNameOpt_148 = null;
    const typars_148 = ofArray([vara]);
    const _arg1_148 = [ofArray([ofArray([varaTy])]), mkRawQuotedExprTy];
    this.v_lift_value_info = this.makeIntrinsicValRef(fslib_MFQuotations_nleref, "Value", memberParentName_148, compiledNameOpt_148, typars_148, _arg1_148);
    const memberParentName_149 = "Expr";
    const compiledNameOpt_149 = null;
    const typars_149 = ofArray([vara]);
    const _arg1_149 = [ofArray([ofArray([varaTy, this.v_string_ty])]), mkRawQuotedExprTy];
    this.v_lift_value_with_name_info = this.makeIntrinsicValRef(fslib_MFQuotations_nleref, "ValueWithName", memberParentName_149, compiledNameOpt_149, typars_149, _arg1_149);
    const memberParentName_150 = "Expr";
    const compiledNameOpt_150 = null;
    const typars_150 = ofArray([vara]);
    const _arg1_150 = [ofArray([ofArray([varaTy, this.mkQuotedExprTy(varaTy)])]), this.mkQuotedExprTy(varaTy)];
    this.v_lift_value_with_defn_info = this.makeIntrinsicValRef(fslib_MFQuotations_nleref, "WithValue", memberParentName_150, compiledNameOpt_150, typars_150, _arg1_150);
    let v_query_value_info;
    const memberParentName_151 = null;
    const compiledNameOpt_151 = null;
    const typars_151 = new List();
    const _arg1_151 = [new List(), mkQueryBuilderTy];
    v_query_value_info = this.makeIntrinsicValRef(fslib_MFExtraTopLevelOperators_nleref, "query", memberParentName_151, compiledNameOpt_151, typars_151, _arg1_151);
    let v_query_run_value_info;
    const memberParentName_152 = "QueryBuilder";
    const compiledNameOpt_152 = null;
    const typars_152 = ofArray([vara]);
    const _arg1_152 = [ofArray([ofArray([mkQueryBuilderTy]), ofArray([this.mkQuotedExprTy(varaTy)])]), varaTy];
    v_query_run_value_info = this.makeIntrinsicValRef(fslib_MFQueryRunExtensionsLowPriority_nleref, "Run", memberParentName_152, compiledNameOpt_152, typars_152, _arg1_152);
    let v_query_run_enumerable_info;
    const memberParentName_153 = "QueryBuilder";
    const compiledNameOpt_153 = null;
    const typars_153 = ofArray([vara]);
    const _arg1_153 = [ofArray([ofArray([mkQueryBuilderTy]), ofArray([(aty = (ty2 = mkNonGenericTy(this.v_tcref_System_Collections_IEnumerable), this.mkQuerySourceTy(varaTy, ty2)), this.mkQuotedExprTy(aty))])]), this.mkSeqTy(varaTy)];
    v_query_run_enumerable_info = this.makeIntrinsicValRef(fslib_MFQueryRunExtensionsHighPriority_nleref, "Run", memberParentName_153, compiledNameOpt_153, typars_153, _arg1_153);
    let v_query_for_value_info;
    const memberParentName_154 = "QueryBuilder";
    const compiledNameOpt_154 = null;
    const typars_154 = ofArray([vara, vard, varb, vare]);
    const _arg1_154 = [ofArray([ofArray([mkQueryBuilderTy]), ofArray([this.mkQuerySourceTy(varaTy, vardTy), (r_8 = this.mkQuerySourceTy(varbTy, vareTy), this.op_MinusMinusGreater(varaTy, r_8))])]), this.mkQuerySourceTy(varbTy, vardTy)];
    v_query_for_value_info = this.makeIntrinsicValRef(fslib_MFLinq_nleref, "For", memberParentName_154, compiledNameOpt_154, typars_154, _arg1_154);
    let v_query_select_value_info;
    const memberParentName_155 = "QueryBuilder";
    const compiledNameOpt_155 = null;
    const typars_155 = ofArray([vara, vare, varb]);
    const _arg1_155 = [ofArray([ofArray([mkQueryBuilderTy]), ofArray([this.mkQuerySourceTy(varaTy, vareTy), this.op_MinusMinusGreater(varaTy, varbTy)])]), this.mkQuerySourceTy(varbTy, vareTy)];
    v_query_select_value_info = this.makeIntrinsicValRef(fslib_MFLinq_nleref, "Select", memberParentName_155, compiledNameOpt_155, typars_155, _arg1_155);
    let v_query_yield_value_info;
    const memberParentName_156 = "QueryBuilder";
    const compiledNameOpt_156 = null;
    const typars_156 = ofArray([vara, vare]);
    const _arg1_156 = [ofArray([ofArray([mkQueryBuilderTy]), ofArray([varaTy])]), this.mkQuerySourceTy(varaTy, vareTy)];
    v_query_yield_value_info = this.makeIntrinsicValRef(fslib_MFLinq_nleref, "Yield", memberParentName_156, compiledNameOpt_156, typars_156, _arg1_156);
    let v_query_yield_from_value_info;
    const memberParentName_157 = "QueryBuilder";
    const compiledNameOpt_157 = null;
    const typars_157 = ofArray([vara, vare]);
    const _arg1_157 = [ofArray([ofArray([mkQueryBuilderTy]), ofArray([this.mkQuerySourceTy(varaTy, vareTy)])]), this.mkQuerySourceTy(varaTy, vareTy)];
    v_query_yield_from_value_info = this.makeIntrinsicValRef(fslib_MFLinq_nleref, "YieldFrom", memberParentName_157, compiledNameOpt_157, typars_157, _arg1_157);
    let v_query_source_info;
    const memberParentName_158 = "QueryBuilder";
    const compiledNameOpt_158 = null;
    const typars_158 = ofArray([vara]);
    const _arg1_158 = [ofArray([ofArray([mkQueryBuilderTy]), ofArray([this.mkSeqTy(varaTy)])]), (ty2_1 = mkNonGenericTy(this.v_tcref_System_Collections_IEnumerable), this.mkQuerySourceTy(varaTy, ty2_1))];
    v_query_source_info = this.makeIntrinsicValRef(fslib_MFLinq_nleref, "Source", memberParentName_158, compiledNameOpt_158, typars_158, _arg1_158);
    const memberParentName_159 = "QuerySource`2";
    const compiledNameOpt_159 = null;
    const typars_159 = ofArray([vara, vare]);
    const _arg1_159 = [ofArray([ofArray([this.mkQuerySourceTy(varaTy, vareTy)]), new List()]), this.mkSeqTy(varaTy)];
    this.v_query_source_as_enum_info = this.makeIntrinsicValRef(fslib_MFLinq_nleref, "get_Source", memberParentName_159, compiledNameOpt_159, typars_159, _arg1_159);
    const memberParentName_160 = "QuerySource`2";
    const compiledNameOpt_160 = null;
    const typars_160 = ofArray([vara, vare]);
    const _arg1_160 = [ofArray([ofArray([this.mkSeqTy(varaTy)])]), this.mkQuerySourceTy(varaTy, vareTy)];
    this.v_new_query_source_info = this.makeIntrinsicValRef(fslib_MFLinq_nleref, ".ctor", memberParentName_160, compiledNameOpt_160, typars_160, _arg1_160);
    let v_query_where_value_info;
    const memberParentName_161 = "QueryBuilder";
    const compiledNameOpt_161 = null;
    const typars_161 = ofArray([vara, vare]);
    const _arg1_161 = [ofArray([ofArray([mkQueryBuilderTy]), ofArray([this.mkQuerySourceTy(varaTy, vareTy), (r_9 = this.v_bool_ty, this.op_MinusMinusGreater(varaTy, r_9))])]), this.mkQuerySourceTy(varaTy, vareTy)];
    v_query_where_value_info = this.makeIntrinsicValRef(fslib_MFLinq_nleref, "Where", memberParentName_161, compiledNameOpt_161, typars_161, _arg1_161);
    let v_query_zero_value_info;
    const memberParentName_162 = "QueryBuilder";
    const compiledNameOpt_162 = null;
    const typars_162 = ofArray([vara, vare]);
    const _arg1_162 = [ofArray([ofArray([mkQueryBuilderTy]), new List()]), this.mkQuerySourceTy(varaTy, vareTy)];
    v_query_zero_value_info = this.makeIntrinsicValRef(fslib_MFLinq_nleref, "Zero", memberParentName_162, compiledNameOpt_162, typars_162, _arg1_162);
    const memberParentName_163 = null;
    const compiledNameOpt_163 = null;
    const typars_163 = new List();
    const _arg1_163 = [ofArray([ofArray([this.v_unit_ty])]), this.v_unit_ty];
    this.v_fail_init_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "FailInit", memberParentName_163, compiledNameOpt_163, typars_163, _arg1_163);
    const memberParentName_164 = null;
    const compiledNameOpt_164 = null;
    const typars_164 = new List();
    const _arg1_164 = [ofArray([ofArray([this.v_unit_ty])]), this.v_unit_ty];
    this.v_fail_static_init_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "FailStaticInit", memberParentName_164, compiledNameOpt_164, typars_164, _arg1_164);
    const memberParentName_165 = null;
    const compiledNameOpt_165 = null;
    const typars_165 = ofArray([vara]);
    const _arg1_165 = [ofArray([ofArray([varaTy])]), varaTy];
    this.v_check_this_info = this.makeIntrinsicValRef(fslib_MFIntrinsicFunctions_nleref, "CheckThis", memberParentName_165, compiledNameOpt_165, typars_165, _arg1_165);
    const memberParentName_166 = null;
    const compiledNameOpt_166 = null;
    const typars_166 = ofArray([vara]);
    const _arg1_166 = [ofArray([ofArray([this.mkQuotedExprTy(varaTy)])]), this.mkLinqExpressionTy(varaTy)];
    this.v_quote_to_linq_lambda_info = this.makeIntrinsicValRef(fslib_MFLinqRuntimeHelpersQuotationConverter_nleref, "QuotationToLambdaExpression", memberParentName_166, compiledNameOpt_166, typars_166, _arg1_166);
    this.tref_DebuggableAttribute = this.findSysILTypeRef("System.Diagnostics.DebuggableAttribute");
    this.tref_CompilerGeneratedAttribute = this.findSysILTypeRef("System.Runtime.CompilerServices.CompilerGeneratedAttribute");
    this.generatedAttribsCache = new List();
    this.debuggerBrowsableNeverAttributeCache = null;
    const betterTyconEntries = map_1(tupledArg => {
      const ty_22 = mkNonGenericTy(tupledArg[1]);
      return [tupledArg[0], this.findSysTyconRef(sys, tupledArg[0]), _arg1_167 => ty_22];
    }, [["Int32", this.v_int_tcr], ["IntPtr", this.v_nativeint_tcr], ["UIntPtr", this.v_unativeint_tcr], ["Int16", this.v_int16_tcr], ["Int64", this.v_int64_tcr], ["UInt16", this.v_uint16_tcr], ["UInt32", this.v_uint32_tcr], ["UInt64", this.v_uint64_tcr], ["SByte", this.v_sbyte_tcr], ["Decimal", this.v_decimal_tcr], ["Byte", this.v_byte_tcr], ["Boolean", this.v_bool_tcr], ["String", v_string_tcr], ["Object", v_obj_tcr], ["Exception", this.v_exn_tcr], ["Char", this.v_char_tcr], ["Double", this.v_float_tcr], ["Single", this.v_float32_tcr]], Array);
    this.decompileTyconEntries = [["FSharpFunc`2", this.v_fastFunc_tcr, tinst => {
      const d_7 = item(0, tinst);
      const r_10 = item(1, tinst);
      return this.mkFunTy(d_7, r_10);
    }], ["Tuple`2", this.v_ref_tuple2_tcr, l_12 => this.decodeTupleTy(tupInfoRef, l_12)], ["Tuple`3", this.v_ref_tuple3_tcr, l_13 => this.decodeTupleTy(tupInfoRef, l_13)], ["Tuple`4", this.v_ref_tuple4_tcr, l_14 => this.decodeTupleTy(tupInfoRef, l_14)], ["Tuple`5", this.v_ref_tuple5_tcr, l_15 => this.decodeTupleTy(tupInfoRef, l_15)], ["Tuple`6", this.v_ref_tuple6_tcr, l_16 => this.decodeTupleTy(tupInfoRef, l_16)], ["Tuple`7", this.v_ref_tuple7_tcr, l_17 => this.decodeTupleTy(tupInfoRef, l_17)], ["Tuple`8", this.v_ref_tuple8_tcr, (tcref = this.v_ref_tuple8_tcr, l_18 => this.decodeTupleTyIfPossible(tcref, tupInfoRef, l_18))], ["ValueTuple`2", this.v_struct_tuple2_tcr, l_19 => this.decodeTupleTy(tupInfoStruct, l_19)], ["ValueTuple`3", this.v_struct_tuple3_tcr, l_20 => this.decodeTupleTy(tupInfoStruct, l_20)], ["ValueTuple`4", this.v_struct_tuple4_tcr, l_21 => this.decodeTupleTy(tupInfoStruct, l_21)], ["ValueTuple`5", this.v_struct_tuple5_tcr, l_22 => this.decodeTupleTy(tupInfoStruct, l_22)], ["ValueTuple`6", this.v_struct_tuple6_tcr, l_23 => this.decodeTupleTy(tupInfoStruct, l_23)], ["ValueTuple`7", this.v_struct_tuple7_tcr, l_24 => this.decodeTupleTy(tupInfoStruct, l_24)], ["ValueTuple`8", this.v_struct_tuple8_tcr, (tcref_1 = this.v_struct_tuple8_tcr, l_25 => this.decodeTupleTyIfPossible(tcref_1, tupInfoStruct, l_25))]];
    this.betterEntries = betterTyconEntries.concat(this.decompileTyconEntries);
    this.decompileTypeDict = null;
    this.betterTypeDict1 = null;
    this.betterTypeDict2 = null;
    this["refcell_tcr_canon@"] = this.v_refcell_tcr_canon;
    this["option_tcr_canon@"] = mk_MFCore_tcref(this["fslibCcu@160"], "Option`1");
    this["set_tcr_canon@"] = mk_MFCollections_tcref(this["fslibCcu@160"], "Set`1");
    this["map_tcr_canon@"] = mk_MFCollections_tcref(this["fslibCcu@160"], "Map`2");
    this["refcell_tcr_nice@"] = v_refcell_tcr_nice;
    this["array_tcr_nice@"] = this.v_il_arr_tcr_map[0];
    this["seq_base_tcr@"] = mk_MFCompilerServices_tcref(this["fslibCcu@160"], "GeneratedSequenceBase`1");
    this["measureproduct_tcr@"] = mk_MFCompilerServices_tcref(this["fslibCcu@160"], "MeasureProduct`2");
    this["measureinverse_tcr@"] = mk_MFCompilerServices_tcref(this["fslibCcu@160"], "MeasureInverse`1");
    this["measureone_tcr@"] = mk_MFCompilerServices_tcref(this["fslibCcu@160"], "MeasureOne");
    this["nativeint_ty@"] = v_nativeint_ty;
    this["unativeint_ty@"] = v_unativeint_ty;
    this["int32_ty@"] = v_int32_ty;
    this["int16_ty@"] = v_int16_ty;
    this["int64_ty@"] = v_int64_ty;
    this["uint16_ty@"] = v_uint16_ty;
    this["uint32_ty@"] = v_uint32_ty;
    this["uint64_ty@"] = v_uint64_ty;
    this["sbyte_ty@"] = v_sbyte_ty;
    this["exn_ty@"] = mkNonGenericTy(this.v_exn_tcr);
    this["float_ty@"] = v_float_ty;
    this["float32_ty@"] = v_float32_ty;
    this["system_Array_typ@"] = this.mkSysNonGenericTy(sys, "Array");
    this["system_Object_typ@"] = this.mkSysNonGenericTy(sys, "Object");
    this["system_IDisposable_typ@"] = this.mkSysNonGenericTy(sys, "IDisposable");
    this["system_RuntimeHelpers_typ@"] = this.mkSysNonGenericTy(sysCompilerServices, "RuntimeHelpers");
    this["system_Value_typ@"] = this.mkSysNonGenericTy(sys, "ValueType");
    this["system_Delegate_typ@"] = this.mkSysNonGenericTy(sys, "Delegate");
    this["system_MulticastDelegate_typ@"] = this.mkSysNonGenericTy(sys, "MulticastDelegate");
    this["system_Enum_typ@"] = this.mkSysNonGenericTy(sys, "Enum");
    this["system_Exception_typ@"] = this.mkSysNonGenericTy(sys, "Exception");
    this["system_String_typ@"] = this.mkSysNonGenericTy(sys, "String");
    this["system_String_tcref@"] = this.findSysTyconRef(sys, "String");
    this["system_Int32_typ@"] = this.mkSysNonGenericTy(sys, "Int32");
    this["system_TypedReference_tcref@"] = this.tryFindSysTyconRef(sys, "TypedReference");
    this["system_ArgIterator_tcref@"] = this.tryFindSysTyconRef(sys, "ArgIterator");
    this["system_RuntimeArgumentHandle_tcref@"] = this.tryFindSysTyconRef(sys, "RuntimeArgumentHandle");
    this["system_SByte_tcref@"] = this.findSysTyconRef(sys, "SByte");
    this["system_Decimal_tcref@"] = this.findSysTyconRef(sys, "Decimal");
    this["system_Int16_tcref@"] = this.findSysTyconRef(sys, "Int16");
    this["system_Int32_tcref@"] = this.findSysTyconRef(sys, "Int32");
    this["system_Int64_tcref@"] = this.findSysTyconRef(sys, "Int64");
    this["system_IntPtr_tcref@"] = this.findSysTyconRef(sys, "IntPtr");
    this["system_Bool_tcref@"] = this.findSysTyconRef(sys, "Boolean");
    this["system_Byte_tcref@"] = this.findSysTyconRef(sys, "Byte");
    this["system_UInt16_tcref@"] = this.findSysTyconRef(sys, "UInt16");
    this["system_Char_tcref@"] = this.findSysTyconRef(sys, "Char");
    this["system_UInt32_tcref@"] = this.findSysTyconRef(sys, "UInt32");
    this["system_UInt64_tcref@"] = this.findSysTyconRef(sys, "UInt64");
    this["system_UIntPtr_tcref@"] = this.findSysTyconRef(sys, "UIntPtr");
    this["system_Single_tcref@"] = this.findSysTyconRef(sys, "Single");
    this["system_Double_tcref@"] = this.findSysTyconRef(sys, "Double");
    this["system_RuntimeTypeHandle_typ@"] = this.mkSysNonGenericTy(sys, "RuntimeTypeHandle");
    this["system_MarshalByRefObject_tcref@"] = this.tryFindSysTyconRef(sys, "MarshalByRefObject");
    this["system_MarshalByRefObject_typ@"] = this.tryMkSysNonGenericTy(sys, "MarshalByRefObject");
    this["system_Array_tcref@"] = this.findSysTyconRef(sys, "Array");
    this["system_Object_tcref@"] = this.findSysTyconRef(sys, "Object");
    this["system_Void_tcref@"] = this.findSysTyconRef(sys, "Void");
    this["system_IndexOutOfRangeException_tcref@"] = this.findSysTyconRef(sys, "IndexOutOfRangeException");
    this["system_Nullable_tcref@"] = this.v_nullable_tcr;
    this["system_GenericIComparable_tcref@"] = this.findSysTyconRef(sys, "IComparable`1");
    this["system_GenericIEquatable_tcref@"] = this.findSysTyconRef(sys, "IEquatable`1");
    this["mk_IComparable_ty@"] = this.mkSysNonGenericTy(sys, "IComparable");
    this["system_LinqExpression_tcref@"] = this.v_linqExpression_tcr;
    this["mk_IStructuralComparable_ty@"] = this.mkSysNonGenericTy(sysCollections, "IStructuralComparable");
    this["mk_IStructuralEquatable_ty@"] = this.mkSysNonGenericTy(sysCollections, "IStructuralEquatable");
    this["tcref_System_Collections_IComparer@"] = this.findSysTyconRef(sysCollections, "IComparer");
    this["tcref_System_Collections_IEqualityComparer@"] = this.findSysTyconRef(sysCollections, "IEqualityComparer");
    this["tcref_System_Collections_Generic_IEqualityComparer@"] = this.findSysTyconRef(sysGenerics, "IEqualityComparer`1");
    this["tcref_System_Collections_Generic_Dictionary@"] = this.findSysTyconRef(sysGenerics, "Dictionary`2");
    this["tcref_System_Collections_Generic_IDictionary@"] = this.findSysTyconRef(sysGenerics, "IDictionary`2");
    this["tcref_System_IComparable@"] = this.findSysTyconRef(sys, "IComparable");
    this["tcref_System_IStructuralComparable@"] = this.findSysTyconRef(sysCollections, "IStructuralComparable");
    this["tcref_System_IStructuralEquatable@"] = this.findSysTyconRef(sysCollections, "IStructuralEquatable");
    this["tcref_System_IDisposable@"] = this.findSysTyconRef(sys, "IDisposable");
    this["tcref_LanguagePrimitives@"] = mk_MFCore_tcref(this["fslibCcu@160"], "LanguagePrimitives");
    this["tcref_System_Collections_Generic_List@"] = this.findSysTyconRef(sysGenerics, "List`1");
    this["tcref_System_Collections_Generic_IList@"] = this.findSysTyconRef(sysGenerics, "IList`1");
    this["tcref_System_Collections_Generic_IReadOnlyList@"] = this.findSysTyconRef(sysGenerics, "IReadOnlyList`1");
    this["tcref_System_Collections_Generic_ICollection@"] = this.findSysTyconRef(sysGenerics, "ICollection`1");
    this["tcref_System_Collections_Generic_IReadOnlyCollection@"] = this.findSysTyconRef(sysGenerics, "IReadOnlyCollection`1");

    this["iltyp_TypedReference@"] = (option => defaultArg(option, null, arg00_ => mkILNonGenericValueTy(arg00_)))(this.tryFindSysILTypeRef("System.TypedReference"));

    this["iltyp_StreamingContext@"] = (option_1 => defaultArg(option_1, null, arg00__1 => mkILNonGenericValueTy(arg00__1)))(this.tryFindSysILTypeRef("System.Runtime.Serialization.StreamingContext"));

    this["iltyp_SerializationInfo@"] = (option_2 => defaultArg(option_2, null, arg00__2 => mkILNonGenericBoxedTy(arg00__2)))(this.tryFindSysILTypeRef("System.Runtime.Serialization.SerializationInfo"));

    this["iltyp_Missing@"] = mkILNonGenericBoxedTy(this.findSysILTypeRef("System.Reflection.Missing"));
    this["iltyp_AsyncCallback@"] = mkILNonGenericBoxedTy(this.findSysILTypeRef("System.AsyncCallback"));
    this["iltyp_IAsyncResult@"] = mkILNonGenericBoxedTy(this.findSysILTypeRef("System.IAsyncResult"));
    this["iltyp_IComparable@"] = mkILNonGenericBoxedTy(this.findSysILTypeRef("System.IComparable"));
    this["iltyp_Exception@"] = mkILNonGenericBoxedTy(this.findSysILTypeRef("System.Exception"));
    this["iltyp_ValueType@"] = mkILNonGenericBoxedTy(this.findSysILTypeRef("System.ValueType"));
    this["iltyp_RuntimeFieldHandle@"] = mkILNonGenericValueTy(this.findSysILTypeRef("System.RuntimeFieldHandle"));
    this["iltyp_RuntimeMethodHandle@"] = mkILNonGenericValueTy(this.findSysILTypeRef("System.RuntimeMethodHandle"));
    this["iltyp_RuntimeTypeHandle@"] = mkILNonGenericValueTy(this.findSysILTypeRef("System.RuntimeTypeHandle"));
    this["attrib_AttributeUsageAttribute@"] = this.findSysAttrib("System.AttributeUsageAttribute");
    this["attrib_ParamArrayAttribute@"] = this.findSysAttrib("System.ParamArrayAttribute");
    this["attrib_IDispatchConstantAttribute@"] = this.tryFindSysAttrib("System.Runtime.CompilerServices.IDispatchConstantAttribute");
    this["attrib_IUnknownConstantAttribute@"] = this.tryFindSysAttrib("System.Runtime.CompilerServices.IUnknownConstantAttribute");
    this["attrib_SystemObsolete@"] = this.findSysAttrib("System.ObsoleteAttribute");
    this["attrib_DllImportAttribute@"] = this.tryFindSysAttrib("System.Runtime.InteropServices.DllImportAttribute");
    this["attrib_StructLayoutAttribute@"] = this.findSysAttrib("System.Runtime.InteropServices.StructLayoutAttribute");
    this["attrib_TypeForwardedToAttribute@"] = this.findSysAttrib("System.Runtime.CompilerServices.TypeForwardedToAttribute");
    this["attrib_ComVisibleAttribute@"] = this.findSysAttrib("System.Runtime.InteropServices.ComVisibleAttribute");
    this["attrib_ComImportAttribute@"] = this.tryFindSysAttrib("System.Runtime.InteropServices.ComImportAttribute");
    this["attrib_FieldOffsetAttribute@"] = this.findSysAttrib("System.Runtime.InteropServices.FieldOffsetAttribute");
    this["attrib_MarshalAsAttribute@"] = this.tryFindSysAttrib("System.Runtime.InteropServices.MarshalAsAttribute");
    this["attrib_InAttribute@"] = this.tryFindSysAttrib("System.Runtime.InteropServices.InAttribute");
    this["attrib_OutAttribute@"] = this.findSysAttrib("System.Runtime.InteropServices.OutAttribute");
    this["attrib_OptionalAttribute@"] = this.tryFindSysAttrib("System.Runtime.InteropServices.OptionalAttribute");
    this["attrib_DefaultParameterValueAttribute@"] = this.tryFindSysAttrib("System.Runtime.InteropServices.DefaultParameterValueAttribute");
    this["attrib_ThreadStaticAttribute@"] = this.tryFindSysAttrib("System.ThreadStaticAttribute");
    this["attrib_SpecialNameAttribute@"] = this.tryFindSysAttrib("System.Runtime.CompilerServices.SpecialNameAttribute");
    this["attrib_VolatileFieldAttribute@"] = this.mk_MFCore_attrib("VolatileFieldAttribute");
    this["attrib_ContextStaticAttribute@"] = this.tryFindSysAttrib("System.ContextStaticAttribute");
    this["attrib_FlagsAttribute@"] = this.findSysAttrib("System.FlagsAttribute");
    this["attrib_DefaultMemberAttribute@"] = this.findSysAttrib("System.Reflection.DefaultMemberAttribute");
    this["attrib_DebuggerDisplayAttribute@"] = this.findSysAttrib("System.Diagnostics.DebuggerDisplayAttribute");
    this["attrib_DebuggerTypeProxyAttribute@"] = this.findSysAttrib("System.Diagnostics.DebuggerTypeProxyAttribute");
    this["attrib_PreserveSigAttribute@"] = this.tryFindSysAttrib("System.Runtime.InteropServices.PreserveSigAttribute");
    this["attrib_MethodImplAttribute@"] = this.findSysAttrib("System.Runtime.CompilerServices.MethodImplAttribute");
    this["attrib_ExtensionAttribute@"] = this.findSysAttrib("System.Runtime.CompilerServices.ExtensionAttribute");
    this["attrib_CallerLineNumberAttribute@"] = this.findSysAttrib("System.Runtime.CompilerServices.CallerLineNumberAttribute");
    this["attrib_CallerFilePathAttribute@"] = this.findSysAttrib("System.Runtime.CompilerServices.CallerFilePathAttribute");
    this["attrib_CallerMemberNameAttribute@"] = this.findSysAttrib("System.Runtime.CompilerServices.CallerMemberNameAttribute");
    this["attrib_ProjectionParameterAttribute@"] = this.mk_MFCore_attrib("ProjectionParameterAttribute");
    this["attrib_CustomOperationAttribute@"] = this.mk_MFCore_attrib("CustomOperationAttribute");
    this["attrib_NonSerializedAttribute@"] = this.tryFindSysAttrib("System.NonSerializedAttribute");
    this["attrib_AutoSerializableAttribute@"] = this.mk_MFCore_attrib("AutoSerializableAttribute");
    this["attrib_RequireQualifiedAccessAttribute@"] = this.mk_MFCore_attrib("RequireQualifiedAccessAttribute");
    this["attrib_EntryPointAttribute@"] = this.mk_MFCore_attrib("EntryPointAttribute");
    this["attrib_DefaultAugmentationAttribute@"] = this.mk_MFCore_attrib("DefaultAugmentationAttribute");
    this["attrib_CompilerMessageAttribute@"] = this.mk_MFCore_attrib("CompilerMessageAttribute");
    this["attrib_ExperimentalAttribute@"] = this.mk_MFCore_attrib("ExperimentalAttribute");
    this["attrib_UnverifiableAttribute@"] = this.mk_MFCore_attrib("UnverifiableAttribute");
    this["attrib_LiteralAttribute@"] = this.mk_MFCore_attrib("LiteralAttribute");
    this["attrib_ConditionalAttribute@"] = this.findSysAttrib("System.Diagnostics.ConditionalAttribute");
    this["attrib_OptionalArgumentAttribute@"] = this.mk_MFCore_attrib("OptionalArgumentAttribute");
    this["attrib_RequiresExplicitTypeArgumentsAttribute@"] = this.mk_MFCore_attrib("RequiresExplicitTypeArgumentsAttribute");
    this["attrib_DefaultValueAttribute@"] = this.mk_MFCore_attrib("DefaultValueAttribute");
    this["attrib_ClassAttribute@"] = this.mk_MFCore_attrib("ClassAttribute");
    this["attrib_InterfaceAttribute@"] = this.mk_MFCore_attrib("InterfaceAttribute");
    this["attrib_StructAttribute@"] = this.mk_MFCore_attrib("StructAttribute");
    this["attrib_ReflectedDefinitionAttribute@"] = this.mk_MFCore_attrib("ReflectedDefinitionAttribute");
    this["attrib_CompiledNameAttribute@"] = this.mk_MFCore_attrib("CompiledNameAttribute");
    this["attrib_AutoOpenAttribute@"] = this.mk_MFCore_attrib("AutoOpenAttribute");
    this["attrib_InternalsVisibleToAttribute@"] = this.findSysAttrib("System.Runtime.CompilerServices.InternalsVisibleToAttribute");
    this["attrib_CompilationRepresentationAttribute@"] = this.mk_MFCore_attrib("CompilationRepresentationAttribute");
    this["attrib_CompilationArgumentCountsAttribute@"] = this.mk_MFCore_attrib("CompilationArgumentCountsAttribute");
    this["attrib_CompilationMappingAttribute@"] = this.mk_MFCore_attrib("CompilationMappingAttribute");
    this["attrib_CLIEventAttribute@"] = this.mk_MFCore_attrib("CLIEventAttribute");
    this["attrib_CLIMutableAttribute@"] = this.mk_MFCore_attrib("CLIMutableAttribute");
    this["attrib_AllowNullLiteralAttribute@"] = this.mk_MFCore_attrib("AllowNullLiteralAttribute");
    this["attrib_NoEqualityAttribute@"] = this.mk_MFCore_attrib("NoEqualityAttribute");
    this["attrib_NoComparisonAttribute@"] = this.mk_MFCore_attrib("NoComparisonAttribute");
    this["attrib_CustomEqualityAttribute@"] = this.mk_MFCore_attrib("CustomEqualityAttribute");
    this["attrib_CustomComparisonAttribute@"] = this.mk_MFCore_attrib("CustomComparisonAttribute");
    this["attrib_EqualityConditionalOnAttribute@"] = this.mk_MFCore_attrib("EqualityConditionalOnAttribute");
    this["attrib_ComparisonConditionalOnAttribute@"] = this.mk_MFCore_attrib("ComparisonConditionalOnAttribute");
    this["attrib_ReferenceEqualityAttribute@"] = this.mk_MFCore_attrib("ReferenceEqualityAttribute");
    this["attrib_StructuralEqualityAttribute@"] = this.mk_MFCore_attrib("StructuralEqualityAttribute");
    this["attrib_StructuralComparisonAttribute@"] = this.mk_MFCore_attrib("StructuralComparisonAttribute");
    this["attrib_SealedAttribute@"] = this.mk_MFCore_attrib("SealedAttribute");
    this["attrib_AbstractClassAttribute@"] = this.mk_MFCore_attrib("AbstractClassAttribute");
    this["attrib_GeneralizableValueAttribute@"] = this.mk_MFCore_attrib("GeneralizableValueAttribute");
    this["attrib_MeasureAttribute@"] = this.mk_MFCore_attrib("MeasureAttribute");
    this["attrib_MeasureableAttribute@"] = this.mk_MFCore_attrib("MeasureAnnotatedAbbreviationAttribute");
    this["attrib_NoDynamicInvocationAttribute@"] = this.mk_MFCore_attrib("NoDynamicInvocationAttribute");
    this["attrib_SecurityAttribute@"] = this.tryFindSysAttrib("System.Security.Permissions.SecurityAttribute");
    this["attrib_SecurityCriticalAttribute@"] = this.findSysAttrib("System.Security.SecurityCriticalAttribute");
    this["attrib_SecuritySafeCriticalAttribute@"] = this.findSysAttrib("System.Security.SecuritySafeCriticalAttribute");
    this["attrib_ComponentModelEditorBrowsableAttribute@"] = this.findSysAttrib("System.ComponentModel.EditorBrowsableAttribute");
    this["seq_vref@"] = ValRefForIntrinsic(this.v_seq_info);
    this["fsharpref_vref@"] = ValRefForIntrinsic(v_refcell_info);
    this["and_vref@"] = ValRefForIntrinsic(v_and_info);
    this["and2_vref@"] = ValRefForIntrinsic(v_and2_info);
    this["addrof_vref@"] = ValRefForIntrinsic(v_addrof_info);
    this["addrof2_vref@"] = ValRefForIntrinsic(v_addrof2_info);
    this["or_vref@"] = ValRefForIntrinsic(v_or_info);
    this["splice_expr_vref@"] = ValRefForIntrinsic(v_splice_expr_info);
    this["splice_raw_expr_vref@"] = ValRefForIntrinsic(v_splice_raw_expr_info);
    this["or2_vref@"] = ValRefForIntrinsic(v_or2_info);
    this["generic_equality_er_inner_vref@"] = ValRefForIntrinsic(v_generic_equality_er_inner_info);
    this["generic_equality_per_inner_vref@"] = ValRefForIntrinsic(v_generic_equality_per_inner_info);
    this["generic_equality_withc_inner_vref@"] = ValRefForIntrinsic(v_generic_equality_withc_inner_info);
    this["generic_comparison_inner_vref@"] = ValRefForIntrinsic(v_generic_comparison_inner_info);
    this["generic_comparison_withc_inner_vref@"] = ValRefForIntrinsic(v_generic_comparison_withc_inner_info);
    this["generic_hash_inner_vref@"] = ValRefForIntrinsic(v_generic_hash_inner_info);
    this["generic_hash_withc_inner_vref@"] = ValRefForIntrinsic(v_generic_hash_withc_inner_info);
    this["reference_equality_inner_vref@"] = ValRefForIntrinsic(v_reference_equality_inner_info);
    this["bitwise_or_vref@"] = ValRefForIntrinsic(this.v_bitwise_or_info);
    this["bitwise_and_vref@"] = ValRefForIntrinsic(this.v_bitwise_and_info);
    this["bitwise_xor_vref@"] = ValRefForIntrinsic(this.v_bitwise_xor_info);
    this["bitwise_unary_not_vref@"] = ValRefForIntrinsic(this.v_bitwise_unary_not_info);
    this["bitwise_shift_left_vref@"] = ValRefForIntrinsic(this.v_bitwise_shift_left_info);
    this["bitwise_shift_right_vref@"] = ValRefForIntrinsic(this.v_bitwise_shift_right_info);
    this["unchecked_addition_vref@"] = ValRefForIntrinsic(this.v_unchecked_addition_info);
    this["unchecked_unary_plus_vref@"] = ValRefForIntrinsic(this.v_unchecked_unary_plus_info);
    this["unchecked_unary_minus_vref@"] = ValRefForIntrinsic(this.v_unchecked_unary_minus_info);
    this["unchecked_unary_not_vref@"] = ValRefForIntrinsic(this.v_unchecked_unary_not_info);
    this["unchecked_subtraction_vref@"] = ValRefForIntrinsic(this.v_unchecked_subtraction_info);
    this["unchecked_multiply_vref@"] = ValRefForIntrinsic(this.v_unchecked_multiply_info);
    this["unchecked_defaultof_vref@"] = ValRefForIntrinsic(v_unchecked_defaultof_info);
    this["compare_operator_vref@"] = ValRefForIntrinsic(v_compare_operator_info);
    this["equals_operator_vref@"] = ValRefForIntrinsic(this.v_equals_operator_info);
    this["equals_nullable_operator_vref@"] = ValRefForIntrinsic(v_equals_nullable_operator_info);
    this["nullable_equals_nullable_operator_vref@"] = ValRefForIntrinsic(v_nullable_equals_nullable_operator_info);
    this["nullable_equals_operator_vref@"] = ValRefForIntrinsic(v_nullable_equals_operator_info);
    this["not_equals_operator_vref@"] = ValRefForIntrinsic(this.v_not_equals_operator_info);
    this["less_than_operator_vref@"] = ValRefForIntrinsic(this.v_less_than_operator_info);
    this["less_than_or_equals_operator_vref@"] = ValRefForIntrinsic(this.v_less_than_or_equals_operator_info);
    this["greater_than_operator_vref@"] = ValRefForIntrinsic(this.v_greater_than_operator_info);
    this["greater_than_or_equals_operator_vref@"] = ValRefForIntrinsic(this.v_greater_than_or_equals_operator_info);
    this["raise_vref@"] = ValRefForIntrinsic(this.v_raise_info);
    this["failwith_vref@"] = ValRefForIntrinsic(this.v_failwith_info);
    this["invalid_arg_vref@"] = ValRefForIntrinsic(this.v_invalid_arg_info);
    this["null_arg_vref@"] = ValRefForIntrinsic(this.v_null_arg_info);
    this["invalid_op_vref@"] = ValRefForIntrinsic(this.v_invalid_op_info);
    this["failwithf_vref@"] = ValRefForIntrinsic(this.v_failwithf_info);
    this["reraise_vref@"] = ValRefForIntrinsic(this.v_reraise_info);
    this["methodhandleof_vref@"] = ValRefForIntrinsic(this.v_methodhandleof_info);
    this["typeof_vref@"] = ValRefForIntrinsic(this.v_typeof_info);
    this["sizeof_vref@"] = ValRefForIntrinsic(v_sizeof_info);
    this["typedefof_vref@"] = ValRefForIntrinsic(this.v_typedefof_info);
    this["enum_vref@"] = ValRefForIntrinsic(this.v_enum_operator_info);
    this["enumOfValue_vref@"] = ValRefForIntrinsic(v_enumOfValue_info);
    this["range_op_vref@"] = ValRefForIntrinsic(v_range_op_info);
    this["range_step_op_vref@"] = ValRefForIntrinsic(v_range_step_op_info);
    this["range_int32_op_vref@"] = ValRefForIntrinsic(v_range_int32_op_info);
    this["array_get_vref@"] = ValRefForIntrinsic(this.v_array_get_info);
    this["array2D_get_vref@"] = ValRefForIntrinsic(this.v_array2D_get_info);
    this["array3D_get_vref@"] = ValRefForIntrinsic(this.v_array3D_get_info);
    this["array4D_get_vref@"] = ValRefForIntrinsic(this.v_array4D_get_info);
    this["seq_singleton_vref@"] = ValRefForIntrinsic(this.v_seq_singleton_info);
    this["seq_collect_vref@"] = ValRefForIntrinsic(this.v_seq_collect_info);
    this["seq_using_vref@"] = ValRefForIntrinsic(this.v_seq_using_info);
    this["seq_delay_vref@"] = ValRefForIntrinsic(this.v_seq_delay_info);
    this["seq_append_vref@"] = ValRefForIntrinsic(this.v_seq_append_info);
    this["seq_generated_vref@"] = ValRefForIntrinsic(this.v_seq_generated_info);
    this["seq_finally_vref@"] = ValRefForIntrinsic(this.v_seq_finally_info);
    this["seq_of_functions_vref@"] = ValRefForIntrinsic(this.v_seq_of_functions_info);
    this["seq_map_vref@"] = ValRefForIntrinsic(this.v_seq_map_info);
    this["seq_empty_vref@"] = ValRefForIntrinsic(this.v_seq_empty_info);
    this["new_format_vref@"] = ValRefForIntrinsic(this.v_new_format_info);
    this["sprintf_vref@"] = ValRefForIntrinsic(v_sprintf_info);
    this["unbox_vref@"] = ValRefForIntrinsic(this.v_unbox_info);
    this["unbox_fast_vref@"] = ValRefForIntrinsic(this.v_unbox_fast_info);
    this["istype_vref@"] = ValRefForIntrinsic(this.v_istype_info);
    this["istype_fast_vref@"] = ValRefForIntrinsic(this.v_istype_fast_info);
    this["query_source_vref@"] = ValRefForIntrinsic(v_query_source_info);
    this["query_value_vref@"] = ValRefForIntrinsic(v_query_value_info);
    this["query_run_value_vref@"] = ValRefForIntrinsic(v_query_run_value_info);
    this["query_run_enumerable_vref@"] = ValRefForIntrinsic(v_query_run_enumerable_info);
    this["query_for_vref@"] = ValRefForIntrinsic(v_query_for_value_info);
    this["query_yield_vref@"] = ValRefForIntrinsic(v_query_yield_value_info);
    this["query_yield_from_vref@"] = ValRefForIntrinsic(v_query_yield_from_value_info);
    this["query_select_vref@"] = ValRefForIntrinsic(v_query_select_value_info);
    this["query_where_vref@"] = ValRefForIntrinsic(v_query_where_value_info);
    this["query_zero_vref@"] = ValRefForIntrinsic(v_query_zero_value_info);
    this["generic_hash_withc_tuple2_vref@"] = ValRefForIntrinsic(v_generic_hash_withc_tuple2_info);
    this["generic_hash_withc_tuple3_vref@"] = ValRefForIntrinsic(v_generic_hash_withc_tuple3_info);
    this["generic_hash_withc_tuple4_vref@"] = ValRefForIntrinsic(v_generic_hash_withc_tuple4_info);
    this["generic_hash_withc_tuple5_vref@"] = ValRefForIntrinsic(v_generic_hash_withc_tuple5_info);
    this["generic_equals_withc_tuple2_vref@"] = ValRefForIntrinsic(v_generic_equals_withc_tuple2_info);
    this["generic_equals_withc_tuple3_vref@"] = ValRefForIntrinsic(v_generic_equals_withc_tuple3_info);
    this["generic_equals_withc_tuple4_vref@"] = ValRefForIntrinsic(v_generic_equals_withc_tuple4_info);
    this["generic_equals_withc_tuple5_vref@"] = ValRefForIntrinsic(v_generic_equals_withc_tuple5_info);
    this["generic_compare_withc_tuple2_vref@"] = ValRefForIntrinsic(v_generic_compare_withc_tuple2_info);
    this["generic_compare_withc_tuple3_vref@"] = ValRefForIntrinsic(v_generic_compare_withc_tuple3_info);
    this["generic_compare_withc_tuple4_vref@"] = ValRefForIntrinsic(v_generic_compare_withc_tuple4_info);
    this["generic_compare_withc_tuple5_vref@"] = ValRefForIntrinsic(v_generic_compare_withc_tuple5_info);
    this["generic_equality_withc_outer_vref@"] = ValRefForIntrinsic(this.v_generic_equality_withc_outer_info);
    this["ilxPubCloEnv@"] = newIlxPubCloEnv(this["ilg@160"], mdef => this.addMethodGeneratedAttrs(mdef), fdef => this.addFieldGeneratedAttrs(fdef), fdef_1 => this.addFieldNeverAttrs(fdef_1));
  }

  ToString() {
    return "<TcGlobals>";
  }

  get ilg() {
    return this["ilg@160"];
  }

  get knownIntrinsics() {
    return this.v_knownIntrinsics;
  }

  get knownFSharpCoreModules() {
    return this.v_knownFSharpCoreModules;
  }

  get compilingFslib() {
    return this["compilingFslib@160"];
  }

  get mlCompatibility() {
    return this["mlCompatibility@161"];
  }

  get emitDebugInfoInQuotations() {
    return this["emitDebugInfoInQuotations@164"];
  }

  get directoryToResolveRelativePaths() {
    return this["directoryToResolveRelativePaths@160"];
  }

  unionCaseRefEq(x, y) {
    return primUnionCaseRefEq(this["compilingFslib@160"], this["fslibCcu@160"], x, y);
  }

  valRefEq(x, y) {
    return primValRefEq(this["compilingFslib@160"], this["fslibCcu@160"], x, y);
  }

  get fslibCcu() {
    return this["fslibCcu@160"];
  }

  get refcell_tcr_canon() {
    return this["refcell_tcr_canon@"];
  }

  get option_tcr_canon() {
    return this["option_tcr_canon@"];
  }

  get list_tcr_canon() {
    return this.v_list_tcr_canon;
  }

  get set_tcr_canon() {
    return this["set_tcr_canon@"];
  }

  get map_tcr_canon() {
    return this["map_tcr_canon@"];
  }

  get lazy_tcr_canon() {
    return this.lazy_tcr;
  }

  get refcell_tcr_nice() {
    return this["refcell_tcr_nice@"];
  }

  get array_tcr_nice() {
    return this["array_tcr_nice@"];
  }

  get option_tcr_nice() {
    return this.v_option_tcr_nice;
  }

  get list_tcr_nice() {
    return this.v_list_tcr_nice;
  }

  get lazy_tcr_nice() {
    return this.v_lazy_tcr_nice;
  }

  get format_tcr() {
    return this.v_format_tcr;
  }

  get expr_tcr() {
    return this.v_expr_tcr;
  }

  get raw_expr_tcr() {
    return this.v_raw_expr_tcr;
  }

  get nativeint_tcr() {
    return this.v_nativeint_tcr;
  }

  get unativeint_tcr() {
    return this.v_unativeint_tcr;
  }

  get int_tcr() {
    return this.v_int_tcr;
  }

  get int32_tcr() {
    return this.v_int32_tcr;
  }

  get int16_tcr() {
    return this.v_int16_tcr;
  }

  get int64_tcr() {
    return this.v_int64_tcr;
  }

  get uint16_tcr() {
    return this.v_uint16_tcr;
  }

  get uint32_tcr() {
    return this.v_uint32_tcr;
  }

  get uint64_tcr() {
    return this.v_uint64_tcr;
  }

  get sbyte_tcr() {
    return this.v_sbyte_tcr;
  }

  get decimal_tcr() {
    return this.v_decimal_tcr;
  }

  get date_tcr() {
    return this.v_date_tcr;
  }

  get pdecimal_tcr() {
    return this.v_pdecimal_tcr;
  }

  get byte_tcr() {
    return this.v_byte_tcr;
  }

  get bool_tcr() {
    return this.v_bool_tcr;
  }

  get unit_tcr_canon() {
    return this.v_unit_tcr_canon;
  }

  get unit_tcr_nice() {
    return this.v_unit_tcr_nice;
  }

  get exn_tcr() {
    return this.v_exn_tcr;
  }

  get char_tcr() {
    return this.v_char_tcr;
  }

  get float_tcr() {
    return this.v_float_tcr;
  }

  get float32_tcr() {
    return this.v_float32_tcr;
  }

  get pfloat_tcr() {
    return this.v_pfloat_tcr;
  }

  get pfloat32_tcr() {
    return this.v_pfloat32_tcr;
  }

  get pint_tcr() {
    return this.v_pint_tcr;
  }

  get pint8_tcr() {
    return this.v_pint8_tcr;
  }

  get pint16_tcr() {
    return this.v_pint16_tcr;
  }

  get pint64_tcr() {
    return this.v_pint64_tcr;
  }

  get byref_tcr() {
    return this.v_byref_tcr;
  }

  get nativeptr_tcr() {
    return this.v_nativeptr_tcr;
  }

  get ilsigptr_tcr() {
    return this.v_ilsigptr_tcr;
  }

  get fastFunc_tcr() {
    return this.v_fastFunc_tcr;
  }

  get tcref_IQueryable() {
    return this.v_tcref_IQueryable;
  }

  get tcref_IObservable() {
    return this.v_tcref_IObservable;
  }

  get tcref_IObserver() {
    return this.v_tcref_IObserver;
  }

  get fslib_IEvent2_tcr() {
    return this.v_fslib_IEvent2_tcr;
  }

  get fslib_IDelegateEvent_tcr() {
    return this.v_fslib_IDelegateEvent_tcr;
  }

  get seq_tcr() {
    return this.v_seq_tcr;
  }

  get seq_base_tcr() {
    return this["seq_base_tcr@"];
  }

  get measureproduct_tcr() {
    return this["measureproduct_tcr@"];
  }

  get measureinverse_tcr() {
    return this["measureinverse_tcr@"];
  }

  get measureone_tcr() {
    return this["measureone_tcr@"];
  }

  get il_arr_tcr_map() {
    return this.v_il_arr_tcr_map;
  }

  get ref_tuple1_tcr() {
    return this.v_ref_tuple1_tcr;
  }

  get ref_tuple2_tcr() {
    return this.v_ref_tuple2_tcr;
  }

  get ref_tuple3_tcr() {
    return this.v_ref_tuple3_tcr;
  }

  get ref_tuple4_tcr() {
    return this.v_ref_tuple4_tcr;
  }

  get ref_tuple5_tcr() {
    return this.v_ref_tuple5_tcr;
  }

  get ref_tuple6_tcr() {
    return this.v_ref_tuple6_tcr;
  }

  get ref_tuple7_tcr() {
    return this.v_ref_tuple7_tcr;
  }

  get ref_tuple8_tcr() {
    return this.v_ref_tuple8_tcr;
  }

  get struct_tuple1_tcr() {
    return this.v_struct_tuple1_tcr;
  }

  get struct_tuple2_tcr() {
    return this.v_struct_tuple2_tcr;
  }

  get struct_tuple3_tcr() {
    return this.v_struct_tuple3_tcr;
  }

  get struct_tuple4_tcr() {
    return this.v_struct_tuple4_tcr;
  }

  get struct_tuple5_tcr() {
    return this.v_struct_tuple5_tcr;
  }

  get struct_tuple6_tcr() {
    return this.v_struct_tuple6_tcr;
  }

  get struct_tuple7_tcr() {
    return this.v_struct_tuple7_tcr;
  }

  get struct_tuple8_tcr() {
    return this.v_struct_tuple8_tcr;
  }

  get choice2_tcr() {
    return this.v_choice2_tcr;
  }

  get choice3_tcr() {
    return this.v_choice3_tcr;
  }

  get choice4_tcr() {
    return this.v_choice4_tcr;
  }

  get choice5_tcr() {
    return this.v_choice5_tcr;
  }

  get choice6_tcr() {
    return this.v_choice6_tcr;
  }

  get choice7_tcr() {
    return this.v_choice7_tcr;
  }

  get nativeint_ty() {
    return this["nativeint_ty@"];
  }

  get unativeint_ty() {
    return this["unativeint_ty@"];
  }

  get int32_ty() {
    return this["int32_ty@"];
  }

  get int16_ty() {
    return this["int16_ty@"];
  }

  get int64_ty() {
    return this["int64_ty@"];
  }

  get uint16_ty() {
    return this["uint16_ty@"];
  }

  get uint32_ty() {
    return this["uint32_ty@"];
  }

  get uint64_ty() {
    return this["uint64_ty@"];
  }

  get sbyte_ty() {
    return this["sbyte_ty@"];
  }

  get byte_ty() {
    return this.v_byte_ty;
  }

  get bool_ty() {
    return this.v_bool_ty;
  }

  get int_ty() {
    return this.v_int_ty;
  }

  get string_ty() {
    return this.v_string_ty;
  }

  get unit_ty() {
    return this.v_unit_ty;
  }

  get obj_ty() {
    return this.v_obj_ty;
  }

  get char_ty() {
    return this.v_char_ty;
  }

  get decimal_ty() {
    return this.v_decimal_ty;
  }

  get exn_ty() {
    return this["exn_ty@"];
  }

  get float_ty() {
    return this["float_ty@"];
  }

  get float32_ty() {
    return this["float32_ty@"];
  }

  memoize_file(x) {
    return this.v_memoize_file.Apply(x);
  }

  get system_Array_typ() {
    return this["system_Array_typ@"];
  }

  get system_Object_typ() {
    return this["system_Object_typ@"];
  }

  get system_IDisposable_typ() {
    return this["system_IDisposable_typ@"];
  }

  get system_RuntimeHelpers_typ() {
    return this["system_RuntimeHelpers_typ@"];
  }

  get system_Value_typ() {
    return this["system_Value_typ@"];
  }

  get system_Delegate_typ() {
    return this["system_Delegate_typ@"];
  }

  get system_MulticastDelegate_typ() {
    return this["system_MulticastDelegate_typ@"];
  }

  get system_Enum_typ() {
    return this["system_Enum_typ@"];
  }

  get system_Exception_typ() {
    return this["system_Exception_typ@"];
  }

  get system_String_typ() {
    return this["system_String_typ@"];
  }

  get system_String_tcref() {
    return this["system_String_tcref@"];
  }

  get system_Int32_typ() {
    return this["system_Int32_typ@"];
  }

  get system_Type_typ() {
    return this.v_system_Type_typ;
  }

  get system_TypedReference_tcref() {
    return this["system_TypedReference_tcref@"];
  }

  get system_ArgIterator_tcref() {
    return this["system_ArgIterator_tcref@"];
  }

  get system_RuntimeArgumentHandle_tcref() {
    return this["system_RuntimeArgumentHandle_tcref@"];
  }

  get system_SByte_tcref() {
    return this["system_SByte_tcref@"];
  }

  get system_Decimal_tcref() {
    return this["system_Decimal_tcref@"];
  }

  get system_Int16_tcref() {
    return this["system_Int16_tcref@"];
  }

  get system_Int32_tcref() {
    return this["system_Int32_tcref@"];
  }

  get system_Int64_tcref() {
    return this["system_Int64_tcref@"];
  }

  get system_IntPtr_tcref() {
    return this["system_IntPtr_tcref@"];
  }

  get system_Bool_tcref() {
    return this["system_Bool_tcref@"];
  }

  get system_Byte_tcref() {
    return this["system_Byte_tcref@"];
  }

  get system_UInt16_tcref() {
    return this["system_UInt16_tcref@"];
  }

  get system_Char_tcref() {
    return this["system_Char_tcref@"];
  }

  get system_UInt32_tcref() {
    return this["system_UInt32_tcref@"];
  }

  get system_UInt64_tcref() {
    return this["system_UInt64_tcref@"];
  }

  get system_UIntPtr_tcref() {
    return this["system_UIntPtr_tcref@"];
  }

  get system_Single_tcref() {
    return this["system_Single_tcref@"];
  }

  get system_Double_tcref() {
    return this["system_Double_tcref@"];
  }

  get system_RuntimeTypeHandle_typ() {
    return this["system_RuntimeTypeHandle_typ@"];
  }

  get system_RuntimeMethodHandle_typ() {
    return this.v_system_RuntimeMethodHandle_typ;
  }

  get system_MarshalByRefObject_tcref() {
    return this["system_MarshalByRefObject_tcref@"];
  }

  get system_MarshalByRefObject_typ() {
    return this["system_MarshalByRefObject_typ@"];
  }

  get system_Reflection_MethodInfo_typ() {
    return this.v_system_Reflection_MethodInfo_typ;
  }

  get system_Array_tcref() {
    return this["system_Array_tcref@"];
  }

  get system_Object_tcref() {
    return this["system_Object_tcref@"];
  }

  get system_Void_tcref() {
    return this["system_Void_tcref@"];
  }

  get system_IndexOutOfRangeException_tcref() {
    return this["system_IndexOutOfRangeException_tcref@"];
  }

  get system_Nullable_tcref() {
    return this["system_Nullable_tcref@"];
  }

  get system_GenericIComparable_tcref() {
    return this["system_GenericIComparable_tcref@"];
  }

  get system_GenericIEquatable_tcref() {
    return this["system_GenericIEquatable_tcref@"];
  }

  get mk_IComparable_ty() {
    return this["mk_IComparable_ty@"];
  }

  get system_LinqExpression_tcref() {
    return this["system_LinqExpression_tcref@"];
  }

  get mk_IStructuralComparable_ty() {
    return this["mk_IStructuralComparable_ty@"];
  }

  get mk_IStructuralEquatable_ty() {
    return this["mk_IStructuralEquatable_ty@"];
  }

  get IComparer_ty() {
    return this.v_IComparer_ty;
  }

  get IEqualityComparer_ty() {
    return this.v_IEqualityComparer_ty;
  }

  get tcref_System_Collections_IComparer() {
    return this["tcref_System_Collections_IComparer@"];
  }

  get tcref_System_Collections_IEqualityComparer() {
    return this["tcref_System_Collections_IEqualityComparer@"];
  }

  get tcref_System_Collections_Generic_IEqualityComparer() {
    return this["tcref_System_Collections_Generic_IEqualityComparer@"];
  }

  get tcref_System_Collections_Generic_Dictionary() {
    return this["tcref_System_Collections_Generic_Dictionary@"];
  }

  get tcref_System_Collections_Generic_IDictionary() {
    return this["tcref_System_Collections_Generic_IDictionary@"];
  }

  get tcref_System_IComparable() {
    return this["tcref_System_IComparable@"];
  }

  get tcref_System_IStructuralComparable() {
    return this["tcref_System_IStructuralComparable@"];
  }

  get tcref_System_IStructuralEquatable() {
    return this["tcref_System_IStructuralEquatable@"];
  }

  get tcref_System_IDisposable() {
    return this["tcref_System_IDisposable@"];
  }

  get tcref_LanguagePrimitives() {
    return this["tcref_LanguagePrimitives@"];
  }

  get tcref_System_Collections_Generic_List() {
    return this["tcref_System_Collections_Generic_List@"];
  }

  get tcref_System_Collections_Generic_IList() {
    return this["tcref_System_Collections_Generic_IList@"];
  }

  get tcref_System_Collections_Generic_IReadOnlyList() {
    return this["tcref_System_Collections_Generic_IReadOnlyList@"];
  }

  get tcref_System_Collections_Generic_ICollection() {
    return this["tcref_System_Collections_Generic_ICollection@"];
  }

  get tcref_System_Collections_Generic_IReadOnlyCollection() {
    return this["tcref_System_Collections_Generic_IReadOnlyCollection@"];
  }

  get tcref_System_Collections_IEnumerable() {
    return this.v_tcref_System_Collections_IEnumerable;
  }

  get tcref_System_Collections_Generic_IEnumerable() {
    return this.v_IEnumerable_tcr;
  }

  get tcref_System_Collections_Generic_IEnumerator() {
    return this.v_IEnumerator_tcr;
  }

  get tcref_System_Attribute() {
    return this.v_System_Attribute_tcr;
  }

  get iltyp_TypedReference() {
    return this["iltyp_TypedReference@"];
  }

  get iltyp_StreamingContext() {
    return this["iltyp_StreamingContext@"];
  }

  get iltyp_SerializationInfo() {
    return this["iltyp_SerializationInfo@"];
  }

  get iltyp_Missing() {
    return this["iltyp_Missing@"];
  }

  get iltyp_AsyncCallback() {
    return this["iltyp_AsyncCallback@"];
  }

  get iltyp_IAsyncResult() {
    return this["iltyp_IAsyncResult@"];
  }

  get iltyp_IComparable() {
    return this["iltyp_IComparable@"];
  }

  get iltyp_Exception() {
    return this["iltyp_Exception@"];
  }

  get iltyp_ValueType() {
    return this["iltyp_ValueType@"];
  }

  get iltyp_RuntimeFieldHandle() {
    return this["iltyp_RuntimeFieldHandle@"];
  }

  get iltyp_RuntimeMethodHandle() {
    return this["iltyp_RuntimeMethodHandle@"];
  }

  get iltyp_RuntimeTypeHandle() {
    return this["iltyp_RuntimeTypeHandle@"];
  }

  get attrib_AttributeUsageAttribute() {
    return this["attrib_AttributeUsageAttribute@"];
  }

  get attrib_ParamArrayAttribute() {
    return this["attrib_ParamArrayAttribute@"];
  }

  get attrib_IDispatchConstantAttribute() {
    return this["attrib_IDispatchConstantAttribute@"];
  }

  get attrib_IUnknownConstantAttribute() {
    return this["attrib_IUnknownConstantAttribute@"];
  }

  get attrib_SystemObsolete() {
    return this["attrib_SystemObsolete@"];
  }

  get attrib_DllImportAttribute() {
    return this["attrib_DllImportAttribute@"];
  }

  get attrib_StructLayoutAttribute() {
    return this["attrib_StructLayoutAttribute@"];
  }

  get attrib_TypeForwardedToAttribute() {
    return this["attrib_TypeForwardedToAttribute@"];
  }

  get attrib_ComVisibleAttribute() {
    return this["attrib_ComVisibleAttribute@"];
  }

  get attrib_ComImportAttribute() {
    return this["attrib_ComImportAttribute@"];
  }

  get attrib_FieldOffsetAttribute() {
    return this["attrib_FieldOffsetAttribute@"];
  }

  get attrib_MarshalAsAttribute() {
    return this["attrib_MarshalAsAttribute@"];
  }

  get attrib_InAttribute() {
    return this["attrib_InAttribute@"];
  }

  get attrib_OutAttribute() {
    return this["attrib_OutAttribute@"];
  }

  get attrib_OptionalAttribute() {
    return this["attrib_OptionalAttribute@"];
  }

  get attrib_DefaultParameterValueAttribute() {
    return this["attrib_DefaultParameterValueAttribute@"];
  }

  get attrib_ThreadStaticAttribute() {
    return this["attrib_ThreadStaticAttribute@"];
  }

  get attrib_SpecialNameAttribute() {
    return this["attrib_SpecialNameAttribute@"];
  }

  get attrib_VolatileFieldAttribute() {
    return this["attrib_VolatileFieldAttribute@"];
  }

  get attrib_ContextStaticAttribute() {
    return this["attrib_ContextStaticAttribute@"];
  }

  get attrib_FlagsAttribute() {
    return this["attrib_FlagsAttribute@"];
  }

  get attrib_DefaultMemberAttribute() {
    return this["attrib_DefaultMemberAttribute@"];
  }

  get attrib_DebuggerDisplayAttribute() {
    return this["attrib_DebuggerDisplayAttribute@"];
  }

  get attrib_DebuggerTypeProxyAttribute() {
    return this["attrib_DebuggerTypeProxyAttribute@"];
  }

  get attrib_PreserveSigAttribute() {
    return this["attrib_PreserveSigAttribute@"];
  }

  get attrib_MethodImplAttribute() {
    return this["attrib_MethodImplAttribute@"];
  }

  get attrib_ExtensionAttribute() {
    return this["attrib_ExtensionAttribute@"];
  }

  get attrib_CallerLineNumberAttribute() {
    return this["attrib_CallerLineNumberAttribute@"];
  }

  get attrib_CallerFilePathAttribute() {
    return this["attrib_CallerFilePathAttribute@"];
  }

  get attrib_CallerMemberNameAttribute() {
    return this["attrib_CallerMemberNameAttribute@"];
  }

  get attrib_ProjectionParameterAttribute() {
    return this["attrib_ProjectionParameterAttribute@"];
  }

  get attrib_CustomOperationAttribute() {
    return this["attrib_CustomOperationAttribute@"];
  }

  get attrib_NonSerializedAttribute() {
    return this["attrib_NonSerializedAttribute@"];
  }

  get attrib_AutoSerializableAttribute() {
    return this["attrib_AutoSerializableAttribute@"];
  }

  get attrib_RequireQualifiedAccessAttribute() {
    return this["attrib_RequireQualifiedAccessAttribute@"];
  }

  get attrib_EntryPointAttribute() {
    return this["attrib_EntryPointAttribute@"];
  }

  get attrib_DefaultAugmentationAttribute() {
    return this["attrib_DefaultAugmentationAttribute@"];
  }

  get attrib_CompilerMessageAttribute() {
    return this["attrib_CompilerMessageAttribute@"];
  }

  get attrib_ExperimentalAttribute() {
    return this["attrib_ExperimentalAttribute@"];
  }

  get attrib_UnverifiableAttribute() {
    return this["attrib_UnverifiableAttribute@"];
  }

  get attrib_LiteralAttribute() {
    return this["attrib_LiteralAttribute@"];
  }

  get attrib_ConditionalAttribute() {
    return this["attrib_ConditionalAttribute@"];
  }

  get attrib_OptionalArgumentAttribute() {
    return this["attrib_OptionalArgumentAttribute@"];
  }

  get attrib_RequiresExplicitTypeArgumentsAttribute() {
    return this["attrib_RequiresExplicitTypeArgumentsAttribute@"];
  }

  get attrib_DefaultValueAttribute() {
    return this["attrib_DefaultValueAttribute@"];
  }

  get attrib_ClassAttribute() {
    return this["attrib_ClassAttribute@"];
  }

  get attrib_InterfaceAttribute() {
    return this["attrib_InterfaceAttribute@"];
  }

  get attrib_StructAttribute() {
    return this["attrib_StructAttribute@"];
  }

  get attrib_ReflectedDefinitionAttribute() {
    return this["attrib_ReflectedDefinitionAttribute@"];
  }

  get attrib_CompiledNameAttribute() {
    return this["attrib_CompiledNameAttribute@"];
  }

  get attrib_AutoOpenAttribute() {
    return this["attrib_AutoOpenAttribute@"];
  }

  get attrib_InternalsVisibleToAttribute() {
    return this["attrib_InternalsVisibleToAttribute@"];
  }

  get attrib_CompilationRepresentationAttribute() {
    return this["attrib_CompilationRepresentationAttribute@"];
  }

  get attrib_CompilationArgumentCountsAttribute() {
    return this["attrib_CompilationArgumentCountsAttribute@"];
  }

  get attrib_CompilationMappingAttribute() {
    return this["attrib_CompilationMappingAttribute@"];
  }

  get attrib_CLIEventAttribute() {
    return this["attrib_CLIEventAttribute@"];
  }

  get attrib_CLIMutableAttribute() {
    return this["attrib_CLIMutableAttribute@"];
  }

  get attrib_AllowNullLiteralAttribute() {
    return this["attrib_AllowNullLiteralAttribute@"];
  }

  get attrib_NoEqualityAttribute() {
    return this["attrib_NoEqualityAttribute@"];
  }

  get attrib_NoComparisonAttribute() {
    return this["attrib_NoComparisonAttribute@"];
  }

  get attrib_CustomEqualityAttribute() {
    return this["attrib_CustomEqualityAttribute@"];
  }

  get attrib_CustomComparisonAttribute() {
    return this["attrib_CustomComparisonAttribute@"];
  }

  get attrib_EqualityConditionalOnAttribute() {
    return this["attrib_EqualityConditionalOnAttribute@"];
  }

  get attrib_ComparisonConditionalOnAttribute() {
    return this["attrib_ComparisonConditionalOnAttribute@"];
  }

  get attrib_ReferenceEqualityAttribute() {
    return this["attrib_ReferenceEqualityAttribute@"];
  }

  get attrib_StructuralEqualityAttribute() {
    return this["attrib_StructuralEqualityAttribute@"];
  }

  get attrib_StructuralComparisonAttribute() {
    return this["attrib_StructuralComparisonAttribute@"];
  }

  get attrib_SealedAttribute() {
    return this["attrib_SealedAttribute@"];
  }

  get attrib_AbstractClassAttribute() {
    return this["attrib_AbstractClassAttribute@"];
  }

  get attrib_GeneralizableValueAttribute() {
    return this["attrib_GeneralizableValueAttribute@"];
  }

  get attrib_MeasureAttribute() {
    return this["attrib_MeasureAttribute@"];
  }

  get attrib_MeasureableAttribute() {
    return this["attrib_MeasureableAttribute@"];
  }

  get attrib_NoDynamicInvocationAttribute() {
    return this["attrib_NoDynamicInvocationAttribute@"];
  }

  get attrib_SecurityAttribute() {
    return this["attrib_SecurityAttribute@"];
  }

  get attrib_SecurityCriticalAttribute() {
    return this["attrib_SecurityCriticalAttribute@"];
  }

  get attrib_SecuritySafeCriticalAttribute() {
    return this["attrib_SecuritySafeCriticalAttribute@"];
  }

  get attrib_ComponentModelEditorBrowsableAttribute() {
    return this["attrib_ComponentModelEditorBrowsableAttribute@"];
  }

  improveType(tcref, tinst) {
    return this.improveTy(tcref, tinst);
  }

  decompileType(tcref, tinst) {
    return this.decompileTy(tcref, tinst);
  }

  get new_decimal_info() {
    return this.v_new_decimal_info;
  }

  get seq_info() {
    return this.v_seq_info;
  }

  get seq_vref() {
    return this["seq_vref@"];
  }

  get fsharpref_vref() {
    return this["fsharpref_vref@"];
  }

  get and_vref() {
    return this["and_vref@"];
  }

  get and2_vref() {
    return this["and2_vref@"];
  }

  get addrof_vref() {
    return this["addrof_vref@"];
  }

  get addrof2_vref() {
    return this["addrof2_vref@"];
  }

  get or_vref() {
    return this["or_vref@"];
  }

  get splice_expr_vref() {
    return this["splice_expr_vref@"];
  }

  get splice_raw_expr_vref() {
    return this["splice_raw_expr_vref@"];
  }

  get or2_vref() {
    return this["or2_vref@"];
  }

  get generic_equality_er_inner_vref() {
    return this["generic_equality_er_inner_vref@"];
  }

  get generic_equality_per_inner_vref() {
    return this["generic_equality_per_inner_vref@"];
  }

  get generic_equality_withc_inner_vref() {
    return this["generic_equality_withc_inner_vref@"];
  }

  get generic_comparison_inner_vref() {
    return this["generic_comparison_inner_vref@"];
  }

  get generic_comparison_withc_inner_vref() {
    return this["generic_comparison_withc_inner_vref@"];
  }

  get generic_comparison_withc_outer_info() {
    return this.v_generic_comparison_withc_outer_info;
  }

  get generic_equality_er_outer_info() {
    return this.v_generic_equality_er_outer_info;
  }

  get generic_equality_withc_outer_info() {
    return this.v_generic_equality_withc_outer_info;
  }

  get generic_hash_withc_outer_info() {
    return this.v_generic_hash_withc_outer_info;
  }

  get generic_hash_inner_vref() {
    return this["generic_hash_inner_vref@"];
  }

  get generic_hash_withc_inner_vref() {
    return this["generic_hash_withc_inner_vref@"];
  }

  get reference_equality_inner_vref() {
    return this["reference_equality_inner_vref@"];
  }

  get bitwise_or_vref() {
    return this["bitwise_or_vref@"];
  }

  get bitwise_and_vref() {
    return this["bitwise_and_vref@"];
  }

  get bitwise_xor_vref() {
    return this["bitwise_xor_vref@"];
  }

  get bitwise_unary_not_vref() {
    return this["bitwise_unary_not_vref@"];
  }

  get bitwise_shift_left_vref() {
    return this["bitwise_shift_left_vref@"];
  }

  get bitwise_shift_right_vref() {
    return this["bitwise_shift_right_vref@"];
  }

  get unchecked_addition_vref() {
    return this["unchecked_addition_vref@"];
  }

  get unchecked_unary_plus_vref() {
    return this["unchecked_unary_plus_vref@"];
  }

  get unchecked_unary_minus_vref() {
    return this["unchecked_unary_minus_vref@"];
  }

  get unchecked_unary_not_vref() {
    return this["unchecked_unary_not_vref@"];
  }

  get unchecked_subtraction_vref() {
    return this["unchecked_subtraction_vref@"];
  }

  get unchecked_multiply_vref() {
    return this["unchecked_multiply_vref@"];
  }

  get unchecked_defaultof_vref() {
    return this["unchecked_defaultof_vref@"];
  }

  get bitwise_or_info() {
    return this.v_bitwise_or_info;
  }

  get bitwise_and_info() {
    return this.v_bitwise_and_info;
  }

  get bitwise_xor_info() {
    return this.v_bitwise_xor_info;
  }

  get bitwise_unary_not_info() {
    return this.v_bitwise_unary_not_info;
  }

  get bitwise_shift_left_info() {
    return this.v_bitwise_shift_left_info;
  }

  get bitwise_shift_right_info() {
    return this.v_bitwise_shift_right_info;
  }

  get unchecked_addition_info() {
    return this.v_unchecked_addition_info;
  }

  get unchecked_subtraction_info() {
    return this.v_unchecked_subtraction_info;
  }

  get unchecked_multiply_info() {
    return this.v_unchecked_multiply_info;
  }

  get unchecked_division_info() {
    return this.v_unchecked_division_info;
  }

  get unchecked_modulus_info() {
    return this.v_unchecked_modulus_info;
  }

  get unchecked_unary_plus_info() {
    return this.v_unchecked_unary_plus_info;
  }

  get unchecked_unary_minus_info() {
    return this.v_unchecked_unary_minus_info;
  }

  get unchecked_unary_not_info() {
    return this.v_unchecked_unary_not_info;
  }

  get checked_addition_info() {
    return this.v_checked_addition_info;
  }

  get checked_subtraction_info() {
    return this.v_checked_subtraction_info;
  }

  get checked_multiply_info() {
    return this.v_checked_multiply_info;
  }

  get checked_unary_minus_info() {
    return this.v_checked_unary_minus_info;
  }

  get byte_checked_info() {
    return this.v_byte_checked_info;
  }

  get sbyte_checked_info() {
    return this.v_sbyte_checked_info;
  }

  get int16_checked_info() {
    return this.v_int16_checked_info;
  }

  get uint16_checked_info() {
    return this.v_uint16_checked_info;
  }

  get int_checked_info() {
    return this.v_int_checked_info;
  }

  get int32_checked_info() {
    return this.v_int32_checked_info;
  }

  get uint32_checked_info() {
    return this.v_uint32_checked_info;
  }

  get int64_checked_info() {
    return this.v_int64_checked_info;
  }

  get uint64_checked_info() {
    return this.v_uint64_checked_info;
  }

  get nativeint_checked_info() {
    return this.v_nativeint_checked_info;
  }

  get unativeint_checked_info() {
    return this.v_unativeint_checked_info;
  }

  get byte_operator_info() {
    return this.v_byte_operator_info;
  }

  get sbyte_operator_info() {
    return this.v_sbyte_operator_info;
  }

  get int16_operator_info() {
    return this.v_int16_operator_info;
  }

  get uint16_operator_info() {
    return this.v_uint16_operator_info;
  }

  get int_operator_info() {
    return this.v_int_operator_info;
  }

  get int32_operator_info() {
    return this.v_int32_operator_info;
  }

  get uint32_operator_info() {
    return this.v_uint32_operator_info;
  }

  get int64_operator_info() {
    return this.v_int64_operator_info;
  }

  get uint64_operator_info() {
    return this.v_uint64_operator_info;
  }

  get float32_operator_info() {
    return this.v_float32_operator_info;
  }

  get float_operator_info() {
    return this.v_float_operator_info;
  }

  get nativeint_operator_info() {
    return this.v_nativeint_operator_info;
  }

  get unativeint_operator_info() {
    return this.v_unativeint_operator_info;
  }

  get char_operator_info() {
    return this.v_char_operator_info;
  }

  get enum_operator_info() {
    return this.v_enum_operator_info;
  }

  get compare_operator_vref() {
    return this["compare_operator_vref@"];
  }

  get equals_operator_vref() {
    return this["equals_operator_vref@"];
  }

  get equals_nullable_operator_vref() {
    return this["equals_nullable_operator_vref@"];
  }

  get nullable_equals_nullable_operator_vref() {
    return this["nullable_equals_nullable_operator_vref@"];
  }

  get nullable_equals_operator_vref() {
    return this["nullable_equals_operator_vref@"];
  }

  get not_equals_operator_vref() {
    return this["not_equals_operator_vref@"];
  }

  get less_than_operator_vref() {
    return this["less_than_operator_vref@"];
  }

  get less_than_or_equals_operator_vref() {
    return this["less_than_or_equals_operator_vref@"];
  }

  get greater_than_operator_vref() {
    return this["greater_than_operator_vref@"];
  }

  get greater_than_or_equals_operator_vref() {
    return this["greater_than_or_equals_operator_vref@"];
  }

  get raise_vref() {
    return this["raise_vref@"];
  }

  get failwith_vref() {
    return this["failwith_vref@"];
  }

  get invalid_arg_vref() {
    return this["invalid_arg_vref@"];
  }

  get null_arg_vref() {
    return this["null_arg_vref@"];
  }

  get invalid_op_vref() {
    return this["invalid_op_vref@"];
  }

  get failwithf_vref() {
    return this["failwithf_vref@"];
  }

  get equals_operator_info() {
    return this.v_equals_operator_info;
  }

  get not_equals_operator() {
    return this.v_not_equals_operator_info;
  }

  get less_than_operator() {
    return this.v_less_than_operator_info;
  }

  get less_than_or_equals_operator() {
    return this.v_less_than_or_equals_operator_info;
  }

  get greater_than_operator() {
    return this.v_greater_than_operator_info;
  }

  get greater_than_or_equals_operator() {
    return this.v_greater_than_or_equals_operator_info;
  }

  get hash_info() {
    return this.v_hash_info;
  }

  get box_info() {
    return this.v_box_info;
  }

  get isnull_info() {
    return this.v_isnull_info;
  }

  get isnotnull_info() {
    return this.v_isnotnull_info;
  }

  get raise_info() {
    return this.v_raise_info;
  }

  get failwith_info() {
    return this.v_failwith_info;
  }

  get invalid_arg_info() {
    return this.v_invalid_arg_info;
  }

  get null_arg_info() {
    return this.v_null_arg_info;
  }

  get invalid_op_info() {
    return this.v_invalid_op_info;
  }

  get failwithf_info() {
    return this.v_failwithf_info;
  }

  get reraise_info() {
    return this.v_reraise_info;
  }

  get methodhandleof_info() {
    return this.v_methodhandleof_info;
  }

  get typeof_info() {
    return this.v_typeof_info;
  }

  get typedefof_info() {
    return this.v_typedefof_info;
  }

  get reraise_vref() {
    return this["reraise_vref@"];
  }

  get methodhandleof_vref() {
    return this["methodhandleof_vref@"];
  }

  get typeof_vref() {
    return this["typeof_vref@"];
  }

  get sizeof_vref() {
    return this["sizeof_vref@"];
  }

  get typedefof_vref() {
    return this["typedefof_vref@"];
  }

  get enum_vref() {
    return this["enum_vref@"];
  }

  get enumOfValue_vref() {
    return this["enumOfValue_vref@"];
  }

  get range_op_vref() {
    return this["range_op_vref@"];
  }

  get range_step_op_vref() {
    return this["range_step_op_vref@"];
  }

  get range_int32_op_vref() {
    return this["range_int32_op_vref@"];
  }

  get array_get_vref() {
    return this["array_get_vref@"];
  }

  get array2D_get_vref() {
    return this["array2D_get_vref@"];
  }

  get array3D_get_vref() {
    return this["array3D_get_vref@"];
  }

  get array4D_get_vref() {
    return this["array4D_get_vref@"];
  }

  get seq_singleton_vref() {
    return this["seq_singleton_vref@"];
  }

  get seq_collect_vref() {
    return this["seq_collect_vref@"];
  }

  get seq_using_vref() {
    return this["seq_using_vref@"];
  }

  get seq_delay_vref() {
    return this["seq_delay_vref@"];
  }

  get seq_append_vref() {
    return this["seq_append_vref@"];
  }

  get seq_generated_vref() {
    return this["seq_generated_vref@"];
  }

  get seq_finally_vref() {
    return this["seq_finally_vref@"];
  }

  get seq_of_functions_vref() {
    return this["seq_of_functions_vref@"];
  }

  get seq_map_vref() {
    return this["seq_map_vref@"];
  }

  get seq_empty_vref() {
    return this["seq_empty_vref@"];
  }

  get new_format_vref() {
    return this["new_format_vref@"];
  }

  get sprintf_vref() {
    return this["sprintf_vref@"];
  }

  get unbox_vref() {
    return this["unbox_vref@"];
  }

  get unbox_fast_vref() {
    return this["unbox_fast_vref@"];
  }

  get istype_vref() {
    return this["istype_vref@"];
  }

  get istype_fast_vref() {
    return this["istype_fast_vref@"];
  }

  get query_source_vref() {
    return this["query_source_vref@"];
  }

  get query_value_vref() {
    return this["query_value_vref@"];
  }

  get query_run_value_vref() {
    return this["query_run_value_vref@"];
  }

  get query_run_enumerable_vref() {
    return this["query_run_enumerable_vref@"];
  }

  get query_for_vref() {
    return this["query_for_vref@"];
  }

  get query_yield_vref() {
    return this["query_yield_vref@"];
  }

  get query_yield_from_vref() {
    return this["query_yield_from_vref@"];
  }

  get query_select_vref() {
    return this["query_select_vref@"];
  }

  get query_where_vref() {
    return this["query_where_vref@"];
  }

  get query_zero_vref() {
    return this["query_zero_vref@"];
  }

  get seq_collect_info() {
    return this.v_seq_collect_info;
  }

  get seq_using_info() {
    return this.v_seq_using_info;
  }

  get seq_delay_info() {
    return this.v_seq_delay_info;
  }

  get seq_append_info() {
    return this.v_seq_append_info;
  }

  get seq_generated_info() {
    return this.v_seq_generated_info;
  }

  get seq_finally_info() {
    return this.v_seq_finally_info;
  }

  get seq_of_functions_info() {
    return this.v_seq_of_functions_info;
  }

  get seq_map_info() {
    return this.v_seq_map_info;
  }

  get seq_singleton_info() {
    return this.v_seq_singleton_info;
  }

  get seq_empty_info() {
    return this.v_seq_empty_info;
  }

  get new_format_info() {
    return this.v_new_format_info;
  }

  get unbox_info() {
    return this.v_unbox_info;
  }

  get get_generic_comparer_info() {
    return this.v_get_generic_comparer_info;
  }

  get get_generic_er_equality_comparer_info() {
    return this.v_get_generic_er_equality_comparer_info;
  }

  get get_generic_per_equality_comparer_info() {
    return this.v_get_generic_per_equality_comparer_info;
  }

  get dispose_info() {
    return this.v_dispose_info;
  }

  get getstring_info() {
    return this.v_getstring_info;
  }

  get unbox_fast_info() {
    return this.v_unbox_fast_info;
  }

  get istype_info() {
    return this.v_istype_info;
  }

  get istype_fast_info() {
    return this.v_istype_fast_info;
  }

  get lazy_force_info() {
    return this.v_lazy_force_info;
  }

  get lazy_create_info() {
    return this.v_lazy_create_info;
  }

  get create_instance_info() {
    return this.v_create_instance_info;
  }

  get create_event_info() {
    return this.v_create_event_info;
  }

  get seq_to_list_info() {
    return this.v_seq_to_list_info;
  }

  get seq_to_array_info() {
    return this.v_seq_to_array_info;
  }

  get array_length_info() {
    return this.v_array_length_info;
  }

  get array_get_info() {
    return this.v_array_get_info;
  }

  get array2D_get_info() {
    return this.v_array2D_get_info;
  }

  get array3D_get_info() {
    return this.v_array3D_get_info;
  }

  get array4D_get_info() {
    return this.v_array4D_get_info;
  }

  get array_set_info() {
    return this.v_array_set_info;
  }

  get array2D_set_info() {
    return this.v_array2D_set_info;
  }

  get array3D_set_info() {
    return this.v_array3D_set_info;
  }

  get array4D_set_info() {
    return this.v_array4D_set_info;
  }

  get deserialize_quoted_FSharp_20_plus_info() {
    return this.v_deserialize_quoted_FSharp_20_plus_info;
  }

  get deserialize_quoted_FSharp_40_plus_info() {
    return this.v_deserialize_quoted_FSharp_40_plus_info;
  }

  get cast_quotation_info() {
    return this.v_cast_quotation_info;
  }

  get lift_value_info() {
    return this.v_lift_value_info;
  }

  get lift_value_with_name_info() {
    return this.v_lift_value_with_name_info;
  }

  get lift_value_with_defn_info() {
    return this.v_lift_value_with_defn_info;
  }

  get query_source_as_enum_info() {
    return this.v_query_source_as_enum_info;
  }

  get new_query_source_info() {
    return this.v_new_query_source_info;
  }

  get query_builder_tcref() {
    return this.v_query_builder_tcref;
  }

  get fail_init_info() {
    return this.v_fail_init_info;
  }

  get fail_static_init_info() {
    return this.v_fail_static_init_info;
  }

  get check_this_info() {
    return this.v_check_this_info;
  }

  get quote_to_linq_lambda_info() {
    return this.v_quote_to_linq_lambda_info;
  }

  get generic_hash_withc_tuple2_vref() {
    return this["generic_hash_withc_tuple2_vref@"];
  }

  get generic_hash_withc_tuple3_vref() {
    return this["generic_hash_withc_tuple3_vref@"];
  }

  get generic_hash_withc_tuple4_vref() {
    return this["generic_hash_withc_tuple4_vref@"];
  }

  get generic_hash_withc_tuple5_vref() {
    return this["generic_hash_withc_tuple5_vref@"];
  }

  get generic_equals_withc_tuple2_vref() {
    return this["generic_equals_withc_tuple2_vref@"];
  }

  get generic_equals_withc_tuple3_vref() {
    return this["generic_equals_withc_tuple3_vref@"];
  }

  get generic_equals_withc_tuple4_vref() {
    return this["generic_equals_withc_tuple4_vref@"];
  }

  get generic_equals_withc_tuple5_vref() {
    return this["generic_equals_withc_tuple5_vref@"];
  }

  get generic_compare_withc_tuple2_vref() {
    return this["generic_compare_withc_tuple2_vref@"];
  }

  get generic_compare_withc_tuple3_vref() {
    return this["generic_compare_withc_tuple3_vref@"];
  }

  get generic_compare_withc_tuple4_vref() {
    return this["generic_compare_withc_tuple4_vref@"];
  }

  get generic_compare_withc_tuple5_vref() {
    return this["generic_compare_withc_tuple5_vref@"];
  }

  get generic_equality_withc_outer_vref() {
    return this["generic_equality_withc_outer_vref@"];
  }

  get cons_ucref() {
    return this.v_cons_ucref;
  }

  get nil_ucref() {
    return this.v_nil_ucref;
  }

  get suppressed_types() {
    return this.v_suppressed_types;
  }

  get isInteractive() {
    return this["isInteractive@161"];
  }

  FindSysTyconRef(path, nm) {
    return this.findSysTyconRef(path, nm);
  }

  TryFindSysTyconRef(path, nm) {
    return this.tryFindSysTyconRef(path, nm);
  }

  FindSysILTypeRef(nm) {
    return this.findSysILTypeRef(nm);
  }

  TryFindSysILTypeRef(nm) {
    return this.tryFindSysILTypeRef(nm);
  }

  FindSysAttrib(nm) {
    return this.findSysAttrib(nm);
  }

  TryFindSysAttrib(nm) {
    return this.tryFindSysAttrib(nm);
  }

  get ilxPubCloEnv() {
    return this["ilxPubCloEnv@"];
  }

  AddMethodGeneratedAttributes(mdef) {
    return this.addMethodGeneratedAttrs(mdef);
  }

  AddFieldGeneratedAttrs(mdef) {
    return this.addFieldGeneratedAttrs(mdef);
  }

  AddFieldNeverAttrs(mdef) {
    return this.addFieldNeverAttrs(mdef);
  }

  mkDebuggerHiddenAttribute() {
    return mkILCustomAttribute(this["ilg@160"], this.findSysILTypeRef("System.Diagnostics.DebuggerHiddenAttribute"), new List(), new List(), new List());
  }

  mkDebuggerDisplayAttribute(s) {
    return mkILCustomAttribute(this["ilg@160"], this.findSysILTypeRef("System.Diagnostics.DebuggerDisplayAttribute"), ofArray([this["ilg@160"].typ_String]), ofArray([new ILAttribElem(0, s)]), new List());
  }

  get DebuggerBrowsableNeverAttribute() {
    return this.mkDebuggerBrowsableNeverAttribute();
  }

  mkDebuggerStepThroughAttribute() {
    return mkILCustomAttribute(this["ilg@160"], this.findSysILTypeRef("System.Diagnostics.DebuggerStepThroughAttribute"), new List(), new List(), new List());
  }

  mkDebuggableAttribute(jitOptimizerDisabled) {
    return mkILCustomAttribute(this["ilg@160"], this.tref_DebuggableAttribute, ofArray([this["ilg@160"].typ_Bool, this["ilg@160"].typ_Bool]), ofArray([new ILAttribElem(1, false), new ILAttribElem(1, jitOptimizerDisabled)]), new List());
  }

  mkDebuggableAttributeV2(jitTracking, ignoreSymbolStoreSequencePoints, jitOptimizerDisabled, enableEnC) {
    const debuggingMode = (jitTracking ? 1 : 0) | (jitOptimizerDisabled ? 256 : 0) | (ignoreSymbolStoreSequencePoints ? 2 : 0) | (enableEnC ? 4 : 0) | 0;
    const tref_DebuggableAttribute_DebuggingModes = mkILTyRefInTyRef(this.tref_DebuggableAttribute, "DebuggingModes");
    return mkILCustomAttribute(this["ilg@160"], this.tref_DebuggableAttribute, ofArray([mkILNonGenericValueTy(tref_DebuggableAttribute_DebuggingModes)]), ofArray([new ILAttribElem(5, debuggingMode)]), new List());
  }

  get CompilerGeneratedAttribute() {
    return this.mkCompilerGeneratedAttribute();
  }

  get eraseClassUnionDef() {
    var addMethodGeneratedAttrs;
    var addPropertyGeneratedAttrs;
    var addPropertyNeverAttrs;
    var addFieldGeneratedAttrs;
    var addFieldNeverAttrs;
    var mkDebuggerTypeProxyAttribute;
    return CurriedLambda((addMethodGeneratedAttrs = mdef => this.addMethodGeneratedAttrs(mdef), addPropertyGeneratedAttrs = pdef => this.addPropertyGeneratedAttrs(pdef), addPropertyNeverAttrs = pdef_1 => this.addPropertyNeverAttrs(pdef_1), addFieldGeneratedAttrs = fdef => this.addFieldGeneratedAttrs(fdef), addFieldNeverAttrs = fdef_1 => this.addFieldNeverAttrs(fdef_1), mkDebuggerTypeProxyAttribute = ty => this.mkDebuggerTypeProxyAttribute(ty), (tref, td, cud) => mkClassUnionDef(addMethodGeneratedAttrs, addPropertyGeneratedAttrs, addPropertyNeverAttrs, addFieldGeneratedAttrs, addFieldNeverAttrs, mkDebuggerTypeProxyAttribute, this["ilg@160"], tref, td, cud)));
  }

  dummyAssemblyNameCarryingUsefulErrorInformation(path, typeName) {
    return SR.tcGlobalsSystemTypeNotFound(join(".", path) + "." + typeName);
  }

  findSysTypeCcu(path, typeName) {
    var clo0;
    const matchValue = this.tryFindSysTypeCcu(path, typeName);

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return CcuThunk.CreateDelayed((clo0 = (path_1, typeName_1) => this.dummyAssemblyNameCarryingUsefulErrorInformation(path_1, typeName_1), CurriedLambda(arg00 => CurriedLambda(clo0)(arg00)))(path, typeName));
    }
  }

  tryFindSysTyconRef(path, nm) {
    const matchValue = this.tryFindSysTypeCcu(path, nm);

    if (matchValue == null) {
      return null;
    } else {
      return mkNonLocalTyconRef2(getValue(matchValue), Array.from(path), nm);
    }
  }

  findSysTyconRef(path, nm) {
    const ccu = this.findSysTypeCcu(path, nm);
    return mkNonLocalTyconRef2(ccu, Array.from(path), nm);
  }

  findSysILTypeRef(nm) {
    var clo0;
    const patternInput = splitILTypeName(nm);
    let scoref;
    const matchValue = this.tryFindSysTypeCcu(patternInput[0], patternInput[1]);

    if (matchValue != null) {
      scoref = getValue(matchValue).ILScopeRef;
    } else {
      scoref = new ILScopeRef(2, mkSimpleAssRef((clo0 = (path, typeName) => this.dummyAssemblyNameCarryingUsefulErrorInformation(path, typeName), CurriedLambda(arg00 => CurriedLambda(clo0)(arg00)))(patternInput[0], patternInput[1])));
    }

    return mkILTyRef(scoref, nm);
  }

  tryFindSysILTypeRef(nm) {
    const patternInput = splitILTypeName(nm);
    return defaultArg(this.tryFindSysTypeCcu(patternInput[0], patternInput[1]), null, ccu => mkILTyRef(ccu.ILScopeRef, nm));
  }

  findSysAttrib(nm) {
    const tref = this.findSysILTypeRef(nm);
    const patternInput = splitILTypeName(nm);
    return new BuiltinAttribInfo(0, [tref, this.findSysTyconRef(patternInput[0], patternInput[1])]);
  }

  tryFindSysAttrib(nm) {
    const patternInput = splitILTypeName(nm);
    const matchValue = this.tryFindSysTypeCcu(patternInput[0], patternInput[1]);

    if (matchValue == null) {
      return null;
    } else {
      return this.findSysAttrib(nm);
    }
  }

  mkSysNonGenericTy(path, n) {
    return mkNonGenericTy(this.findSysTyconRef(path, n));
  }

  tryMkSysNonGenericTy(path, n) {
    return (option => defaultArg(option, null, tcref => mkNonGenericTy(tcref)))(this.tryFindSysTyconRef(path, n));
  }

  mkNullableTy(ty) {
    return new TType(1, [this.v_nullable_tcr, ofArray([ty])]);
  }

  mkByrefTy(ty) {
    return new TType(1, [this.v_byref_tcr, ofArray([ty])]);
  }

  mkNativePtrTy(ty) {
    return new TType(1, [this.v_nativeptr_tcr, ofArray([ty])]);
  }

  mkFunTy(d, r) {
    return new TType(3, [d, r]);
  }

  op_MinusMinusGreater(d, r) {
    return this.mkFunTy(d, r);
  }

  mkIteratedFunTy(dl, r) {
    return foldBack((d, r_1) => this.op_MinusMinusGreater(d, r_1), dl, r);
  }

  mkSmallRefTupledTy(l) {
    if (l.tail != null) {
      if (l.tail.tail == null) {
        return l.head;
      } else {
        return mkRawRefTupleTy(l);
      }
    } else {
      return this.v_unit_ty;
    }
  }

  tryMkForallTy(d, r) {
    if (d.tail == null) {
      return r;
    } else {
      return new TType(0, [d, r]);
    }
  }

  makeIntrinsicValRef(enclosingEntity, logicalName, memberParentName, compiledNameOpt, typars, _arg1) {
    let ty;
    let r;
    const dl = map_2(l => this.mkSmallRefTupledTy(l), _arg1[0]);
    r = this.mkIteratedFunTy(dl, _arg1[1]);
    ty = this.tryMkForallTy(typars, r);
    const isMember = memberParentName != null;
    const argCount = (isMember ? sum(map_2(list => list.length, _arg1[0])) : 0) | 0;
    const linkageType = isMember ? ty : null;
    const key = new ValLinkageFullKey(new ValLinkagePartialKey(memberParentName, false, logicalName, argCount), linkageType);
    const vref = new IntrinsicValRef(0, [enclosingEntity, logicalName, isMember, ty, key]);
    const compiledName = compiledNameOpt != null ? compiledNameOpt : logicalName;
    this.v_knownIntrinsics.set([enclosingEntity.LastItemMangledName, compiledName], ValRefForIntrinsic(vref));
    return vref;
  }

  mk_unop_ty(ty) {
    return [ofArray([ofArray([ty])]), ty];
  }

  mk_binop_ty(ty) {
    return [ofArray([ofArray([ty]), ofArray([ty])]), ty];
  }

  mk_shiftop_ty(ty) {
    return [ofArray([ofArray([ty]), ofArray([this.v_int_ty])]), ty];
  }

  mk_binop_ty3(ty1, ty2, ty3) {
    return [ofArray([ofArray([ty1]), ofArray([ty2])]), ty3];
  }

  mk_rel_sig(ty) {
    return [ofArray([ofArray([ty]), ofArray([ty])]), this.v_bool_ty];
  }

  mk_compare_sig(ty) {
    return [ofArray([ofArray([ty]), ofArray([ty])]), this.v_int_ty];
  }

  mk_hash_sig(ty) {
    return [ofArray([ofArray([ty])]), this.v_int_ty];
  }

  mk_compare_withc_sig(ty) {
    return [ofArray([ofArray([this.v_IComparer_ty]), ofArray([ty]), ofArray([ty])]), this.v_int_ty];
  }

  mk_equality_withc_sig(ty) {
    return [ofArray([ofArray([this.v_IEqualityComparer_ty]), ofArray([ty]), ofArray([ty])]), this.v_bool_ty];
  }

  mk_hash_withc_sig(ty) {
    return [ofArray([ofArray([this.v_IEqualityComparer_ty]), ofArray([ty])]), this.v_int_ty];
  }

  mkListTy(ty) {
    return new TType(1, [this.v_list_tcr_nice, ofArray([ty])]);
  }

  mkSeqTy(ty1) {
    return new TType(1, [this.v_seq_tcr, ofArray([ty1])]);
  }

  mkRefCellTy(ty) {
    return new TType(1, [this.v_refcell_tcr_canon, ofArray([ty])]);
  }

  mkQuerySourceTy(ty1, ty2) {
    return new TType(1, [this.v_querySource_tcr, ofArray([ty1, ty2])]);
  }

  mkArrayType(rank, ty) {
    return new TType(1, [this.v_il_arr_tcr_map[rank - 1], ofArray([ty])]);
  }

  mkLazyTy(ty) {
    return new TType(1, [this.lazy_tcr, ofArray([ty])]);
  }

  mkPrintfFormatTy(aty, bty, cty, dty, ety) {
    return new TType(1, [this.v_format_tcr, ofArray([aty, bty, cty, dty, ety])]);
  }

  mk_format4_ty(aty, bty, cty, dty) {
    return new TType(1, [this.v_format4_tcr, ofArray([aty, bty, cty, dty])]);
  }

  mkQuotedExprTy(aty) {
    return new TType(1, [this.v_expr_tcr, ofArray([aty])]);
  }

  mkLinqExpressionTy(aty) {
    return new TType(1, [this.v_linqExpression_tcr, ofArray([aty])]);
  }

  tyconRefEq(x, y) {
    return primEntityRefEq(this["compilingFslib@160"], this["fslibCcu@160"], x, y);
  }

  tryDecodeTupleTy(tupInfo, l) {
    var t8_1;
    var y_1;
    var t8;
    var y;
    const $var5 = l.tail == null ? [1] : l.tail.tail == null ? [2] : l.tail.tail.tail != null ? l.tail.tail.tail.tail != null ? l.tail.tail.tail.tail.tail != null ? l.tail.tail.tail.tail.tail.tail != null ? l.tail.tail.tail.tail.tail.tail.tail != null ? l.tail.tail.tail.tail.tail.tail.tail.tail != null ? l.tail.tail.tail.tail.tail.tail.tail.tail.tail == null ? [0, l.tail.tail.tail.tail.tail.tail.tail.head, l.head, l.tail.head, l.tail.tail.head, l.tail.tail.tail.head, l.tail.tail.tail.tail.head, l.tail.tail.tail.tail.tail.head, l.tail.tail.tail.tail.tail.tail.head] : [3] : [3] : [3] : [3] : [3] : [3] : [3];

    switch ($var5[0]) {
      case 0:
        const $var6 = $var5[1].tag === 1 ? $var5[1].data[1].tail != null ? $var5[1].data[1].tail.tail == null ? (t8_1 = $var5[1].data[1].head, y_1 = this.v_ref_tuple1_tcr, this.tyconRefEq($var5[1].data[0], y_1)) ? [0, $var5[1].data[1].head, $var5[1].data[0]] : [1] : [1] : [1] : [1];

        switch ($var6[0]) {
          case 0:
            return mkRawRefTupleTy(ofArray([$var5[2], $var5[3], $var5[4], $var5[5], $var5[6], $var5[7], $var5[8], $var6[1]]));

          case 1:
            const $var7 = $var5[1].tag === 1 ? $var5[1].data[1].tail != null ? $var5[1].data[1].tail.tail == null ? (t8 = $var5[1].data[1].head, y = this.v_struct_tuple1_tcr, this.tyconRefEq($var5[1].data[0], y)) ? [0, $var5[1].data[1].head, $var5[1].data[0]] : [1] : [1] : [1] : [1];

            switch ($var7[0]) {
              case 0:
                return mkRawStructTupleTy(ofArray([$var5[2], $var5[3], $var5[4], $var5[5], $var5[6], $var5[7], $var5[8], $var7[1]]));

              case 1:
                if ($var5[1].tag === 2) {
                  return new TType(2, [tupInfo, append(ofArray([$var5[2], $var5[3], $var5[4], $var5[5], $var5[6], $var5[7], $var5[8]]), $var5[1].data[1])]);
                } else {
                  return null;
                }

            }

        }

      case 1:
        return null;

      case 2:
        return null;

      case 3:
        return new TType(2, [tupInfo, l]);
    }
  }

  decodeTupleTy(tupInfo, l) {
    const matchValue = this.tryDecodeTupleTy(tupInfo, l);

    if (matchValue == null) {
      throw new Error("couldn't decode tuple ty");
    } else {
      return getValue(matchValue);
    }
  }

  decodeTupleTyIfPossible(tcref, tupInfo, l) {
    const matchValue = this.tryDecodeTupleTy(tupInfo, l);

    if (matchValue == null) {
      return new TType(1, [tcref, l]);
    } else {
      return getValue(matchValue);
    }
  }

  mk_MFCore_attrib(nm) {
    return new BuiltinAttribInfo(0, [mkILTyRef(ilxFsharpCoreLibScopeRef(), FSharpLib_1.Core + "." + nm), mk_MFCore_tcref(this["fslibCcu@160"], nm)]);
  }

  mk_doc(filename) {
    return ILSourceDocument.Create(null, null, null, filename);
  }

  mkDebuggerNonUserCodeAttribute() {
    return mkILCustomAttribute(this["ilg@160"], this.findSysILTypeRef("System.Diagnostics.DebuggerNonUserCodeAttribute"), new List(), new List(), new List());
  }

  mkCompilerGeneratedAttribute() {
    return mkILCustomAttribute(this["ilg@160"], this.tref_CompilerGeneratedAttribute, new List(), new List(), new List());
  }

  addGeneratedAttrs(attrs) {
    let attribs;
    const matchValue = this.generatedAttribsCache;

    if (matchValue.tail == null) {
      const res = toList(delay(() => !this.noDebugData ? append_1(singleton(this.mkCompilerGeneratedAttribute()), delay(() => singleton(this.mkDebuggerNonUserCodeAttribute()))) : empty()));
      this.generatedAttribsCache = res;
      attribs = res;
    } else {
      attribs = matchValue;
    }

    return mkILCustomAttrs(append(attrs.AsList, attribs));
  }

  addMethodGeneratedAttrs(mdef) {
    var attrs;
    return mdef.With(null, null, null, null, null, null, null, null, null, null, (attrs = mdef.CustomAttrs, this.addGeneratedAttrs(attrs)));
  }

  addPropertyGeneratedAttrs(pdef) {
    var attrs;
    return pdef.With(null, null, null, null, null, null, null, null, (attrs = pdef.CustomAttrs, this.addGeneratedAttrs(attrs)));
  }

  addFieldGeneratedAttrs(fdef) {
    var attrs;
    return fdef.With(null, null, null, null, null, null, null, (attrs = fdef.CustomAttrs, this.addGeneratedAttrs(attrs)));
  }

  tref_DebuggerBrowsableAttribute(n) {
    let typ_DebuggerBrowsableState;
    const tref = this.findSysILTypeRef("System.Diagnostics.DebuggerBrowsableState");
    typ_DebuggerBrowsableState = new ILType(2, mkILNonGenericTySpec(tref));
    return mkILCustomAttribute(this["ilg@160"], this.findSysILTypeRef("System.Diagnostics.DebuggerBrowsableAttribute"), ofArray([typ_DebuggerBrowsableState]), ofArray([new ILAttribElem(5, n)]), new List());
  }

  mkDebuggerBrowsableNeverAttribute() {
    const matchValue = this.debuggerBrowsableNeverAttributeCache;

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      const res = this.tref_DebuggerBrowsableAttribute(0);
      this.debuggerBrowsableNeverAttributeCache = res;
      return res;
    }
  }

  addNeverAttrs(attrs) {
    return mkILCustomAttrs(append(attrs.AsList, ofArray([this.mkDebuggerBrowsableNeverAttribute()])));
  }

  addPropertyNeverAttrs(pdef) {
    var attrs;
    return pdef.With(null, null, null, null, null, null, null, null, (attrs = pdef.CustomAttrs, this.addNeverAttrs(attrs)));
  }

  addFieldNeverAttrs(fdef) {
    var attrs;
    return fdef.With(null, null, null, null, null, null, null, (attrs = fdef.CustomAttrs, this.addNeverAttrs(attrs)));
  }

  mkDebuggerTypeProxyAttribute(ty) {
    return mkILCustomAttribute(this["ilg@160"], this.findSysILTypeRef("System.Diagnostics.DebuggerTypeProxyAttribute"), ofArray([this["ilg@160"].typ_Type]), ofArray([new ILAttribElem(15, ty.TypeRef)]), new List());
  }

  getDecompileTypeDict() {
    var $var8;
    const matchValue = this.decompileTypeDict;

    if (matchValue == null) {
      const entries = this.decompileTyconEntries;
      const t = create(null, fromEqualityComparer(($var8 = this, {
        GetHashCode(x) {
          return (obj => hash(obj))(x) | 0;
        },

        Equals(x, y) {
          return ((e1, e2) => equals(e1, e2))(x, y);
        },

        [_Symbol.reflection]() {
          return {
            interfaces: ["System.Collections.Generic.IEqualityComparer"]
          };
        }

      })));

      for (let idx = 0; idx <= entries.length - 1; idx++) {
        const forLoopVar = entries[idx];

        if (forLoopVar[1].CanDeref) {
          t.set(forLoopVar[1].Stamp, forLoopVar[2]);
        }
      }

      this.decompileTypeDict = t;
      return t;
    } else {
      return matchValue;
    }
  }

  getBetterTypeDict1() {
    var $var9;
    const matchValue = this.betterTypeDict1;

    if (matchValue == null) {
      const entries = this.betterEntries;
      const t = create(null, fromEqualityComparer(($var9 = this, {
        GetHashCode(x) {
          return (obj => hash(obj))(x) | 0;
        },

        Equals(x, y) {
          return ((e1, e2) => equals(e1, e2))(x, y);
        },

        [_Symbol.reflection]() {
          return {
            interfaces: ["System.Collections.Generic.IEqualityComparer"]
          };
        }

      })));

      for (let idx = 0; idx <= entries.length - 1; idx++) {
        const forLoopVar = entries[idx];
        t.set(forLoopVar[0], CurriedLambda((tcref2, tinst2) => this.tyconRefEq(forLoopVar[1], tcref2) ? forLoopVar[2](tinst2) : new TType(1, [tcref2, tinst2])));
      }

      this.betterTypeDict1 = t;
      return t;
    } else {
      return matchValue;
    }
  }

  getBetterTypeDict2() {
    var $var10;
    const matchValue = this.betterTypeDict2;

    if (matchValue == null) {
      const entries = this.betterEntries;
      const t = create(null, fromEqualityComparer(($var10 = this, {
        GetHashCode(x) {
          return (obj => hash(obj))(x) | 0;
        },

        Equals(x, y) {
          return ((e1, e2) => equals(e1, e2))(x, y);
        },

        [_Symbol.reflection]() {
          return {
            interfaces: ["System.Collections.Generic.IEqualityComparer"]
          };
        }

      })));

      for (let idx = 0; idx <= entries.length - 1; idx++) {
        const forLoopVar = entries[idx];

        if (forLoopVar[1].CanDeref) {
          t.set(forLoopVar[1].Stamp, forLoopVar[2]);
        }
      }

      this.betterTypeDict2 = t;
      return t;
    } else {
      return matchValue;
    }
  }

  decompileTy(tcref, tinst) {
    if (this["compilingFslib@160"]) {
      return new TType(1, [tcref, tinst]);
    } else {
      const dict = this.getDecompileTypeDict();
      const patternInput = tryGetValue(dict, tcref.Stamp, null);

      if (patternInput[0]) {
        return patternInput[1](tinst);
      } else {
        return new TType(1, [tcref, tinst]);
      }
    }
  }

  improveTy(tcref, tinst) {
    if (this["compilingFslib@160"]) {
      const dict = this.getBetterTypeDict1();
      const patternInput = tryGetValue(dict, tcref.LogicalName, null);

      if (patternInput[0]) {
        return patternInput[1](tcref, tinst);
      } else {
        return new TType(1, [tcref, tinst]);
      }
    } else {
      const dict_1 = this.getBetterTypeDict2();
      const patternInput_1 = tryGetValue(dict_1, tcref.Stamp, null);

      if (patternInput_1[0]) {
        return patternInput_1[1](tinst);
      } else {
        return new TType(1, [tcref, tinst]);
      }
    }
  }

}
setType("Microsoft.FSharp.Compiler.TcGlobals.TcGlobals", TcGlobals);