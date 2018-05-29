import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { Goal } from "../../../../common/delivery/goals/Goal";
import { AddressChannels } from "../../../../common/slack/addressChannels";
import { LogInterpretation } from "../../../../spi/log/InterpretedLog";
import { OnBuildComplete } from "../../../../typings/types";
/**
 * Set build status on complete build
 */
export declare class SetGoalOnBuildComplete implements HandleEvent<OnBuildComplete.Subscription> {
    private readonly buildGoals;
    private readonly logInterpretation;
    constructor(buildGoals: Goal[], logInterpretation?: LogInterpretation);
    handle(event: EventFired<OnBuildComplete.Subscription>, ctx: HandlerContext, params: this): Promise<HandlerResult>;
}
export declare function displayBuildLogFailure(id: RemoteRepoRef, build: {
    buildUrl?: string;
    status?: string;
}, addressChannels: AddressChannels, logInterpretation: LogInterpretation): Promise<any>;
