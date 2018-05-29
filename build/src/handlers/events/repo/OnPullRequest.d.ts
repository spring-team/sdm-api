import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { PullRequestListener } from "../../../common/listener/PullRequestListener";
import { ProjectLoader } from "../../../common/repo/ProjectLoader";
import * as schema from "../../../typings/types";
import { CredentialsResolver } from "../../common/CredentialsResolver";
/**
 * A pull request has been raised
 */
export declare class OnPullRequest implements HandleEvent<schema.OnPullRequest.Subscription> {
    private readonly projectLoader;
    private readonly listeners;
    private readonly credentialsFactory;
    constructor(projectLoader: ProjectLoader, listeners: PullRequestListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnPullRequest.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
