import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import * as schema from "../../typings/types";
import { ListenerInvocation, SdmListener } from "./Listener";
export interface UserJoiningChannelListenerInvocation extends ListenerInvocation {
    joinEvent: schema.OnUserJoiningChannel.UserJoinedChannel;
    /**
     * Any linked repo refs
     */
    repos: RemoteRepoRef[];
}
/**
 * Respond to a user joining a channel
 */
export declare type UserJoiningChannelListener = SdmListener<UserJoiningChannelListenerInvocation>;
