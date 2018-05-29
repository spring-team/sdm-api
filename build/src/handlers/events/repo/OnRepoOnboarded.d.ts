import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { ProjectListener } from "../../../common/listener/ProjectListener";
import * as schema from "../../../typings/types";
import { CredentialsResolver } from "../../common/CredentialsResolver";
/**
 * A repo has been onboarded
 */
export declare class OnRepoOnboarded implements HandleEvent<schema.OnRepoOnboarded.Subscription> {
    private readonly actions;
    private readonly credentialsFactory;
    constructor(actions: ProjectListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnRepoOnboarded.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
