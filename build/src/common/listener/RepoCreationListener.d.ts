import * as schema from "../../typings/types";
import { RepoListenerInvocation, SdmListener } from "./Listener";
/**
 * Superinterface for all event invocations concerning a repo.
 */
export interface RepoCreationListenerInvocation extends RepoListenerInvocation {
    repo: schema.OnRepoCreation.Repo;
}
/**
 * Respond to the creation of a new repo.
 * Note that it may not have code in it, so you may want to use
 * a PushListener! See SoftwareDeliveryMachine.addNewRepoWithCodeActions
 */
export declare type RepoCreationListener = SdmListener<RepoCreationListenerInvocation>;
