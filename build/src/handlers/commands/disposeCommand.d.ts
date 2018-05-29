import { HandleCommand } from "@atomist/automation-client";
import { ChooseAndSetGoalsRules } from "../events/delivery/goals/SetGoalsOnPush";
export declare class DisposeParameters {
    githubToken: string;
    owner: string;
    repo: string;
    providerId: string;
    areYouSure: string;
}
export declare function disposeCommand(rules: ChooseAndSetGoalsRules): HandleCommand;
