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
const string_1 = require("@atomist/automation-client/internal/util/string");
const _ = require("lodash");
const launchGoal_1 = require("../../handlers/events/delivery/goals/launchGoal");
const sdmOptions_1 = require("../sdmOptions");
function configureSdm(machineMaker, options = {}) {
    return (config) => __awaiter(this, void 0, void 0, function* () {
        const sdmOptions = Object.assign({}, sdmOptions_1.softwareDeliveryMachineOptions(config), (options.sdmOptions ? options.sdmOptions : {}));
        const machine = machineMaker(sdmOptions, config);
        const forked = process.env.ATOMIST_ISOLATED_GOAL === "true";
        if (forked) {
            config.listeners.push(new launchGoal_1.GoalAutomationEventListener(machine.goalFulfillmentMapper, machine.options.projectLoader, machine.options.logFactory));
            config.name = `${config.name}-${process.env.ATOMIST_GOAL_ID || string_1.guid()}`;
            // force ephemeral policy and no handlers or ingesters
            config.policy = "ephemeral";
            config.commands = [];
            config.events = [];
            config.ingesters = [];
            // Disable app events for forked clients
            config.applicationEvents.enabled = false;
        }
        else {
            const missingValues = [];
            (options.requiredConfigurationValues || []).forEach(v => {
                if (!_.get(config, v)) {
                    missingValues.push(v);
                }
            });
            if (missingValues.length > 0) {
                throw new Error(`Missing configuration values. Please add the following values to your client configuration: '${missingValues.join(", ")}'`);
            }
            if (!config.commands) {
                config.commands = [];
            }
            config.commands.push(...machine.commandHandlers);
            if (!config.events) {
                config.events = [];
            }
            config.events.push(...machine.eventHandlers);
        }
        return config;
    });
}
exports.configureSdm = configureSdm;
//# sourceMappingURL=configureSdm.js.map