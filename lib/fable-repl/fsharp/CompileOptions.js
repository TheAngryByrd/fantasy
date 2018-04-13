import { UnionOptimizationInfos, OptimizeImplFile, OptimizationSettings, IncrementalOptimizationEnv, BindCcu } from "./Optimizer";
import { getValue } from "../fable-core/Option";
import { mapFold, fold } from "../fable-core/Seq";
import { TransformImplFile } from "./autobox";
import { DetupleImplFile } from "./DetupleArgs";
import { MakeTLRDecisions } from "./InnerLambdasToTopLevelFuncs";
import { LowerImplFile } from "./LowerCallsAndSeqs";
import { SignatureHidingInfo } from "./TastOps";
import { unzip, ofArray } from "../fable-core/List";
import { TypedAssemblyAfterOptimization } from "./tast";
export function AddExternalCcuToOpimizationEnv(tcGlobals, optEnv, ccuinfo) {
  const matchValue = ccuinfo.FSharpOptimizationData.value;

  if (matchValue != null) {
    return BindCcu(ccuinfo.FSharpViewOfMetadata, getValue(matchValue), optEnv, tcGlobals);
  } else {
    return optEnv;
  }
}
export function GetInitialOptimizationEnv(tcImports, tcGlobals) {
  const ccuinfos = tcImports.GetImportedAssemblies();
  const optEnv = IncrementalOptimizationEnv.Empty;
  const optEnv_2 = fold(function (optEnv_1, ccuinfo) {
    return AddExternalCcuToOpimizationEnv(tcGlobals, optEnv_1, ccuinfo);
  }, optEnv, ccuinfos);
  return optEnv_2;
}
export function ApplyAllOptimizations(tcConfig, tcGlobals, tcVal, outfile, importMap, isIncrementalFragment, optEnv, ccu, implFiles) {
  outfile;
  const optSettings = tcConfig.optSettings;
  const optSettings_1 = new OptimizationSettings(tcConfig.doTLR, optSettings.jitOptUser, optSettings.localOptUser, optSettings.crossModuleOptUser, optSettings.bigTargetSize, optSettings.veryBigExprSize, optSettings.lambdaInlineThreshold, optSettings.reportingPhase, optSettings.reportNoNeedToTailcall, optSettings.reportFunctionSizes, optSettings.reportHasEffect, optSettings.reportTotalSizes);
  const optSettings_2 = new OptimizationSettings(optSettings_1.abstractBigTargets, optSettings_1.jitOptUser, optSettings_1.localOptUser, optSettings_1.crossModuleOptUser, optSettings_1.bigTargetSize, optSettings_1.veryBigExprSize, optSettings_1.lambdaInlineThreshold, true, optSettings_1.reportNoNeedToTailcall, optSettings_1.reportFunctionSizes, optSettings_1.reportHasEffect, optSettings_1.reportTotalSizes);
  const patternInput_5 = mapFold(function (tupledArg, implFile) {
    const patternInput = OptimizeImplFile(optSettings_2, ccu, tcGlobals, tcVal, importMap, tupledArg[0], isIncrementalFragment, tcConfig.emitTailcalls, tupledArg[3], implFile);
    const optEnvFirstLoop = patternInput[0][0];
    const implFileOptData = patternInput[0][2];
    const implFile_1 = patternInput[0][1];
    const hidden = patternInput[0][3];
    const implFile_2 = TransformImplFile(tcGlobals, importMap, implFile_1);
    const optSettings_3 = new OptimizationSettings(false, optSettings_2.jitOptUser, optSettings_2.localOptUser, optSettings_2.crossModuleOptUser, optSettings_2.bigTargetSize, optSettings_2.veryBigExprSize, optSettings_2.lambdaInlineThreshold, false, optSettings_2.reportNoNeedToTailcall, optSettings_2.reportFunctionSizes, optSettings_2.reportHasEffect, optSettings_2.reportTotalSizes);
    let patternInput_2;

    if (tcConfig.extraOptimizationIterations > 0) {
      const patternInput_1 = OptimizeImplFile(optSettings_3, ccu, tcGlobals, tcVal, importMap, tupledArg[1], isIncrementalFragment, tcConfig.emitTailcalls, hidden, implFile_2);
      const optEnvExtraLoop = patternInput_1[0][0];
      const implFile_3 = patternInput_1[0][1];
      patternInput_2 = [implFile_3, optEnvExtraLoop];
    } else {
      patternInput_2 = [implFile_2, tupledArg[1]];
    }

    let implFile_5;

    if (tcConfig.doDetuple) {
      const implFile_4 = function (arg20_) {
        return DetupleImplFile(ccu, tcGlobals, arg20_);
      }(patternInput_2[0]);

      implFile_5 = implFile_4;
    } else {
      implFile_5 = patternInput_2[0];
    }

    const implFile_6 = tcConfig.doTLR ? function (arg20__1) {
      return MakeTLRDecisions(ccu, tcGlobals, arg20__1);
    }(implFile_5) : implFile_5;
    const implFile_7 = LowerImplFile(tcGlobals, implFile_6);
    let patternInput_4;

    if (tcConfig.doFinalSimplify) {
      const patternInput_3 = OptimizeImplFile(optSettings_3, ccu, tcGlobals, tcVal, importMap, tupledArg[2], isIncrementalFragment, tcConfig.emitTailcalls, hidden, implFile_7);
      const optEnvFinalSimplify = patternInput_3[0][0];
      const implFile_8 = patternInput_3[0][1];
      patternInput_4 = [implFile_8, optEnvFinalSimplify];
    } else {
      patternInput_4 = [implFile_7, tupledArg[2]];
    }

    return [[[patternInput_4[0], patternInput[1]], implFileOptData], [optEnvFirstLoop, patternInput_2[1], patternInput_4[1], hidden]];
  }, [optEnv, optEnv, optEnv, SignatureHidingInfo.Empty], implFiles, ofArray);
  const optEnvFirstLoop_1 = patternInput_5[1][0];
  const patternInput_6 = unzip(patternInput_5[0]);
  const assemblyOptData = UnionOptimizationInfos(patternInput_6[1]);
  const tassembly = new TypedAssemblyAfterOptimization(0, patternInput_6[0]);
  return [tassembly, assemblyOptData, optEnvFirstLoop_1];
}