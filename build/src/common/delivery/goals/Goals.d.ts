import { Goal } from "./Goal";
/**
 * Represents goals set in response to a push
 */
export declare class Goals {
    name: string;
    readonly goals: Goal[];
    constructor(name: string, ...goals: Goal[]);
}
export declare function isGoals(a: any): a is Goals;
