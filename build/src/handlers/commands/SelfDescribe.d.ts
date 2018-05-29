import { HandleCommand } from "@atomist/automation-client";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import { SoftwareDeliveryMachine } from "../../blueprint/SoftwareDeliveryMachine";
export declare const SelfDescribeCommandName = "SelfDescribe";
/**
 * Return a command handler that can describe the present software delivery machine
 * @param {SoftwareDeliveryMachine} sdm
 * @return {HandleCommand<EmptyParameters>}
 */
export declare function selfDescribeHandler(sdm: SoftwareDeliveryMachine): Maker<HandleCommand>;
