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

import { Configuration, HandleCommand, HandleEvent, logger } from "@atomist/automation-client";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import * as _ from "lodash";
import { executeBuild } from "../../common/delivery/build/executeBuild";
import { executeAutofixes } from "../../common/delivery/code/autofix/executeAutofixes";
import { executePushReactions } from "../../common/delivery/code/executePushReactions";
import { executeFingerprinting } from "../../common/delivery/code/fingerprint/executeFingerprinting";
import { executeReview } from "../../common/delivery/code/review/executeReview";
import { Target } from "../../common/delivery/deploy/deploy";
import { executeDeploy } from "../../common/delivery/deploy/executeDeploy";
import { executeUndeploy, offerToDeleteRepository } from "../../common/delivery/deploy/executeUndeploy";
import { Goal } from "../../common/delivery/goals/Goal";
import { Goals } from "../../common/delivery/goals/Goals";
import { lastLinesLogInterpreter, LogSuppressor } from "../../common/delivery/goals/support/logInterpreters";
import { ExecuteGoalWithLog } from "../../common/delivery/goals/support/reportGoalError";
import { SdmGoalImplementationMapper } from "../../common/delivery/goals/support/SdmGoalImplementationMapper";
import { GoalSetter } from "../../common/listener/GoalSetter";
import { PushMapping } from "../../common/listener/PushMapping";
import { PushTest } from "../../common/listener/PushTest";
import { PushRule } from "../../common/listener/support/PushRule";
import { PushRules } from "../../common/listener/support/PushRules";
import { AnyPush } from "../../common/listener/support/pushtest/commonPushTests";
import { StaticPushMapping } from "../../common/listener/support/StaticPushMapping";
import { deleteRepositoryCommand } from "../../handlers/commands/deleteRepository";
import { disposeCommand } from "../../handlers/commands/disposeCommand";
import { displayBuildLogHandler } from "../../handlers/commands/ShowBuildLog";
import { FindArtifactOnImageLinked } from "../../handlers/events/delivery/build/FindArtifactOnImageLinked";
import { InvokeListenersOnBuildComplete } from "../../handlers/events/delivery/build/InvokeListenersOnBuildComplete";
import { SetGoalOnBuildComplete } from "../../handlers/events/delivery/build/SetStatusOnBuildComplete";
import { ReactToSemanticDiffsOnPushImpact } from "../../handlers/events/delivery/code/ReactToSemanticDiffsOnPushImpact";
import { OnDeployStatus } from "../../handlers/events/delivery/deploy/OnDeployStatus";
import { FulfillGoalOnRequested } from "../../handlers/events/delivery/goals/FulfillGoalOnRequested";
import { KubernetesIsolatedGoalLauncher } from "../../handlers/events/delivery/goals/k8s/launchGoalK8";
import { RequestDownstreamGoalsOnGoalSuccess } from "../../handlers/events/delivery/goals/RequestDownstreamGoalsOnGoalSuccess";
import { resetGoalsCommand } from "../../handlers/events/delivery/goals/resetGoals";
import { RespondOnGoalCompletion } from "../../handlers/events/delivery/goals/RespondOnGoalCompletion";
import { executeImmaterial, SetGoalsOnPush } from "../../handlers/events/delivery/goals/SetGoalsOnPush";
import { SkipDownstreamGoalsOnGoalFailure } from "../../handlers/events/delivery/goals/SkipDownstreamGoalsOnGoalFailure";
import { executeVerifyEndpoint, SdmVerification } from "../../handlers/events/delivery/verify/executeVerifyEndpoint";
import { OnVerifiedDeploymentStatus } from "../../handlers/events/delivery/verify/OnVerifiedDeploymentStatus";
import { ClosedIssueHandler } from "../../handlers/events/issue/ClosedIssueHandler";
import { NewIssueHandler } from "../../handlers/events/issue/NewIssueHandler";
import { UpdatedIssueHandler } from "../../handlers/events/issue/UpdatedIssueHandler";
import { OnChannelLink } from "../../handlers/events/repo/OnChannelLink";
import { OnFirstPushToRepo } from "../../handlers/events/repo/OnFirstPushToRepo";
import { OnPullRequest } from "../../handlers/events/repo/OnPullRequest";
import { OnRepoCreation } from "../../handlers/events/repo/OnRepoCreation";
import { OnRepoOnboarded } from "../../handlers/events/repo/OnRepoOnboarded";
import { OnTag } from "../../handlers/events/repo/OnTag";
import { OnUserJoiningChannel } from "../../handlers/events/repo/OnUserJoiningChannel";
import { Builder } from "../../spi/build/Builder";
import { InterpretLog } from "../../spi/log/InterpretedLog";
import { ExtensionPack } from "../ExtensionPack";
import { EmptyFunctionalUnit, FunctionalUnit } from "../FunctionalUnit";
import { SoftwareDeliveryMachine } from "../SoftwareDeliveryMachine";
import { SoftwareDeliveryMachineOptions } from "../SoftwareDeliveryMachineOptions";
import {
    ArtifactGoal,
    AutofixGoal,
    BuildGoal,
    DeleteAfterUndeploysGoal,
    DeleteRepositoryGoal,
    FingerprintGoal,
    JustBuildGoal,
    NoGoal,
    PushReactionGoal,
    ReviewGoal,
    StagingEndpointGoal,
    StagingVerifiedGoal,
} from "../wellKnownGoals";
import { ListenerRegistrationSupport } from "./ListenerRegistrationSupport";

