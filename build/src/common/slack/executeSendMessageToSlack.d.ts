import { SlackMessage } from "@atomist/slack-messages";
import { ExecuteGoalWithLog } from "../delivery/goals/support/reportGoalError";
/***
 * Execute a goal by sending a message to the linked Slack channels
 * @param {string | SlackMessage} msg
 * @return {ExecuteGoalWithLog}
 */
export declare function executeSendMessageToSlack(msg: string | SlackMessage): ExecuteGoalWithLog;
