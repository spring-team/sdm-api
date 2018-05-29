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
const automation_client_1 = require("@atomist/automation-client");
const _ = require("lodash");
const executeBuild_1 = require("../../common/delivery/build/executeBuild");
const executeAutofixes_1 = require("../../common/delivery/code/autofix/executeAutofixes");
const executePushReactions_1 = require("../../common/delivery/code/executePushReactions");
const executeFingerprinting_1 = require("../../common/delivery/code/fingerprint/executeFingerprinting");
const executeReview_1 = require("../../common/delivery/code/review/executeReview");
const executeDeploy_1 = require("../../common/delivery/deploy/executeDeploy");
const executeUndeploy_1 = require("../../common/delivery/deploy/executeUndeploy");
const logInterpreters_1 = require("../../common/delivery/goals/support/logInterpreters");
const SdmGoalImplementationMapper_1 = require("../../common/delivery/goals/support/SdmGoalImplementationMapper");
const PushRules_1 = require("../../common/listener/support/PushRules");
const commonPushTests_1 = require("../../common/listener/support/pushtest/commonPushTests");
const deleteRepository_1 = require("../../handlers/commands/deleteRepository");
const disposeCommand_1 = require("../../handlers/commands/disposeCommand");
const ShowBuildLog_1 = require("../../handlers/commands/ShowBuildLog");
const FindArtifactOnImageLinked_1 = require("../../handlers/events/delivery/build/FindArtifactOnImageLinked");
const InvokeListenersOnBuildComplete_1 = require("../../handlers/events/delivery/build/InvokeListenersOnBuildComplete");
const SetStatusOnBuildComplete_1 = require("../../handlers/events/delivery/build/SetStatusOnBuildComplete");
const ReactToSemanticDiffsOnPushImpact_1 = require("../../handlers/events/delivery/code/ReactToSemanticDiffsOnPushImpact");
const OnDeployStatus_1 = require("../../handlers/events/delivery/deploy/OnDeployStatus");
const FulfillGoalOnRequested_1 = require("../../handlers/events/delivery/goals/FulfillGoalOnRequested");
const launchGoalK8_1 = require("../../handlers/events/delivery/goals/k8s/launchGoalK8");
const RequestDownstreamGoalsOnGoalSuccess_1 = require("../../handlers/events/delivery/goals/RequestDownstreamGoalsOnGoalSuccess");
const resetGoals_1 = require("../../handlers/events/delivery/goals/resetGoals");
const RespondOnGoalCompletion_1 = require("../../handlers/events/delivery/goals/RespondOnGoalCompletion");
const SetGoalsOnPush_1 = require("../../handlers/events/delivery/goals/SetGoalsOnPush");
const SkipDownstreamGoalsOnGoalFailure_1 = require("../../handlers/events/delivery/goals/SkipDownstreamGoalsOnGoalFailure");
const executeVerifyEndpoint_1 = require("../../handlers/events/delivery/verify/executeVerifyEndpoint");
const OnVerifiedDeploymentStatus_1 = require("../../handlers/events/delivery/verify/OnVerifiedDeploymentStatus");
const ClosedIssueHandler_1 = require("../../handlers/events/issue/ClosedIssueHandler");
const NewIssueHandler_1 = require("../../handlers/events/issue/NewIssueHandler");
const UpdatedIssueHandler_1 = require("../../handlers/events/issue/UpdatedIssueHandler");
const OnChannelLink_1 = require("../../handlers/events/repo/OnChannelLink");
const OnFirstPushToRepo_1 = require("../../handlers/events/repo/OnFirstPushToRepo");
const OnPullRequest_1 = require("../../handlers/events/repo/OnPullRequest");
const OnRepoCreation_1 = require("../../handlers/events/repo/OnRepoCreation");
const OnRepoOnboarded_1 = require("../../handlers/events/repo/OnRepoOnboarded");
const OnTag_1 = require("../../handlers/events/repo/OnTag");
const OnUserJoiningChannel_1 = require("../../handlers/events/repo/OnUserJoiningChannel");
const FunctionalUnit_1 = require("../FunctionalUnit");
const wellKnownGoals_1 = require("../wellKnownGoals");
const ListenerRegistrationSupport_1 = require("./ListenerRegistrationSupport");
/**
 * Implementation of SoftwareDeliveryMachine.
 * Not intended for direct user instantiation. See machineFactory.ts
 */
