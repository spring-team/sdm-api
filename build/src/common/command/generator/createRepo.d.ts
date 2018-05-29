import { HandleCommand } from "@atomist/automation-client";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import { SoftwareDeliveryMachine } from "../../../blueprint/SoftwareDeliveryMachine";
/**
 * Return a command handler that can create a repo using generators in this SDM
 * @param sdm
 * @return {HandleCommand<EmptyParameters>}
 */
export declare function createRepoHandler(sdm: SoftwareDeliveryMachine): Maker<HandleCommand>;
