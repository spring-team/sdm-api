import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { Goals } from "../../../../common/delivery/goals/Goals";
import { ExecuteGoalWithLog } from "../../../../common/delivery/goals/support/reportGoalError";
import { SdmGoalImplementationMapper } from "../../../../common/delivery/goals/support/SdmGoalImplementationMapper";
import { GoalSetter } from "../../../../common/listener/GoalSetter";
import { GoalsSetListener } from "../../../../common/listener/GoalsSetListener";
import { ProjectLoader } from "../../../../common/repo/ProjectLoader";
import { AddressChannels } from "../../../../common/slack/addressChannels";
import { SdmGoal } from "../../../../ingesters/sdmGoalIngester";
import { OnPushToAnyBranch, PushFields } from "../../../../typings/types";
import { CredentialsResolver } from "../../../common/CredentialsResolver";
/**
 * Set up goalSet on a push (e.g. for delivery).
 */
export declare class SetGoalsOnPush implements HandleEvent<OnPushToAnyBranch.Subscription> {
    private readonly projectLoader;
    private readonly goalSetters;
    readonly goalsListeners: GoalsSetListener[];
    private readonly implementationMapping;
    private readonly credentialsFactory;
    /**
     * Configure goal setting
     * @param projectLoader use to load projects
     * @param goalSetters first GoalSetter that returns goalSet wins
     * @param goalsListeners listener to goals set
     * @param implementationMapping
     * @param credentialsFactory credentials factory
     */
    constructor(projectLoader: ProjectLoader, goalSetters: GoalSetter[], goalsListeners: GoalsSetListener[], implementationMapping: SdmGoalImplementationMapper, credentialsFactory: CredentialsResolver);
    handle(event: EventFired<OnPushToAnyBranch.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
export interface ChooseAndSetGoalsRules {
    projectLoader: ProjectLoader;
    goalsListeners: GoalsSetListener[];
    goalSetters: GoalSetter[];
    implementationMapping: SdmGoalImplementationMapper;
}
export declare function chooseAndSetGoals(rules: ChooseAndSetGoalsRules, parameters: {
    context: HandlerContext;
    credentials: ProjectOperationCredentials;
    push: PushFields.Fragment;
}): Promise<Goals>;
export declare function determineGoals(rules: {
    projectLoader: ProjectLoader;
    goalSetters: GoalSetter[];
    implementationMapping: SdmGoalImplementationMapper;
}, circumstances: {
    credentials: ProjectOperationCredentials;
    id: RemoteRepoRef;
    context: HandlerContext;
    push: PushFields.Fragment;
    addressChannels: AddressChannels;
    goalSetId: string;
}): Promise<{
    determinedGoals: Goals | undefined;
    goalsToSave: SdmGoal[];
}>;
export declare const executeImmaterial: ExecuteGoalWithLog;
export declare class ApplyGoalsParameters {
    githubToken: string;
    owner: string;
    repo: string;
    providerId: string;
    sha?: string;
}
