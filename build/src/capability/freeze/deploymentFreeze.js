"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const automation_client_1 = require("@atomist/automation-client");
const onCommand_1 = require("@atomist/automation-client/onCommand");
const allOf_1 = require("../../blueprint/dsl/allOf");
const EmptyParameters_1 = require("../../common/command/EmptyParameters");
const MessageGoal_1 = require("../../common/delivery/goals/common/MessageGoal");
const executeSendMessageToSlack_1 = require("../../common/slack/executeSendMessageToSlack");
/**
 * Goal to explain a deployment freeze to the user.
 * Available after adding deploymentFreeze capability.
 * @type {MessageGoal}
 */
exports.ExplainDeploymentFreezeGoal = new MessageGoal_1.MessageGoal("deploymentFreeze");
/**
 * Capability to add to an SDM to add deployment freeze.
 * Makes the ExplainDeploymentFreezeGoal available.
 * @param {DeploymentStatusManager} dsm
 * @return {ExtensionPack}
 */
function deploymentFreeze(dsm) {
    return {
        name: "deploymentFreeze",
        configure: sdm => {
            sdm.addSupportingCommands(() => freezeCommand(dsm), () => unfreezeCommand(dsm));
            sdm.addGoalImplementation("ExplainDeploymentFreezeGoal", exports.ExplainDeploymentFreezeGoal, executeSendMessageToSlack_1.executeSendMessageToSlack("*Attention*: Not deploying as deployment is currently frozen :no_entry:"));
        },
    };
}
exports.deploymentFreeze = deploymentFreeze;
/**
 * Return a push test working against the current DeploymentStatusManager.
 * Use in SDMs that have enabled deploymentFreeze capability.
 * @param {DeploymentStatusManager} dsm
 * @return {PushTest}
 */
function isDeploymentFrozen(dsm) {
    return allOf_1.allOf((pu) => __awaiter(this, void 0, void 0, function* () {
        automation_client_1.logger.info(`Delivery is frozen for '${pu.push.after.message}' = ${dsm.isFrozen}`);
        return dsm.isFrozen;
    }));
}
exports.isDeploymentFrozen = isDeploymentFrozen;
function freezeCommand(dsm) {
    return onCommand_1.commandHandlerFrom((ctx) => __awaiter(this, void 0, void 0, function* () {
        dsm.setFrozen(true);
        return ctx.messageClient.respond("Deployment is frozen for all services :no_entry:");
    }), EmptyParameters_1.EmptyParameters, "freeze", "Freeze deployment", "freeze deployment");
}
function unfreezeCommand(freezeStore) {
    return onCommand_1.commandHandlerFrom((ctx) => __awaiter(this, void 0, void 0, function* () {
        freezeStore.setFrozen(false);
        return ctx.messageClient.respond("Deployment is re-enabled for all services :woman-running:");
    }), EmptyParameters_1.EmptyParameters, "unfreeze", "Unfreeze deployment", "unfreeze deployment");
}
//# sourceMappingURL=deploymentFreeze.js.map