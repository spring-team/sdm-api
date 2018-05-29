import { HandleCommand } from "@atomist/automation-client";
import { SlackMessage } from "@atomist/slack-messages";
import { SetDeployEnablementParameters } from "./SetDeployEnablement";
export declare function reportDeployEnablement(params: SetDeployEnablementParameters, enabled: boolean): SlackMessage;
export declare function isDeployEnabledCommand(): HandleCommand<SetDeployEnablementParameters>;
