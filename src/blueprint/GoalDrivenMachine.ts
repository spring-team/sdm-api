/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Configuration } from "@atomist/automation-client";
import { Goal } from "../common/delivery/goals/Goal";
import { Goals } from "../common/delivery/goals/Goals";
import { ExecuteGoalWithLog } from "../common/delivery/goals/support/reportGoalError";
import { SdmGoalImplementationMapper } from "../common/delivery/goals/support/SdmGoalImplementationMapper";
import { PushMapping } from "../common/listener/PushMapping";
import { PushTest } from "../common/listener/PushTest";
import { InterpretLog } from "../spi/log/InterpretedLog";
import { MachineConfiguration } from "./MachineConfiguration";

/**
 * MachineConfiguration driven by configurable goals.
 * Goals and goal "implementations" can be defined by users.
 * However, certain well known goals are built into the TheSoftwareDeliveryMachine
 * for convenience, with their own associated listeners.
 */
export interface GoalDrivenMachine extends MachineConfiguration {

    /**
     * Automation client configuration this machine will run in
     */
    readonly configuration: Configuration;

    /**
     * Return the PushMapping that will be used on pushes.
     * Useful in testing goal setting.
     * @return {PushMapping<Goals>}
     */
    pushMapping: PushMapping<Goals>;

    /**
     * Return if this SDM purely observes, rather than changes things in an org.
     * Note that this cannot be 100% reliable, as arbitrary event handlers
     * could be making commits, initiating deployments etc.
     * @return {boolean}
     */
    observesOnly: boolean;

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
    addGoalImplementation(implementationName: string,
                          goal: Goal,
                          goalExecutor: ExecuteGoalWithLog,
                          options?: Partial<{
                              pushTest: PushTest,
                              logInterpreter: InterpretLog,
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
    knownSideEffect(goal: Goal, sideEffectName: string,
                    pushTest: PushTest);

    // TODO this should be an interface
    readonly goalFulfillmentMapper: SdmGoalImplementationMapper;

}
