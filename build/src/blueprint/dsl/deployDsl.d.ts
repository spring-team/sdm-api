import { DeployerInfo, Target } from "../../common/delivery/deploy/deploy";
import { Goal } from "../../common/delivery/goals/Goal";
import { PushTest } from "../../common/listener/PushTest";
import { PushRule } from "../../common/listener/support/PushRule";
import { StaticPushMapping } from "../../common/listener/support/StaticPushMapping";
export declare class DeployPushRule extends PushRule<Target> {
    constructor(guard1: PushTest, guards: PushTest[], reason?: string);
    deployTo(deployGoal: Goal, endpointGoal: Goal, undeployGoal: Goal): {
        using(t: DeployerInfo<any>): StaticPushMapping<Target<any>>;
    };
}
export declare function when(guard1: PushTest, ...guards: PushTest[]): DeployPushRule;
