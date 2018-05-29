import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { InterpretLog } from "../../../../spi/log/InterpretedLog";
import { ProgressLog } from "../../../../spi/log/ProgressLog";
import { StatusForExecuteGoal } from "../../../../typings/types";
import { RepoContext } from "../../../context/SdmContext";
import { AddressChannels } from "../../../slack/addressChannels";
import { ExecuteGoalResult } from "../ExecuteGoalResult";
import { Goal } from "../Goal";
export declare type ExecuteGoalWithLog = (r: RunWithLogContext) => Promise<ExecuteGoalResult>;
export declare type PrepareForGoalExecution = (p: GitProject, r: RunWithLogContext) => Promise<ExecuteGoalResult>;
export interface RunWithLogContext extends RepoContext {
    status: StatusForExecuteGoal.Fragment;
    progressLog: ProgressLog;
}
/**
 * Report an error executing a goal and present a retry button
 * @return {Promise<void>}
 */
export declare function reportGoalError(parameters: {
    goal: Goal;
    implementationName: string;
    addressChannels: AddressChannels;
    progressLog: ProgressLog;
    id: RemoteRepoRef;
    logInterpreter: InterpretLog;
}, err: Error): Promise<void>;
export declare function CompositeGoalExecutor(...goalImplementations: ExecuteGoalWithLog[]): ExecuteGoalWithLog;
