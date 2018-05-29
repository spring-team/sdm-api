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
const wellKnownGoals_1 = require("../../../../blueprint/wellKnownGoals");
const wellKnownGoals_2 = require("../../../../blueprint/wellKnownGoals");
const Goal_1 = require("../Goal");
const Goals_1 = require("../Goals");
const gitHubContext_1 = require("../support/github/gitHubContext");
const commonGoals_1 = require("./commonGoals");
exports.NpmPublishGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "Publish",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "2-publish",
    displayName: "publish",
    workingDescription: "Publishing...",
    completedDescription: "Published",
    failedDescription: "Published failed",
    isolated: true,
}, wellKnownGoals_1.BuildGoal);
exports.StagingDockerDeploymentGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "DeployToTest",
    environment: gitHubContext_1.StagingEnvironment,
    orderedName: "3-deploy",
    displayName: "deploy to Test",
    completedDescription: "Deployed to Test",
    failedDescription: "Test deployment failure",
    waitingForApprovalDescription: "Promote to Prod",
    approvalRequired: true,
}, commonGoals_1.DockerBuildGoal);
exports.ProductionDockerDeploymentGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "DeployToProduction",
    environment: gitHubContext_1.ProductionEnvironment,
    orderedName: "3-prod-deploy",
    displayName: "deploy to Prod",
    completedDescription: "Deployed to Prod",
    failedDescription: "Prod deployment failure",
}, exports.StagingDockerDeploymentGoal);
exports.NpmDeployGoals = new Goals_1.Goals("Node.js Deploy", wellKnownGoals_1.ReviewGoal, wellKnownGoals_1.AutofixGoal, wellKnownGoals_1.BuildGoal, wellKnownGoals_1.ArtifactGoal, wellKnownGoals_2.StagingDeploymentGoal, wellKnownGoals_1.StagingEndpointGoal);
exports.NpmBuildGoals = new Goals_1.Goals("Node.js Build", commonGoals_1.VersionGoal, wellKnownGoals_1.ReviewGoal, wellKnownGoals_1.AutofixGoal, wellKnownGoals_1.BuildGoal, exports.NpmPublishGoal, commonGoals_1.TagGoal);
exports.NpmDockerGoals = new Goals_1.Goals("Node.js Docker Build", commonGoals_1.VersionGoal, wellKnownGoals_1.ReviewGoal, wellKnownGoals_1.AutofixGoal, wellKnownGoals_1.BuildGoal, exports.NpmPublishGoal, commonGoals_1.DockerBuildGoal, commonGoals_1.TagGoal);
exports.NpmKubernetesDeployGoals = new Goals_1.Goals("Node.js Kubernetes Build and Deploy", commonGoals_1.VersionGoal, wellKnownGoals_1.ReviewGoal, wellKnownGoals_1.AutofixGoal, wellKnownGoals_1.BuildGoal, exports.NpmPublishGoal, commonGoals_1.DockerBuildGoal, commonGoals_1.TagGoal, exports.StagingDockerDeploymentGoal, exports.ProductionDockerDeploymentGoal);
//# sourceMappingURL=npmGoals.js.map