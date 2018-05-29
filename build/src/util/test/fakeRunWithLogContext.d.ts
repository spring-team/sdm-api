import { RemoteRepoRef, RepoId } from "@atomist/automation-client/operations/common/RepoId";
import { RunWithLogContext } from "../../common/delivery/goals/support/reportGoalError";
import { StatusForExecuteGoal } from "../../typings/types";
/**
 * Useful testing support
 * @param {RemoteRepoRef} id
 * @return {RunWithLogContext}
 */
export declare function fakeRunWithLogContext(id: RemoteRepoRef): RunWithLogContext;
export declare function fakeStatus(id: RepoId): StatusForExecuteGoal.Fragment;
