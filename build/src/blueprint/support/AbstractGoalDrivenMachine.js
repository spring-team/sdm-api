"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const logInterpreters_1 = require("../../common/delivery/goals/support/logInterpreters");
const SdmGoalImplementationMapper_1 = require("../../common/delivery/goals/support/SdmGoalImplementationMapper");
const PushRules_1 = require("../../common/listener/support/PushRules");
const commonPushTests_1 = require("../../common/listener/support/pushtest/commonPushTests");
const launchGoalK8_1 = require("../../handlers/events/delivery/goals/k8s/launchGoalK8");
/**
 * Goal driven machine
 */
class AbstractGoalDrivenMachine {
    /**
     * Construct a new software delivery machine, with zero or
     * more goal setters.
     * @param {string} name
     * @param {SoftwareDeliveryMachineOptions} options
     */
    constructor(name, options) {
        this.name = name;
        this.options = options;
        this.goalSetters = [];
        /*
         * Store all the implementations we know
         */
        this.goalFulfillmentMapper = new SdmGoalImplementationMapper_1.SdmGoalImplementationMapper(
        // For now we only support kube or in process
        process.env.ATOMIST_GOAL_LAUNCHER === "kubernetes" ? launchGoalK8_1.KubernetesIsolatedGoalLauncher : undefined); // public for testing
    }
    /**
     * Return the PushMapping that will be used on pushes.
     * Useful in testing goal setting.
     * @return {PushMapping<Goals>}
     */
    get pushMapping() {
        return new PushRules_1.PushRules("Goal setter", this.goalSetters);
    }
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
    addGoalImplementation(implementationName, goal, goalExecutor, options) {
        const optsToUse = Object.assign({ pushTest: commonPushTests_1.AnyPush, logInterpreter: logInterpreters_1.lastLinesLogInterpreter(implementationName, 10) }, options);
        const implementation = {
            implementationName, goal, goalExecutor,
            pushTest: optsToUse.pushTest,
            logInterpreter: optsToUse.logInterpreter,
        };
        this.goalFulfillmentMapper.addImplementation(implementation);
        return this;
    }
    /**
     * Declare that a goal will become successful based on something outside.
     * For instance, ArtifactGoal succeeds because of an ImageLink event.
     * This tells the SDM that it does not need to run anything when this
     * goal becomes ready.
     * @param {Goal} goal
     * @param {string} sideEffectName
     * @param {PushTest} pushTest
     */
    knownSideEffect(goal, sideEffectName, pushTest = commonPushTests_1.AnyPush) {
        this.goalFulfillmentMapper.addSideEffect({
            goal,
            sideEffectName, pushTest,
        });
    }
}
exports.AbstractGoalDrivenMachine = AbstractGoalDrivenMachine;
//# sourceMappingURL=AbstractGoalDrivenMachine.js.map