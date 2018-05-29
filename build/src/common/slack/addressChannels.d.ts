import { HandlerContext } from "@atomist/automation-client";
import { Destination, MessageOptions } from "@atomist/automation-client/spi/message/MessageClient";
import { SlackMessage } from "@atomist/slack-messages";
/**
 * Allows us to address channels for a particular repo or any GraphQL
 * type with channels
 */
export declare type AddressChannels = (msg: string | SlackMessage, opts?: MessageOptions) => Promise<any>;
/**
 * Throw away contents. Use when we know that there can be no linked channels.
 * @constructor
 */
export declare const AddressNoChannels: AddressChannels;
/**
 * Interface for anything, like a repo, that has associated chat channel information
 */
export interface HasChannels {
    channels?: Array<{
        name?: string;
        id?: string;
        team?: {
            id?: string;
        };
    }>;
}
/**
 * Address the chat channels associated with this object.
 * Typically used to address channels associated with a repo.
 * @param {HasChannels} hasChannels
 * @param {HandlerContext} ctx
 * @return {AddressChannels}
 */
export declare function addressChannelsFor(hasChannels: HasChannels, ctx: HandlerContext): AddressChannels;
export declare function messageDestinationsFor(hasChannels: HasChannels, ctx?: HandlerContext): Destination[];
export declare function addressDestinations(ctx: HandlerContext, ...destinations: Destination[]): AddressChannels;
