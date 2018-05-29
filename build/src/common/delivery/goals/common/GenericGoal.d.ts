import { Goal, GoalDefinition } from "../Goal";
/**
 * Generic goal. Used when creating use-case specific specific goals.
 */
export declare class GenericGoal extends Goal {
    constructor(params: Partial<GoalDefinition> & {
        uniqueName: string;
    }, description: string);
}
