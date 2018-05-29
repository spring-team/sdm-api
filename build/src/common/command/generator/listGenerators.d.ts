import { HandleCommand } from "@atomist/automation-client";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import { SoftwareDeliveryMachine } from "../../../blueprint/SoftwareDeliveryMachine";
/**
 * Return a command handler that can list generators in the current SDM.
 * Will not identify generators in other projects.
 * @param {SoftwareDeliveryMachine} sdm
 * @return {HandleCommand<EmptyParameters>}
 */
export declare function listGeneratorsHandler(sdm: SoftwareDeliveryMachine): Maker<HandleCommand>;
