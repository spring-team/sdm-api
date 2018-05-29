import { HandlerContext } from "@atomist/automation-client";
import { Destination } from "@atomist/automation-client/spi/message/MessageClient";
/**
 * Safely mutate the given HandlerContext so that it can respond even when used in
 * an EventHandler
 * @param ctx context to wrap
 * @param destinations
 * @return {HandlerContext}
 */
export declare function teachToRespondInEventHandler(ctx: HandlerContext, ...destinations: Destination[]): HandlerContext;
