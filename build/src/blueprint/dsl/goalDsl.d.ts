import { Goals } from "../../common/delivery/goals/Goals";
import { PushListenerInvocation } from "../../common/listener/PushListener";
import { PushTest } from "../../common/listener/PushTest";
import { PredicateMappingTerm } from "../../common/listener/support/PredicateMappingTerm";
import { PushRule } from "../../common/listener/support/PushRule";
import { GoalComponent } from "./GoalComponent";
export declare class GoalSetterMapping extends PushRule<Goals> {
    constructor(guard1: PushTest, guards: PushTest[], reason?: string);
    setGoals(goals: GoalComponent): this;
}
/**
 * Simple GoalSetter DSL. Allows use of booleans and functions
 * returning boolean in predicate expressions
 * @param {PushTest} guard1
 * @param {PushTest} guards
 */
export declare function whenPushSatisfies(guard1: PredicateMappingTerm<PushListenerInvocation>, ...guards: Array<PredicateMappingTerm<PushListenerInvocation>>): GoalSetterMapping;
/**
 * PushRule that matches every push
 * @type {GoalSetterMapping}
 */
export declare const onAnyPush: GoalSetterMapping;
