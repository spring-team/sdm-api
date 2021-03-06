"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createRepo_1 = require("../common/command/generator/createRepo");
const listGenerators_1 = require("../common/command/generator/listGenerators");
const SelfDescribe_1 = require("../handlers/commands/SelfDescribe");
const ConcreteSoftwareDeliveryMachine_1 = require("./support/ConcreteSoftwareDeliveryMachine");
/**
 * Create a **Software Delivery MachineConfiguration** with default predefined goals.
 * Combines commands and delivery event handling using _goals_.
 *
 * Goals and goal "implementations" can be defined by users.
 * However, certain well known goals are built into the DefaultSoftwareDeliveryMachine
 * for convenience, with their own associated listeners.
 *
 * Well known goal support is based around a delivery process spanning
 * common goals of fingerprinting, reacting to fingerprint diffs,
 * code review, build, deployment, endpoint verification and
 * promotion to a production environment.
 *
 * The most important element of a software delivery machine is setting
 * zero or more _push rules_ in the constructor.
 * This is normally done using the internal DSL as follows:
 *
 * ```
 * const sdm = createSoftwareDeliveryMachine(
 *    "MyMachine",
 *    options,
 *    whenPushSatisfies(IsMaven, HasSpringBootApplicationClass, not(MaterialChangeToJavaRepo))
 *      .itMeans("No material change to Java")
 *      .setGoals(NoGoals),
 *    whenPushSatisfies(ToDefaultBranch, IsMaven, HasSpringBootApplicationClass, HasCloudFoundryManifest)
 *      .itMeans("Spring Boot service to deploy")
 *      .setGoals(HttpServiceGoals));
 * ```
 *
 * Uses the builder pattern to allow fluent construction. For example:
 *
 * ```
 * softwareDeliveryMachine
 *    .addPushReactions(async pu => ...)
 *    .addNewIssueListeners(async i => ...)
 *    .add...;
 * ```
 */
function createSoftwareDeliveryMachine(config, ...goalSetters) {
    const machine = new ConcreteSoftwareDeliveryMachine_1.ConcreteSoftwareDeliveryMachine(config.name, config.options, config.configuration, goalSetters);
    return machine.addSupportingCommands(SelfDescribe_1.selfDescribeHandler(machine), listGenerators_1.listGeneratorsHandler(machine), createRepo_1.createRepoHandler(machine));
}
exports.createSoftwareDeliveryMachine = createSoftwareDeliveryMachine;
//# sourceMappingURL=machineFactory.js.map