class ConcreteSoftwareDeliveryMachine extends ListenerRegistrationSupport_1.ListenerRegistrationSupport {
    /**
     * Construct a new software delivery machine, with zero or
     * more goal setters.
     * @param {string} name
     * @param {SoftwareDeliveryMachineOptions} options
     * @param configuration automation client configuration we're running in
     * @param {GoalSetter} goalSetters tell me what to do on a push. Hint: start with "whenPushSatisfies(...)"
     */
    constructor(name, options, configuration, goalSetters) {
        super();
        this.name = name;
        this.options = options;
        this.configuration = configuration;
        this.generators = [];
        this.editors = [];
        this.supportingCommands = [];
        this.supportingEvents = [];
        this.functionalUnits = [];
        this.goalSetters = [];
        this.disposalGoalSetters = [];
        // Maintained depending on whether this SDM might mutate
        this.mightMutate = false;
        /*
         * Store all the implementations we know
         */
        this.goalFulfillmentMapper = new SdmGoalImplementationMapper_1.SdmGoalImplementationMapper(
        // For now we only support kube or in process
        process.env.ATOMIST_GOAL_LAUNCHER === "kubernetes" ? launchGoalK8_1.KubernetesIsolatedGoalLauncher : undefined); // public for testing
        this.artifactFinder = () => new FindArtifactOnImageLinked_1.FindArtifactOnImageLinked(wellKnownGoals_1.ArtifactGoal, this.options.artifactStore, this.artifactListenerRegistrations, this.options.projectLoader, this.options.credentialsResolver);
        this.onBuildComplete = () => new SetStatusOnBuildComplete_1.SetGoalOnBuildComplete([wellKnownGoals_1.BuildGoal, wellKnownGoals_1.JustBuildGoal]);
        this.goalSetters = _.flatten(goalSetters);
        this.addGoalImplementation("Autofix", wellKnownGoals_1.AutofixGoal, executeAutofixes_1.executeAutofixes(this.options.projectLoader, this.autofixRegistrations), {
            // Autofix errors should not be reported to the user
            logInterpreter: logInterpreters_1.LogSuppressor,
        })
            .addGoalImplementation("DoNothing", wellKnownGoals_1.NoGoal, SetGoalsOnPush_1.executeImmaterial)
            .addGoalImplementation("FingerprinterRegistration", wellKnownGoals_1.FingerprintGoal, executeFingerprinting_1.executeFingerprinting(this.options.projectLoader, this.fingerprinterRegistrations, this.fingerprintListeners))
            .addGoalImplementation("CodeReactions", wellKnownGoals_1.PushReactionGoal, executePushReactions_1.executePushReactions(this.options.projectLoader, this.pushReactionRegistrations))
            .addGoalImplementation("Reviews", wellKnownGoals_1.ReviewGoal, executeReview_1.executeReview(this.options.projectLoader, this.reviewerRegistrations, this.reviewListeners))
            .addVerifyImplementation()
            .addGoalImplementation("OfferToDeleteRepo", wellKnownGoals_1.DeleteRepositoryGoal, executeUndeploy_1.offerToDeleteRepository())
            .addGoalImplementation("OfferToDeleteRepoAfterUndeploys", wellKnownGoals_1.DeleteAfterUndeploysGoal, executeUndeploy_1.offerToDeleteRepository());
        this.knownSideEffect(wellKnownGoals_1.ArtifactGoal, "from ImageLinked");
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
     * Return if this SDM purely observes, rather than changes an org.
     * Note that this cannot be 100% reliable, as arbitrary event handlers
     * could be making commits, initiating deployments etc.
     * @return {boolean}
     */
    get observesOnly() {
        if (this.mightMutate) {
            return false;
        }
        return this.autofixRegistrations.length === 0;
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
    addVerifyImplementation() {
        const stagingVerification = {
            verifiers: this.endpointVerificationListeners,
            endpointGoal: wellKnownGoals_1.StagingEndpointGoal,
            requestApproval: true,
        };
        return this.addGoalImplementation("VerifyInStaging", wellKnownGoals_1.StagingVerifiedGoal, executeVerifyEndpoint_1.executeVerifyEndpoint(stagingVerification));
    }
    addDisposalRules(...goalSetters) {
        this.disposalGoalSetters.push(...goalSetters);
        return this;
    }
    get onRepoCreation() {
        return this.repoCreationListeners.length > 0 ?
            () => new OnRepoCreation_1.OnRepoCreation(this.repoCreationListeners, this.options.credentialsResolver) :
            undefined;
    }
    get onNewRepoWithCode() {
        return this.newRepoWithCodeActions.length > 0 ?
            () => new OnFirstPushToRepo_1.OnFirstPushToRepo(this.newRepoWithCodeActions, this.options.credentialsResolver) :
            undefined;
    }
    get semanticDiffReactor() {
        return this.fingerprintDifferenceListeners.length > 0 ?
            () => new ReactToSemanticDiffsOnPushImpact_1.ReactToSemanticDiffsOnPushImpact(this.fingerprintDifferenceListeners, this.options.credentialsResolver) :
            undefined;
    }
    get goalSetting() {
        if (this.goalSetters.length === 0) {
            automation_client_1.logger.warn("No goal setters");
            return FunctionalUnit_1.EmptyFunctionalUnit;
        }
        return {
            eventHandlers: [() => new SetGoalsOnPush_1.SetGoalsOnPush(this.options.projectLoader, this.goalSetters, this.goalsSetListeners, this.goalFulfillmentMapper, this.options.credentialsResolver)],
            commandHandlers: [() => resetGoals_1.resetGoalsCommand({
                    projectLoader: this.options.projectLoader,
                    goalsListeners: this.goalsSetListeners,
                    goalSetters: this.goalSetters,
                    implementationMapping: this.goalFulfillmentMapper,
                })],
        };
    }
    get goalConsequences() {
        return {
            eventHandlers: [
                () => new SkipDownstreamGoalsOnGoalFailure_1.SkipDownstreamGoalsOnGoalFailure(),
                () => new RequestDownstreamGoalsOnGoalSuccess_1.RequestDownstreamGoalsOnGoalSuccess(this.goalFulfillmentMapper),
                () => new RespondOnGoalCompletion_1.RespondOnGoalCompletion(this.options.credentialsResolver, this.goalCompletionListeners)
            ],
            commandHandlers: [],
        };
    }
    get notifyOnDeploy() {
        return this.deploymentListeners.length > 0 ?
            () => new OnDeployStatus_1.OnDeployStatus(this.deploymentListeners, this.options.credentialsResolver) :
            undefined;
    }
    get onVerifiedStatus() {
        return this.verifiedDeploymentListeners.length > 0 ?
            () => new OnVerifiedDeploymentStatus_1.OnVerifiedDeploymentStatus(this.verifiedDeploymentListeners, this.options.credentialsResolver) :
            undefined;
    }
    get disposal() {
        return {
            commandHandlers: [
                () => disposeCommand_1.disposeCommand({
                    goalSetters: this.disposalGoalSetters,
                    projectLoader: this.options.projectLoader,
                    goalsListeners: this.goalsSetListeners,
                    implementationMapping: this.goalFulfillmentMapper,
                }),
                deleteRepository_1.deleteRepositoryCommand
            ],
            eventHandlers: [],
        };
    }
    get showBuildLog() {
        return () => {
            return ShowBuildLog_1.displayBuildLogHandler();
        };
    }
    get allFunctionalUnits() {
        return this.functionalUnits
            .concat([
            this.goalSetting,
            this.goalConsequences,
            this.disposal,
        ]);
    }
    get eventHandlers() {
        return this.supportingEvents
            .concat(() => new FulfillGoalOnRequested_1.FulfillGoalOnRequested(this.goalFulfillmentMapper, this.options.projectLoader, this.options.logFactory))
            .concat(_.flatten(this.allFunctionalUnits.map(fu => fu.eventHandlers)))
            .concat([
            this.userJoiningChannelListeners.length > 0 ?
                () => new OnUserJoiningChannel_1.OnUserJoiningChannel(this.userJoiningChannelListeners, this.options.credentialsResolver) :
                undefined,
            this.buildListeners.length > 0 ?
                () => new InvokeListenersOnBuildComplete_1.InvokeListenersOnBuildComplete(this.buildListeners, this.options.credentialsResolver) :
                undefined,
            this.tagListeners.length > 0 ? () => new OnTag_1.OnTag(this.tagListeners, this.options.credentialsResolver) : undefined,
            this.newIssueListeners.length > 0 ? () => new NewIssueHandler_1.NewIssueHandler(this.newIssueListeners, this.options.credentialsResolver) : undefined,
            this.updatedIssueListeners.length > 0 ?
                () => new UpdatedIssueHandler_1.UpdatedIssueHandler(this.updatedIssueListeners, this.options.credentialsResolver) :
                undefined,
            this.closedIssueListeners.length > 0 ?
                () => new ClosedIssueHandler_1.ClosedIssueHandler(this.closedIssueListeners, this.options.credentialsResolver) :
                undefined,
            this.channelLinkListeners.length > 0 ?
                () => new OnChannelLink_1.OnChannelLink(this.options.projectLoader, this.channelLinkListeners, this.options.credentialsResolver) :
                undefined,
            this.pullRequestListeners.length > 0 ?
                () => new OnPullRequest_1.OnPullRequest(this.options.projectLoader, this.pullRequestListeners, this.options.credentialsResolver) : undefined,
            this.repoOnboardingListeners.length > 0 ?
                () => new OnRepoOnboarded_1.OnRepoOnboarded(this.repoOnboardingListeners, this.options.credentialsResolver) :
                undefined,
            this.onRepoCreation,
            this.onNewRepoWithCode,
            this.semanticDiffReactor,
            this.onBuildComplete,
            this.notifyOnDeploy,
            this.onVerifiedStatus,
            this.artifactFinder,
        ]).filter(m => !!m);
    }
    get commandHandlers() {
        return this.generators
            .concat(_.flatten(this.allFunctionalUnits.map(fu => fu.commandHandlers)))
            .concat(this.editors)
            .concat(this.supportingCommands)
            .concat([this.showBuildLog])
            .filter(m => !!m);
    }
    addGenerators(...g) {
        this.generators = this.generators.concat(g);
        return this;
    }
    addEditors(...e) {
        this.editors = this.editors.concat(e);
        return this;
    }
    addSupportingCommands(...e) {
        this.supportingCommands.push(...e);
        return this;
    }
    addSupportingEvents(...e) {
        this.supportingEvents.push(...e);
        return this;
    }
    addFunctionalUnits(...fus) {
        this.functionalUnits.push(...fus);
        return this;
    }
    addBuildRules(...rules) {
        this.mightMutate = rules.length > 0;
        _.flatten(rules).forEach(r => this.addGoalImplementation(r.name, wellKnownGoals_1.BuildGoal, executeBuild_1.executeBuild(this.options.projectLoader, r.value), {
            pushTest: r.pushTest,
            logInterpreter: r.value.logInterpreter,
        })
            .addGoalImplementation(r.name, wellKnownGoals_1.JustBuildGoal, executeBuild_1.executeBuild(this.options.projectLoader, r.value), {
            pushTest: r.pushTest,
            logInterpreter: r.value.logInterpreter,
        }));
        return this;
    }
    addDeployRules(...rules) {
        this.mightMutate = rules.length > 0;
        _.flatten(rules).forEach(r => {
            // deploy
            this.addGoalImplementation(r.name, r.value.deployGoal, executeDeploy_1.executeDeploy(this.options.artifactStore, r.value.endpointGoal, r.value), {
                pushTest: r.pushTest,
                logInterpreter: r.value.deployer.logInterpreter,
            });
            // endpoint
            this.knownSideEffect(r.value.endpointGoal, r.value.deployGoal.definition.displayName);
            // undeploy
            this.addGoalImplementation(r.name, r.value.undeployGoal, executeUndeploy_1.executeUndeploy(r.value), {
                pushTest: r.pushTest,
                logInterpreter: r.value.deployer.logInterpreter,
            });
        });
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
    addExtensionPacks(...configurers) {
        for (const configurer of configurers) {
            this.addExtensionPack(configurer);
        }
        return this;
    }
    addExtensionPack(configurer) {
        automation_client_1.logger.info("Adding capabilities from configurer '%s'", configurer.name);
        configurer.configure(this);
        return this;
    }
}
exports.ConcreteSoftwareDeliveryMachine = ConcreteSoftwareDeliveryMachine;
//# sourceMappingURL=ConcreteSoftwareDeliveryMachine.js.map