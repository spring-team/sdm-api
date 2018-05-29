import { HandleCommand, HandlerResult } from "@atomist/automation-client";
import { HandlerContext } from "@atomist/automation-client/Handlers";
export declare class SetDeployEnablementParameters {
    owner: string;
    repo: string;
    providerId: string;
}
/**
 * Command to set deploy enablement on the currently mapped repo
 * @param {boolean} enable
 * @return {(ctx: HandlerContext, params: SetDeployEnablementParameters) => Promise<HandlerResult>}
 */
export declare function setDeployEnablement(enable: boolean): (ctx: HandlerContext, params: SetDeployEnablementParameters) => Promise<HandlerResult>;
export declare function enableDeploy(): HandleCommand<SetDeployEnablementParameters>;
export declare function disableDeploy(): HandleCommand<SetDeployEnablementParameters>;
