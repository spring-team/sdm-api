import { GoalSetter } from "../../common/listener/GoalSetter";
import { SoftwareDeliveryMachineOptions } from "../SoftwareDeliveryMachineOptions";
import { AbstractSoftwareDeliveryMachine } from "./AbstractSoftwareDeliveryMachine";
/**
 * Add default goals to AbstractSoftwareDeliveryMachine
 */
export declare class DefaultGoalsSoftwareDeliveryMachine extends AbstractSoftwareDeliveryMachine {
    /**
     * Construct a new software delivery machine, with zero or
     * more goal setters.
     * @param {string} name
     * @param {SoftwareDeliveryMachineOptions} opts
     * @param {GoalSetter} goalSetters tell me what to do on a push. Hint: start with "whenPushSatisfies(...)"
     */
    constructor(name: string, opts: SoftwareDeliveryMachineOptions, ...goalSetters: Array<GoalSetter | GoalSetter[]>);
}
