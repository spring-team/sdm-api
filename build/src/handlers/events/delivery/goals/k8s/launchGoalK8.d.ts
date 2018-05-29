import { HandlerContext, HandlerResult } from "@atomist/automation-client";
import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { SdmGoal } from "../../../../../ingesters/sdmGoalIngester";
import { ProgressLog } from "../../../../../spi/log/ProgressLog";
import { OnAnyRequestedSdmGoal } from "../../../../../typings/types";
/**
 * Launch a goal as a kubernetes job
 * @param {OnAnyRequestedSdmGoal.SdmGoal} goal
 * @param {HandlerContext} ctx
 * @param {ProgressLog} progressLog
 * @returns {Promise<HandlerResult>}
 * @constructor
 */
export declare const KubernetesIsolatedGoalLauncher: (goal: OnAnyRequestedSdmGoal.SdmGoal, ctx: HandlerContext, progressLog: ProgressLog) => Promise<HandlerResult>;
export interface KubernetesOptions {
    name: string;
    environment: string;
    ns?: string;
    imagePullSecret?: string;
    port?: number;
    path?: string;
    host?: string;
    protocol?: string;
    replicas?: number;
}
/**
 * Sets kubernetes deployment specific data to an SdmGoal
 * @param {SdmGoal} goal
 * @param {KubernetesOptions} options
 * @param {GitProject} p
 * @returns {Promise<SdmGoal>}
 */
export declare function createKubernetesData(goal: SdmGoal, options: KubernetesOptions, p: GitProject): Promise<SdmGoal>;
