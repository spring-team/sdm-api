import { IsolatedGoalLauncher } from "../../../../handlers/events/delivery/goals/launchGoal";
import { SdmGoal } from "../../../../ingesters/sdmGoalIngester";
import { InterpretLog } from "../../../../spi/log/InterpretedLog";
import { RepoContext } from "../../../context/SdmContext";
import { PushListenerInvocation } from "../../../listener/PushListener";
import { PushTest } from "../../../listener/PushTest";
import { Goal } from "../Goal";
import { ExecuteGoalWithLog } from "./reportGoalError";
export declare type GoalFulfillment = GoalImplementation | GoalSideEffect;
export interface GoalImplementation {
    implementationName: string;
    goal: Goal;
    goalExecutor: ExecuteGoalWithLog;
    pushTest: PushTest;
    logInterpreter: InterpretLog;
}
export declare function isGoalImplementation(f: GoalFulfillment): f is GoalImplementation;
export interface GoalSideEffect {
    sideEffectName: string;
    goal: Goal;
    pushTest: PushTest;
}
export declare function isSideEffect(f: GoalFulfillment): f is GoalSideEffect;
/**
 * Callback to allow changes to the goal before it gets fullfilled.
 *
 * This is useful to add goal specific information to the data field.
 */
export interface GoalFullfillmentCallback {
    goal: Goal;
    callback: (goal: SdmGoal, context: RepoContext) => Promise<SdmGoal>;
}
export declare class SdmGoalImplementationMapper {
    private readonly goalLauncher;
    private readonly implementations;
    private readonly sideEffects;
    private readonly callbacks;
    constructor(goalLauncher: IsolatedGoalLauncher);
    findImplementationBySdmGoal(goal: SdmGoal): GoalImplementation;
    addImplementation(implementation: GoalImplementation): this;
    addSideEffect(sideEffect: GoalSideEffect): this;
    addFullfillmentCallback(callback: GoalFullfillmentCallback): this;
    findFulfillmentByPush(goal: Goal, inv: PushListenerInvocation): Promise<GoalFulfillment | undefined>;
    findFullfillmentCallbackForGoal(g: SdmGoal): GoalFullfillmentCallback[];
    getIsolatedGoalLauncher(): IsolatedGoalLauncher;
}
