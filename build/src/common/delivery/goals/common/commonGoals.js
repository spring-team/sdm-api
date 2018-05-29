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
const Goal_1 = require("../Goal");
const Goals_1 = require("../Goals");
const gitHubContext_1 = require("../support/github/gitHubContext");
exports.VersionGoal = new Goal_1.Goal({
    uniqueName: "Version",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "0.1-version",
    workingDescription: "Calculating project version...",
    completedDescription: "Versioned",
});
exports.DockerBuildGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "DockerBuild",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "3-docker",
    displayName: "docker build",
    workingDescription: "Running Docker build...",
    completedDescription: "Docker build successful",
    failedDescription: "Failed to build Docker image",
    isolated: true,
}, wellKnownGoals_1.BuildGoal);
exports.TagGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "Tag",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "4-tag",
    displayName: "tag",
    workingDescription: "Tagging...",
    completedDescription: "Tagged",
    failedDescription: "Failed to create Tag",
}, exports.DockerBuildGoal, wellKnownGoals_1.BuildGoal);
exports.StagingUndeploymentGoal = new Goal_1.Goal({
    uniqueName: "UndeployFromTest",
    environment: gitHubContext_1.ProjectDisposalEnvironment,
    orderedName: "2-staging-undeploy",
    displayName: "undeploy from test",
    completedDescription: "not deployed in test",
});
exports.LocalUndeploymentGoal = new Goal_1.Goal({
    uniqueName: "UndeployHere",
    environment: gitHubContext_1.ProjectDisposalEnvironment,
    orderedName: "1-undeploy-locally",
    failedDescription: "Failed at local undeploy",
    completedDescription: "not deployed locally",
});
// not an enforced precondition, but it's real enough to graph
exports.LocalEndpointGoal = new Goal_1.GoalWithPrecondition({
    uniqueName: "FindLocalEndpoint",
    environment: gitHubContext_1.IndependentOfEnvironment,
    orderedName: "2-endpoint",
    displayName: "locate local service endpoint",
    completedDescription: "Here is the local service endpoint",
}, wellKnownGoals_1.LocalDeploymentGoal);
/**
 * Special Goals object to be returned if changes are immaterial.
 * The identity of this object is important.
 * @type {Goals}
 */
exports.NoGoals = new Goals_1.Goals("No action needed", wellKnownGoals_1.NoGoal);
//# sourceMappingURL=commonGoals.js.map