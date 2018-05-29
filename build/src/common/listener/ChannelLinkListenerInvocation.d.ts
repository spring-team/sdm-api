import { AddressChannels } from "../slack/addressChannels";
import { SdmListener } from "./Listener";
import { ProjectListenerInvocation } from "./ProjectListener";
/**
 * Listener invoked when a repo has been linked to a channel
 */
export interface ChannelLinkListenerInvocation extends ProjectListenerInvocation {
    newlyLinkedChannelName: string;
    /**
     * Convenient method to address the newly linked channel only.
     * The inherited addressChannels method will address all linked channels.
     */
    addressNewlyLinkedChannel: AddressChannels;
}
export declare type ChannelLinkListener = SdmListener<ChannelLinkListenerInvocation>;