/**
 * Implementation of SoftwareDeliveryMachine.
 * Not intended for direct user instantiation. See machineFactory.ts
 */
export class ConcreteSoftwareDeliveryMachine extends ListenerRegistrationSupport implements SoftwareDeliveryMachine {

    private generators: Array<Maker<HandleCommand>> = [];

    public editors: Array<Maker<HandleCommand>> = [];

    public supportingCommands: Array<Maker<HandleCommand>> = [];

    public supportingEvents: Array<Maker<HandleEvent<any>>> = [];

    public functionalUnits: FunctionalUnit[] = [];

    public goalSetters: GoalSetter[] = [];

    private readonly disposalGoalSetters: GoalSetter[] = [];

    // Maintained depending on whether this SDM might mutate
    private mightMutate: boolean = false;

    /**
     * Return the PushMapping that will be used on pushes.
     * Useful in testing goal setting.
     * @return {PushMapping<Goals>}
     */
    get pushMapping(): PushMapping<Goals> {
        return new PushRules("Goal setter", this.goalSetters);
    }

    /**
     * Return if this SDM purely observes, rather than changes an org.
     * Note that this cannot be 100% reliable, as arbitrary event handlers
     * could be making commits, initiating deployments etc.
     * @return {boolean}
     */
    get observesOnly(): boolean {
        if (this.mightMutate) {
            return false;
        }
        return this.autofixRegistrations.length === 0;
    }

    /*
     * Store all the implementations we know
     */
    public readonly goalFulfillmentMapper = new SdmGoalImplementationMapper(
        // For now we only support kube or in process
        process.env.ATOMIST_GOAL_LAUNCHER === "kubernetes" ? KubernetesIsolatedGoalLauncher : undefined); // public for testing

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
    public addGoalImplementation(implementationName: string,
                                 goal: Goal,
                                 goalExecutor: ExecuteGoalWithLog,
                                 options?: Partial<{
                                     pushTest: PushTest,
                                     logInterpreter: InterpretLog,
                                 }>): this {
        const optsToUse = {
            pushTest: AnyPush,
            logInterpreter: lastLinesLogInterpreter(implementationName, 10),
            ...options,
        };
        const implementation = {
            implementationName, goal, goalExecutor,
            pushTest: optsToUse.pushTest,
            logInterpreter: optsToUse.logInterpreter,
        };
        this.goalFulfillmentMapper.addImplementation(implementation);
        return this;
    }

    protected addVerifyImplementation(): this {
        const stagingVerification: SdmVerification = {
            verifiers: this.endpointVerificationListeners,
            endpointGoal: StagingEndpointGoal,
            requestApproval: true,
        };
        return this.addGoalImplementation("VerifyInStaging",
            StagingVerifiedGoal,
            executeVerifyEndpoint(stagingVerification));
    }

    public addDisposalRules(...goalSetters: GoalSetter[]): this {
        this.disposalGoalSetters.push(...goalSetters);
        return this;
    }

    private get onRepoCreation(): Maker<OnRepoCreation> {
        return this.repoCreationListeners.length > 0 ?
            () => new OnRepoCreation(this.repoCreationListeners, this.options.credentialsResolver) :
            undefined;
    }

    private get onNewRepoWithCode(): Maker<OnFirstPushToRepo> {
        return this.newRepoWithCodeActions.length > 0 ?
            () => new OnFirstPushToRepo(this.newRepoWithCodeActions, this.options.credentialsResolver) :
            undefined;
    }

    private get semanticDiffReactor(): Maker<ReactToSemanticDiffsOnPushImpact> {
        return this.fingerprintDifferenceListeners.length > 0 ?
            () => new ReactToSemanticDiffsOnPushImpact(this.fingerprintDifferenceListeners, this.options.credentialsResolver) :
            undefined;
    }

