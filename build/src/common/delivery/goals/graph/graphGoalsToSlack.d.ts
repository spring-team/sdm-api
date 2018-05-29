import { GoalsSetListener } from "../../../listener/GoalsSetListener";
import { Goals } from "../Goals";
/**
 * Display a graph of the goals that have just been set to Slack
 * @param {GoalsSetListenerInvocation} gsi
 * @return {Promise<any>}
 * @constructor
 */
export declare const GraphGoalsToSlack: GoalsSetListener;
export declare function goalsToDot(goals: Goals): string;
