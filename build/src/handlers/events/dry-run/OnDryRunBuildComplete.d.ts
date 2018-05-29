import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { OnBuildCompleteForDryRun } from "../../../typings/types";
/**
 * React to to result of a dry run build to raise a PR or issue
 */
export declare class OnDryRunBuildComplete implements HandleEvent<OnBuildCompleteForDryRun.Subscription> {
    private readonly githubToken;
    handle(event: EventFired<OnBuildCompleteForDryRun.Subscription>, ctx: HandlerContext, params: this): Promise<HandlerResult>;
}
