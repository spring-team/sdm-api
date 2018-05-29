import { HandlerContext } from "@atomist/automation-client";
import { Action, SlackMessage } from "@atomist/slack-messages";
export declare function success(title: string, text: string, actions?: Action[]): SlackMessage;
export declare function warning(title: string, text: string, ctx: HandlerContext, actions?: Action[]): SlackMessage;
export declare function error(title: string, text: string, ctx: HandlerContext, actions?: Action[]): SlackMessage;
export declare function supportLink(ctx: HandlerContext): string;
