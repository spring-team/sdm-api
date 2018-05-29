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
const _ = require("lodash");
const wellKnownGoals_1 = require("../wellKnownGoals");
const createRepo_1 = require("../../common/command/generator/createRepo");
const listGenerators_1 = require("../../common/command/generator/listGenerators");
const executeAutofixes_1 = require("../../common/delivery/code/autofix/executeAutofixes");
const executePushReactions_1 = require("../../common/delivery/code/executePushReactions");
const executeFingerprinting_1 = require("../../common/delivery/code/fingerprint/executeFingerprinting");
const executeReview_1 = require("../../common/delivery/code/review/executeReview");
const executeUndeploy_1 = require("../../common/delivery/deploy/executeUndeploy");
const logInterpreters_1 = require("../../common/delivery/goals/support/logInterpreters");
const SelfDescribe_1 = require("../../handlers/commands/SelfDescribe");
const SetGoalsOnPush_1 = require("../../handlers/events/delivery/goals/SetGoalsOnPush");
const AbstractSoftwareDeliveryMachine_1 = require("./AbstractSoftwareDeliveryMachine");
/**
 * Class instantiated to create a **Software Delivery Machine**.
 * Combines commands and delivery event handling using _goals_.
 *
 * Goals and goal "implementations" can be defined by users.
 * However, certain well known goals are built into the DefaultSoftwareDeliveryMachine
 * for convenience, with their own associated listeners.
 *
 * Well known goal support is based around a delivery process spanning
 * common goals of fingerprinting, reacting to fingerprint diffs,
 * code review, build, deployment, endpoint verification and
 * promotion to a production environment.
 *
 * The most important element of a software delivery machine is setting
 * zero or more _push rules_ in the constructor.
 * This is normally done using the internal DSL as follows:
 *
 * ```
 * const sdm = new DefaultSoftwareDeliveryMachine(
 *    "MyMachine",
 *    options,
 *    whenPushSatisfies(IsMaven, HasSpringBootApplicationClass, not(MaterialChangeToJavaRepo))
 *      .itMeans("No material change to Java")
 *      .setGoals(NoGoals),
 *    whenPushSatisfies(ToDefaultBranch, IsMaven, HasSpringBootApplicationClass, HasCloudFoundryManifest)
 *      .itMeans("Spring Boot service to deploy")
 *      .setGoals(HttpServiceGoals));
 * ```
 *
 * Uses the builder pattern to allow fluent construction. For example:
 *
 * ```
 * softwareDeliveryMachine
 *    .addPushReactions(async pu => ...)
 *    .addNewIssueListeners(async i => ...)
 *    .add...;
 * ```
 */
class DefaultSoftwareDeliveryMachine extends AbstractSoftwareDeliveryMachine_1.AbstractSoftwareDeliveryMachine {
    /**
     * Construct a new software delivery machine, with zero or
     * more goal setters.
     * @param {string} name
     * @param {SoftwareDeliveryMachineOptions} opts
     * @param {GoalSetter} goalSetters tell me what to do on a push. Hint: start with "whenPushSatisfies(...)"
     */
    constructor(name, opts, ...goalSetters) {
        super(name, opts);
        this.goalSetters = _.flatten(goalSetters);
        this.addSupportingCommands(SelfDescribe_1.selfDescribeHandler(this), listGenerators_1.listGeneratorsHandler(this), createRepo_1.createRepoHandler(this));
        this.addGoalImplementation("Autofix", wellKnownGoals_1.AutofixGoal, executeAutofixes_1.executeAutofixes(this.opts.projectLoader, this.autofixRegistrations), {
            // Autofix errors should not be reported to the user
            logInterpreter: logInterpreters_1.LogSuppressor,
        })
            .addGoalImplementation("DoNothing", wellKnownGoals_1.NoGoal, SetGoalsOnPush_1.executeImmaterial)
            .addGoalImplementation("FingerprinterRegistration", wellKnownGoals_1.FingerprintGoal, executeFingerprinting_1.executeFingerprinting(this.opts.projectLoader, this.fingerprinterRegistrations, this.fingerprintListeners))
            .addGoalImplementation("CodeReactions", wellKnownGoals_1.PushReactionGoal, executePushReactions_1.executePushReactions(this.opts.projectLoader, this.pushReactionRegistrations))
            .addGoalImplementation("Reviews", wellKnownGoals_1.ReviewGoal, executeReview_1.executeReview(this.opts.projectLoader, this.reviewerRegistrations, this.reviewListeners))
            .addVerifyImplementation()
            .addGoalImplementation("OfferToDeleteRepo", wellKnownGoals_1.DeleteRepositoryGoal, executeUndeploy_1.offerToDeleteRepository())
            .addGoalImplementation("OfferToDeleteRepoAfterUndeploys", wellKnownGoals_1.DeleteAfterUndeploysGoal, executeUndeploy_1.offerToDeleteRepository());
        this.knownSideEffect(wellKnownGoals_1.ArtifactGoal, "from ImageLinked");
    }
}
exports.DefaultSoftwareDeliveryMachine = DefaultSoftwareDeliveryMachine;
//# sourceMappingURL=DefaultSoftwareDeliveryMachine.js.map