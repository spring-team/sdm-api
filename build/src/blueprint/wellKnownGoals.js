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
const Goal_1 = require("../common/delivery/goals/Goal");
const gitHubContext_1 = require("../common/delivery/goals/support/github/gitHubContext");
/**
 * Goals referenced in TheSoftwareDeliveryMachine
 */
exports.NoGoal = new Goal_1.Goal({
    uniqueName: "Nevermind",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "1-immaterial",
    displayName: "immaterial",
    completedDescription: "No material changes",
});
/**
 * Goal that performs fingerprinting. Typically invoked
 * early in a delivery flow.
 * @type {Goal}
 */
exports.FingerprintGoal = new Goal_1.Goal({
    uniqueName: "Fingerprint",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "0.1-fingerprint",
    completedDescription: "Fingerprinted",
});
/**
 * Goal that performs autofixes: For example, linting
 * and adding license headers.
 * @type {Goal}
 */
exports.AutofixGoal = new Goal_1.Goal({
    uniqueName: "Autofix",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "0.2-autofix",
    workingDescription: "Running autofixes...",
    completedDescription: "Autofixed",
    failedDescription: "Fixes made: Don't proceed",
});
/**
 * Goal to run code reviews
 * @type {Goal}
 */
exports.ReviewGoal = new Goal_1.Goal({
    uniqueName: "Review",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "1-review",
    workingDescription: "Running code reviews...",
    completedDescription: "Code review passed",
    waitingForApprovalDescription: "Manual approval needed",
});
/**
 * Goal that runs PushReactionRegistrations
 * @type {Goal}
 */
exports.PushReactionGoal = new Goal_1.Goal({
    uniqueName: "CodeReaction",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "1.5-react",
    workingDescription: "Running code reactions...",
    completedDescription: "Code reactions passed",
});
/**
 * Just build, without any checks
 * @type {Goal}
 */
exports.JustBuildGoal = new Goal_1.Goal({
    uniqueName: "JustBuild",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "2-just-build ",
    displayName: "build",
    workingDescription: "Building...",
    completedDescription: "Build successful",
    failedDescription: "Build failed",
});
exports.BuildGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "Build",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "2-build",
    displayName: "build",
    workingDescription: "Building...",
    completedDescription: "Build successful",
    failedDescription: "Build failed",
    isolated: true,
}, exports.AutofixGoal);
// This one is actually satisfied in an ImageLinked event,
// which happens to be a result of the build.
exports.ArtifactGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "Artifact",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "2.5-artifact",
    displayName: "store artifact",
    completedDescription: "Stored artifact",
}, exports.BuildGoal);
exports.LocalDeploymentGoal = new Goal_1.Goal({
    uniqueName: "DeployHere",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "1-deploy-locally",
    completedDescription: "Deployed locally",
});
exports.StagingDeploymentGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "DeployToTest",
    environment: gitHubContext_1.StagingEnvironment,
    orderedName: "3-deploy",
    displayName: "deploy to Test",
    completedDescription: "Deployed to Test",
    failedDescription: "Test deployment failure",
}, exports.ArtifactGoal);
// this one won't be set up to trigger on its precondition;
// rather, the deploy goal also sets this one, currently.
// Setting the precondition lets FailDownstream know that this
// one is never gonna succeed if the deploy failed.
exports.StagingEndpointGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "FindTestEndpoint",
    environment: gitHubContext_1.StagingEnvironment,
    orderedName: "4-endpoint",
    displayName: "locate service endpoint in Test",
    completedDescription: "Here is the service endpoint in Test",
    failedDescription: "Couldn't locate service endpoint in Test",
}, exports.StagingDeploymentGoal);
exports.StagingVerifiedGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "VerifyTest",
    environment: gitHubContext_1.StagingEnvironment,
    orderedName: "5-verifyEndpoint",
    displayName: "verify Test deployment",
    completedDescription: "Verified endpoint in Test",
    waitingForApprovalDescription: "Test endpoint verified! Approve for production deploy.",
}, exports.StagingEndpointGoal);
exports.ProductionDeploymentGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "DeployToProduction",
    environment: gitHubContext_1.ProductionEnvironment,
    orderedName: "3-prod-deploy",
    displayName: "deploy to Prod",
    completedDescription: "Deployed to Prod",
}, exports.ArtifactGoal, exports.StagingVerifiedGoal);
// this one won't be set up to trigger on its precondition;
// rather, the deploy goal also sets this one, currently.
// Setting the precondition lets FailDownstream know that this
// one is never gonna succeed if the deploy failed.
exports.ProductionEndpointGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "FindProductionEndpoint",
    environment: gitHubContext_1.ProductionEnvironment,
    orderedName: "4-endpoint",
    displayName: "locate service endpoint in Prod",
    completedDescription: "Here is the service endpoint in Prod",
}, exports.ProductionDeploymentGoal);
exports.ProductionUndeploymentGoal = new Goal_1.Goal({
    uniqueName: "UndeployFromProduction",
    environment: gitHubContext_1.ProjectDisposalEnvironment,
    orderedName: "3-prod-undeploy",
    displayName: "undeploy from Prod",
    completedDescription: "not deployed in Prod",
});
exports.DeleteAfterUndeploysGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "DeleteRepositoryAfterUndeployed",
    environment: gitHubContext_1.ProjectDisposalEnvironment,
    orderedName: "8-delete-repo",
    completedDescription: "Repository deleted",
}, exports.ProductionUndeploymentGoal);
exports.DeleteRepositoryGoal = new Goal_1.Goal({
    uniqueName: "DeleteRepository",
    environment: gitHubContext_1.ProjectDisposalEnvironment,
    orderedName: "8-delete-repo",
    completedDescription: "Offered to delete repository",
});
//# sourceMappingURL=wellKnownGoals.js.map