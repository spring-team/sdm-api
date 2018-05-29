import { Goal } from "../../common/delivery/goals/Goal";
import { Goals } from "../../common/delivery/goals/Goals";
import { ExecuteGoalWithLog } from "../../common/delivery/goals/support/reportGoalError";
import { SdmGoalImplementationMapper } from "../../common/delivery/goals/support/SdmGoalImplementationMapper";
import { GoalSetter } from "../../common/listener/GoalSetter";
import { PushMapping } from "../../common/listener/PushMapping";
import { PushTest } from "../../common/listener/PushTest";
import { InterpretLog } from "../../spi/log/InterpretedLog";
import { SoftwareDeliveryMachineOptions } from "../SoftwareDeliveryMachineOptions";
import { GoalDrivenMachine } from "../GoalDrivenMachine";
/**
 * Goal driven machine
 */
export declare abstract class AbstractGoalDrivenMachine implements GoalDrivenMachine {
    readonly name: string;
    readonly options: SoftwareDeliveryMachineOptions;
    goalSetters: GoalSetter[];
    /**
     * Return the PushMapping that will be used on pushes.
     * Useful in testing goal setting.
     * @return {PushMapping<Goals>}
     */
    readonly pushMapping: PushMapping<Goals>;
    readonly abstract observesOnly: boolean;
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
     * Construct a new software delivery machine, with zero or
     * more goal setters.
     * @param {string} name
     * @param {SoftwareDeliveryMachineOptions} options
     */
    protected constructor(name: string, options: SoftwareDeliveryMachineOptions);
}