    private get goalSetting(): FunctionalUnit {
        if (this.goalSetters.length === 0) {
            logger.warn("No goal setters");
            return EmptyFunctionalUnit;
        }
        return {
            eventHandlers: [() => new SetGoalsOnPush(this.options.projectLoader,
                this.goalSetters, this.goalsSetListeners,
                this.goalFulfillmentMapper, this.options.credentialsResolver)],
            commandHandlers: [() => resetGoalsCommand({
                projectLoader: this.options.projectLoader,
                goalsListeners: this.goalsSetListeners,
                goalSetters: this.goalSetters,
                implementationMapping: this.goalFulfillmentMapper,
            })],
        };
    }

    private get goalConsequences(): FunctionalUnit {
        return {
            eventHandlers: [
                () => new SkipDownstreamGoalsOnGoalFailure(),
                () => new RequestDownstreamGoalsOnGoalSuccess(this.goalFulfillmentMapper),
                () => new RespondOnGoalCompletion(this.options.credentialsResolver,
                    this.goalCompletionListeners)],
            commandHandlers: [],
        };
    }

    private readonly artifactFinder = () => new FindArtifactOnImageLinked(
        ArtifactGoal,
        this.options.artifactStore,
        this.artifactListenerRegistrations,
        this.options.projectLoader,
        this.options.credentialsResolver)

    private get notifyOnDeploy(): Maker<OnDeployStatus> {
        return this.deploymentListeners.length > 0 ?
            () => new OnDeployStatus(this.deploymentListeners, this.options.credentialsResolver) :
            undefined;
    }

    private get onVerifiedStatus(): Maker<OnVerifiedDeploymentStatus> {
        return this.verifiedDeploymentListeners.length > 0 ?
            () => new OnVerifiedDeploymentStatus(this.verifiedDeploymentListeners, this.options.credentialsResolver) :
            undefined;
    }

    private get disposal(): FunctionalUnit {
        return {
            commandHandlers: [
                () => disposeCommand({
                    goalSetters: this.disposalGoalSetters,
                    projectLoader: this.options.projectLoader,
                    goalsListeners: this.goalsSetListeners,
                    implementationMapping: this.goalFulfillmentMapper,
                }),
                deleteRepositoryCommand],
            eventHandlers: [],
        };
    }

    private readonly onBuildComplete: Maker<SetGoalOnBuildComplete> =
        () => new SetGoalOnBuildComplete([BuildGoal, JustBuildGoal])

    get showBuildLog(): Maker<HandleCommand> {
        return () => {
            return displayBuildLogHandler();
        };
    }

    private get allFunctionalUnits(): FunctionalUnit[] {
        return this.functionalUnits
            .concat([
                this.goalSetting,
                this.goalConsequences,
                this.disposal,
            ]);
    }

