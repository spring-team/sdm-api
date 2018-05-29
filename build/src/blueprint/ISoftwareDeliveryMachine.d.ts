import { HandleCommand, HandleEvent } from "@atomist/automation-client";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import { Goal } from "../common/delivery/goals/Goal";
import { Goals } from "../common/delivery/goals/Goals";
import { ExecuteGoalWithLog } from "../common/delivery/goals/support/reportGoalError";
import { GoalSetter } from "../common/listener/GoalSetter";
import { PushMapping } from "../common/listener/PushMapping";
import { PushTest } from "../common/listener/PushTest";
import { InterpretLog } from "../spi/log/InterpretedLog";
import { FunctionalUnit } from "./FunctionalUnit";
import { SoftwareDeliveryMachineConfigurer } from "./SoftwareDeliveryMachineConfigurer";
import { ListenerRegistrationSupport } from "./support/ListenerRegistrationSupport";
/**
 * Class instantiated to create a **Software Delivery Machine**.
 * Combines commands and delivery event handling using _goals_.
 *
 * Goals and goal "implementations" can be defined by users.
 * However, certain well known goals are built into the SoftwareDeliveryMachine
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
 * const sdm = new SoftwareDeliveryMachine(
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
export interface ISoftwareDeliveryMachine extends ListenerRegistrationSupport, FunctionalUnit {
    /**
     * Return the PushMapping that will be used on pushes.
     * Useful in testing goal setting.
     * @return {PushMapping<Goals>}
     */
    pushMapping: PushMapping<Goals>;
    /**
     * Return if this SDM purely observes, rather than changes an org.
     * Note that this cannot be 100% reliable, as arbitrary event handlers
     * could be making commits, initiating deployments etc.
     * @return {boolean}
     */
    observesOnly(): boolean;
    /**
     * Provide the implementation for a goal.
     * The SDM will run it as soon as the goal is ready (all preconditions are met).
     * If you provide a PushTest, then the SDM can assign different implementations
     * to the same goal based on the code in the project.
     * @param {string} implementationName
     * @param {Goal} goal
     * @param {ExecuteGoalWithLog} goalExecutor
     * @param options PushTest to narrow matching & InterpretLog that can handle
     * the log from the goalExecutor function
     * @return {this}
     */
    addGoalImplementation(implementationName: string, goal: Goal, goalExecutor: ExecuteGoalWithLog, options?: Partial<{
        pushTest: PushTest;
        logInterpreter: InterpretLog;
    }>): this;
    addDisposalRules(...goalSetters: GoalSetter[]): this;
    addGenerators(...g: Array<Maker<HandleCommand>>): this;
    addEditors(...e: Array<Maker<HandleCommand>>): this;
    addSupportingCommands(...e: Array<Maker<HandleCommand>>): this;
    addSupportingEvents(...e: Array<Maker<HandleEvent<any>>>): this;
    addFunctionalUnits(...fus: FunctionalUnit[]): this;
    /**
     * Declare that a goal will become successful based on something outside.
     * For instance, ArtifactGoal succeeds because of an ImageLink event.
     * This tells the SDM that it does not need to run anything when this
     * goal becomes ready.
     * @param {Goal} goal
     * @param {string} sideEffectName
     * @param {PushTest} pushTest
     */
    knownSideEffect(goal: Goal, sideEffectName: string, pushTest: PushTest): any;
    /**
     * Add the given capabilities from these configurers
     * @param {SoftwareDeliveryMachineConfigurer} configurers
     * @return {this}
     */
    addCapabilities(...configurers: SoftwareDeliveryMachineConfigurer[]): this;
    configure(configurer: SoftwareDeliveryMachineConfigurer): this;
}
