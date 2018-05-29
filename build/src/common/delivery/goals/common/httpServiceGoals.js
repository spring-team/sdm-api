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
const Goals_1 = require("../Goals");
const commonGoals_1 = require("./commonGoals");
/**
 * Goals for an Http service, mirroring a typical flow through
 * staging to production.
 * Goal sets are normally user defined, so this is largely
 * an illustration.
 * @type {Goals}
 */
exports.HttpServiceGoals = new Goals_1.Goals("HTTP Service", wellKnownGoals_1.FingerprintGoal, wellKnownGoals_1.AutofixGoal, wellKnownGoals_1.ReviewGoal, wellKnownGoals_1.PushReactionGoal, wellKnownGoals_1.BuildGoal, wellKnownGoals_1.ArtifactGoal, wellKnownGoals_1.StagingDeploymentGoal, wellKnownGoals_1.StagingEndpointGoal, wellKnownGoals_1.StagingVerifiedGoal, wellKnownGoals_1.ProductionDeploymentGoal, wellKnownGoals_1.ProductionEndpointGoal);
exports.LocalDeploymentGoals = new Goals_1.Goals("Local Deployment", wellKnownGoals_1.PushReactionGoal, wellKnownGoals_1.LocalDeploymentGoal, commonGoals_1.LocalEndpointGoal);
exports.UndeployEverywhereGoals = new Goals_1.Goals("Undeploy all environments", commonGoals_1.LocalUndeploymentGoal, commonGoals_1.StagingUndeploymentGoal, wellKnownGoals_1.ProductionUndeploymentGoal, wellKnownGoals_1.DeleteAfterUndeploysGoal);
exports.RepositoryDeletionGoals = new Goals_1.Goals("Offer to delete repository", wellKnownGoals_1.DeleteRepositoryGoal);
//# sourceMappingURL=httpServiceGoals.js.map