    get eventHandlers(): Array<Maker<HandleEvent<any>>> {
        return this.supportingEvents
            .concat(() => new FulfillGoalOnRequested(this.goalFulfillmentMapper, this.options.projectLoader, this.options.logFactory))
            .concat(_.flatten(this.allFunctionalUnits.map(fu => fu.eventHandlers)))
            .concat([
                this.userJoiningChannelListeners.length > 0 ?
                    () => new OnUserJoiningChannel(this.userJoiningChannelListeners, this.options.credentialsResolver) :
                    undefined,
                this.buildListeners.length > 0 ?
                    () => new InvokeListenersOnBuildComplete(this.buildListeners, this.options.credentialsResolver) :
                    undefined,
                this.tagListeners.length > 0 ? () => new OnTag(this.tagListeners, this.options.credentialsResolver) : undefined,
                this.newIssueListeners.length > 0 ? () => new NewIssueHandler(this.newIssueListeners, this.options.credentialsResolver) : undefined,
                this.updatedIssueListeners.length > 0 ?
                    () => new UpdatedIssueHandler(this.updatedIssueListeners, this.options.credentialsResolver) :
                    undefined,
                this.closedIssueListeners.length > 0 ?
                    () => new ClosedIssueHandler(this.closedIssueListeners, this.options.credentialsResolver) :
                    undefined,
                this.channelLinkListeners.length > 0 ?
                    () => new OnChannelLink(this.options.projectLoader, this.channelLinkListeners, this.options.credentialsResolver) :
                    undefined,
                this.pullRequestListeners.length > 0 ?
                    () => new OnPullRequest(this.options.projectLoader, this.pullRequestListeners,
                        this.options.credentialsResolver) : undefined,
                this.repoOnboardingListeners.length > 0 ?
                    () => new OnRepoOnboarded(this.repoOnboardingListeners, this.options.credentialsResolver) :
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

    get commandHandlers(): Array<Maker<HandleCommand>> {
        return this.generators
            .concat(_.flatten(this.allFunctionalUnits.map(fu => fu.commandHandlers)))
            .concat(this.editors)
            .concat(this.supportingCommands)
            .concat([this.showBuildLog])
            .filter(m => !!m);
    }

    public addGenerators(...g: Array<Maker<HandleCommand>>): this {
        this.generators = this.generators.concat(g);
        return this;
    }

    public addEditors(...e: Array<Maker<HandleCommand>>): this {
        this.editors = this.editors.concat(e);
        return this;
    }

    public addSupportingCommands(...e: Array<Maker<HandleCommand>>): this {
        this.supportingCommands.push(...e);
        return this;
    }

    public addSupportingEvents(...e: Array<Maker<HandleEvent<any>>>): this {
        this.supportingEvents.push(...e);
        return this;
    }

    public addFunctionalUnits(...fus: FunctionalUnit[]): this {
        this.functionalUnits.push(...fus);
        return this;
    }

    public addBuildRules(...rules: Array<PushRule<Builder> | Array<PushRule<Builder>>>): this {
        this.mightMutate = rules.length > 0;
        _.flatten(rules).forEach(r =>
            this.addGoalImplementation(r.name, BuildGoal,
                executeBuild(this.options.projectLoader, r.value),
                {
                    pushTest: r.pushTest,
                    logInterpreter: r.value.logInterpreter,
                })
                .addGoalImplementation(r.name, JustBuildGoal,
                    executeBuild(this.options.projectLoader, r.value),
                    {
                        pushTest: r.pushTest,
                        logInterpreter:
                        r.value.logInterpreter,
                    },
                ));
        return this;
    }

    public addDeployRules(...rules: Array<StaticPushMapping<Target> | Array<StaticPushMapping<Target>>>): this {
        this.mightMutate = rules.length > 0;
        _.flatten(rules).forEach(r => {
            // deploy
            this.addGoalImplementation(r.name, r.value.deployGoal, executeDeploy(
                this.options.artifactStore,
                r.value.endpointGoal, r.value),
                {
                    pushTest: r.pushTest,
                    logInterpreter: r.value.deployer.logInterpreter,
                },
            );
            // endpoint
            this.knownSideEffect(
                r.value.endpointGoal,
                r.value.deployGoal.definition.displayName);
            // undeploy
            this.addGoalImplementation(r.name, r.value.undeployGoal, executeUndeploy(r.value),
                {
                    pushTest: r.pushTest,
                    logInterpreter: r.value.deployer.logInterpreter,
                },
            );
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
    public knownSideEffect(goal: Goal, sideEffectName: string,
                           pushTest: PushTest = AnyPush) {
        this.goalFulfillmentMapper.addSideEffect({
            goal,
            sideEffectName, pushTest,
        });
    }

    public addExtensionPacks(...configurers: ExtensionPack[]): this {
        for (const configurer of configurers) {
            this.addExtensionPack(configurer);
        }
        return this;
    }

    private addExtensionPack(configurer: ExtensionPack): this {
        logger.info("Adding capabilities from configurer '%s'", configurer.name);
        configurer.configure(this);
        return this;
    }

    /**
     * Construct a new software delivery machine, with zero or
     * more goal setters.
     * @param {string} name
     * @param {SoftwareDeliveryMachineOptions} options
     * @param configuration automation client configuration we're running in
     * @param {GoalSetter} goalSetters tell me what to do on a push. Hint: start with "whenPushSatisfies(...)"
     */
    constructor(public readonly name: string,
                public readonly options: SoftwareDeliveryMachineOptions,
                public readonly configuration: Configuration,
                goalSetters: Array<GoalSetter | GoalSetter[]>) {
        super();
        this.goalSetters = _.flatten(goalSetters);

        this.addGoalImplementation("Autofix", AutofixGoal,
            executeAutofixes(this.options.projectLoader, this.autofixRegistrations), {
                // Autofix errors should not be reported to the user
                logInterpreter: LogSuppressor,
            })
            .addGoalImplementation("DoNothing", NoGoal, executeImmaterial)
            .addGoalImplementation("FingerprinterRegistration", FingerprintGoal,
                executeFingerprinting(this.options.projectLoader, this.fingerprinterRegistrations, this.fingerprintListeners))
            .addGoalImplementation("CodeReactions", PushReactionGoal,
                executePushReactions(this.options.projectLoader, this.pushReactionRegistrations))
            .addGoalImplementation("Reviews", ReviewGoal,
                executeReview(this.options.projectLoader, this.reviewerRegistrations, this.reviewListeners))
            .addVerifyImplementation()
            .addGoalImplementation("OfferToDeleteRepo", DeleteRepositoryGoal,
                offerToDeleteRepository())
            .addGoalImplementation("OfferToDeleteRepoAfterUndeploys", DeleteAfterUndeploysGoal,
                offerToDeleteRepository());
        this.knownSideEffect(ArtifactGoal, "from ImageLinked");
    }

}
