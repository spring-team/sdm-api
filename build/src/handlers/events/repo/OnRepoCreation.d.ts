import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { RepoCreationListener } from "../../../common/listener/RepoCreationListener";
import * as schema from "../../../typings/types";
import { CredentialsResolver } from "../../common/CredentialsResolver";
/**
 * A new repo has been created. We don't know if it has code.
 */
export declare class OnRepoCreation implements HandleEvent<schema.OnRepoCreation.Subscription> {
    private readonly credentialsFactory;
    private readonly newRepoActions;
    constructor(newRepoActions: RepoCreationListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnRepoCreation.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
