import { HandlerContext } from "@atomist/automation-client";
import { ProgressLog } from "../../spi/log/ProgressLog";
import { HasChannels } from "../slack/addressChannels";
/**
 * Stream the ProgressLog output to any Slack channels associated
 * with the current model element (such a repo)
 * @param name name for the log. Should relate to the activity we're logging
 * @param {HasChannels} hasChannels
 * @param {HandlerContext} ctx
 * @return {ProgressLog}
 */
export declare function slackProgressLog(name: string, hasChannels: HasChannels, ctx: HandlerContext): ProgressLog;
