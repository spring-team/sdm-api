import { CredentialsResolver } from "../../../../../handlers/common/CredentialsResolver";
import { SdmGoalState } from "../../../../../ingesters/sdmGoalIngester";
import { StatusState } from "../../../../../typings/types";
import { GoalCompletionListener, GoalsSetListener } from "../../../../listener/GoalsSetListener";
export declare function createPendingGitHubStatusOnGoalSet(credentialsFactory: CredentialsResolver): GoalsSetListener;
export declare function SetGitHubStatusOnGoalCompletion(): GoalCompletionListener;
export declare function sdmGoalStateToGitHubStatusState(goalState: SdmGoalState): StatusState;
