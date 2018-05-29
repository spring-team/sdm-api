import { HandleCommand, HandleEvent } from "@atomist/automation-client";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import { Target } from "../../common/delivery/deploy/deploy";
import { Goal } from "../../common/delivery/goals/Goal";
import { Goals } from "../../common/delivery/goals/Goals";
import { ExecuteGoalWithLog } from "../../common/delivery/goals/support/reportGoalError";
import { SdmGoalImplementationMapper } from "../../common/delivery/goals/support/SdmGoalImplementationMapper";
import { GoalSetter } from "../../common/listener/GoalSetter";
import { PushMapping } from "../../common/listener/PushMapping";
import { PushTest } from "../../common/listener/PushTest";
import { PushRule } from "../../common/listener/support/PushRule";
import { StaticPushMapping } from "../../common/listener/support/StaticPushMapping";
import { Builder } from "../../spi/build/Builder";
import { InterpretLog } from "../../spi/log/InterpretedLog";
import { FunctionalUnit } from "../FunctionalUnit";
import { SoftwareDeliveryMachine } from "../SoftwareDeliveryMachine";
import { SoftwareDeliveryMachineConfigurer } from "../SoftwareDeliveryMachineConfigurer";
import { SoftwareDeliveryMachineOptions } from "../SoftwareDeliveryMachineOptions";
import { ListenerRegistrationSupport } from "./ListenerRegistrationSupport";
/**
 * Abstract software delivery machine
 */
export declare class AbstractSoftwareDeliveryMachine extends ListenerRegistrationSupport implements SoftwareDeliveryMachine {
    readonly name: string;
    readonly options: SoftwareDeliveryMachineOptions;
    private generators;
    editors: Array<Maker<HandleCommand>>;
    supportingCommands: Array<Maker<HandleCommand>>;
    supportingEvents: Array<Maker<HandleEvent<any>>>;
    functionalUnits: FunctionalUnit[];
    goalSetters: GoalSetter[];
    private readonly disposalGoalSetters;
    private mightMutate;
    /**
     * Return the PushMapping that will be used on pushes.
     * Useful in testing goal setting.
     * @return {PushMapping<Goals>}
     */
    readonly pushMapping: PushMapping<Goals>;
    /**
     * Return if this SDM purely observes, rather than changes an org.
     * Note that this cannot be 100% reliable, as arbitrary event handlers
     * could be making commits, initiating deployments etc.
     * @return {boolean}
     */
    readonly observesOnly: boolean;
    readonly goalFulfillmentMapper: SdmGoalImplementationMapper;
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
    protected addVerifyImplementation(): this;
    addDisposalRules(...goalSetters: GoalSetter[]): this;
    private readonly onRepoCreation;
    private readonly onNewRepoWithCode;
    private readonly semanticDiffReactor;
    private readonly goalSetting;
    private readonly goalConsequences;
    private readonly artifactFinder;
    private readonly notifyOnDeploy;
    private readonly onVerifiedStatus;
    private readonly disposal;
    private readonly onBuildComplete;
    readonly showBuildLog: Maker<HandleCommand>;
    private readonly allFunctionalUnits;
    readonly eventHandlers: Array<Maker<HandleEvent<any>>>;
    readonly commandHandlers: Array<Maker<HandleCommand>>;
    addGenerators(...g: Array<Maker<HandleCommand>>): this;
    addEditors(...e: Array<Maker<HandleCommand>>): this;
    addSupportingCommands(...e: Array<Maker<HandleCommand>>): this;
    addSupportingEvents(...e: Array<Maker<HandleEvent<any>>>): this;
    addFunctionalUnits(...fus: FunctionalUnit[]): this;
    addBuildRules(...rules: Array<PushRule<Builder> | Array<PushRule<Builder>>>): this;
    addDeployRules(...rules: Array<StaticPushMapping<Target> | Array<StaticPushMapping<Target>>>): this;
    /**
     * Declare that a goal will become successful based on something outside.
     * For instance, ArtifactGoal succeeds because of an ImageLink event.
     * This tells the SDM that it does not need to run anything when this
     * goal becomes ready.
     * @param {Goal} goal
     * @param {string} sideEffectName
     * @param {PushTest} pushTest
     */
    knownSideEffect(goal: Goal, sideEffectName: string, pushTest?: PushTest): void;
    /**
     * Add the given capabilities from these configurers
     * @param {SoftwareDeliveryMachineConfigurer} configurers
     * @return {this}
     */
    addCapabilities(...configurers: SoftwareDeliveryMachineConfigurer[]): this;
    configure(configurer: SoftwareDeliveryMachineConfigurer): this;
    /**
     * Construct a new software delivery machine, with zero or
     * more goal setters.
     * @param {string} name
     * @param {SoftwareDeliveryMachineOptions} options
     */
    protected constructor(name: string, options: SoftwareDeliveryMachineOptions);
}
