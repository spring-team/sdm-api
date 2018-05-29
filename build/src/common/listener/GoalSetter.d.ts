import { Goals } from "../delivery/goals/Goals";
import { PushMapping } from "./PushMapping";
/**
 * A GoalSetter decides what goals to run depending on repo contents and characteristics
 * of the push. It is fundamental to determining the flow after the push:
 * for example: do we want to run a code scan?; do we want to build?; do
 * we want to deploy?
 * @returns Goals or undefined if it doesn't like the push or
 * understand the repo
 */
export declare type GoalSetter = PushMapping<Goals>;
