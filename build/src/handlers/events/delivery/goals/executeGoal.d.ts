import { HandlerContext, HandlerResult } from "@atomist/automation-client";
import { ExecuteGoalResult } from "../../../../common/delivery/goals/ExecuteGoalResult";
import { Goal } from "../../../../common/delivery/goals/Goal";
import { ExecuteGoalWithLog, RunWithLogContext } from "../../../../common/delivery/goals/support/reportGoalError";
import { ProjectLoader } from "../../../../common/repo/ProjectLoader";
import { SdmGoal } from "../../../../ingesters/sdmGoalIngester";
import { InterpretLog } from "../../../../spi/log/InterpretedLog";
/**
 * Central function to execute a goal with progress logging
 * @param {{projectLoader: ProjectLoader}} rules
 * @param {ExecuteGoalWithLog} execute
 * @param {RunWithLogContext} rwlc
 * @param {SdmGoal} sdmGoal
 * @param {Goal} goal
 * @param {InterpretLog} logInterpreter
 * @return {Promise<ExecuteGoalResult>}
 */
export declare function executeGoal(rules: {
    projectLoader: ProjectLoader;
}, execute: ExecuteGoalWithLog, rwlc: RunWithLogContext, sdmGoal: SdmGoal, goal: Goal, logInterpreter: InterpretLog): Promise<ExecuteGoalResult>;
export declare function executeHook(rules: {
    projectLoader: ProjectLoader;
}, rwlc: RunWithLogContext, sdmGoal: SdmGoal, stage: "post" | "pre"): Promise<HandlerResult>;
export declare function markStatus(parameters: {
    ctx: HandlerContext;
    sdmGoal: SdmGoal;
    goal: Goal;
    result: ExecuteGoalResult;
    error?: Error;
    progressLogUrl: string;
}): Promise<any>;
