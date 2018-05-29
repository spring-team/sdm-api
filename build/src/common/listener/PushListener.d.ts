import { OnPushToAnyBranch } from "../../typings/types";
import { SdmListener } from "./Listener";
import { ProjectListenerInvocation } from "./ProjectListener";
/**
 * Invocation for an event relating to a push on a project.
 * Many event listeners listen to this type of event.
 */
export interface PushListenerInvocation extends ProjectListenerInvocation {
    /**
     * Information about the push, including repo and commit
     */
    readonly push: OnPushToAnyBranch.Push;
}
export declare type PushListener = SdmListener<PushListenerInvocation>;
