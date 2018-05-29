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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const automation_client_1 = require("@atomist/automation-client");
const graphQL_1 = require("@atomist/automation-client/graph/graphQL");
const Goal_1 = require("../../../../common/delivery/goals/Goal");
const fetchGoalsOnCommit_1 = require("../../../../common/delivery/goals/support/fetchGoalsOnCommit");
const storeGoals_1 = require("../../../../common/delivery/goals/support/storeGoals");
const ArtifactListener_1 = require("../../../../common/listener/ArtifactListener");
const addressChannels_1 = require("../../../../common/slack/addressChannels");
const repoRef_1 = require("../../../../util/git/repoRef");
let FindArtifactOnImageLinked = class FindArtifactOnImageLinked {
    /**
     * The goal to update when an artifact is linked.
     * When an artifact is linked to a commit, the build must be done.
     */
    constructor(goal, artifactStore, registrations, projectLoader, credentialsResolver) {
        this.goal = goal;
        this.artifactStore = artifactStore;
        this.registrations = registrations;
        this.projectLoader = projectLoader;
        this.credentialsResolver = credentialsResolver;
    }
    handle(event, context, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageLinked = event.data.ImageLinked[0];
            const commit = imageLinked.commit;
            const image = imageLinked.image;
            const id = repoRef_1.toRemoteRepoRef(commit.repo, { sha: commit.sha });
            const artifactSdmGoal = yield fetchGoalsOnCommit_1.findSdmGoalOnCommit(context, id, commit.repo.org.provider.providerId, params.goal);
            if (!artifactSdmGoal) {
                automation_client_1.logger.debug("FindArtifactOnImageLinked: context %s not found for %j", params.goal.context, id);
                return automation_client_1.Success;
            }
            if (params.registrations.length > 0) {
                const credentials = this.credentialsResolver.eventHandlerCredentials(context, id);
                automation_client_1.logger.info("FindArtifactOnImageLinked: Scanning artifact for %j", id);
                const deployableArtifact = yield params.artifactStore.checkout(image.imageName, id, credentials);
                const addressChannels = addressChannels_1.addressChannelsFor(commit.repo, context);
                yield this.projectLoader.doWithProject({ credentials, id, context, readOnly: true }, (project) => __awaiter(this, void 0, void 0, function* () {
                    // TODO only handles first push
                    const pli = {
                        id,
                        context,
                        credentials,
                        addressChannels,
                        push: commit.pushes[0],
                        project,
                    };
                    const ai = {
                        id,
                        context,
                        addressChannels,
                        deployableArtifact,
                        credentials,
                    };
                    automation_client_1.logger.info("About to invoke %d ArtifactListener registrations", params.registrations.length);
                    yield Promise.all(params.registrations
                        .map(ArtifactListener_1.toArtifactListenerRegistration)
                        .filter((arl) => __awaiter(this, void 0, void 0, function* () { return !arl.pushTest || !!(yield arl.pushTest.mapping(pli)); }))
                        .map(l => l.action(ai)));
                }));
            }
            yield storeGoals_1.updateGoal(context, artifactSdmGoal, {
                state: "success",
                description: params.goal.successDescription,
                url: image.imageName,
            });
            automation_client_1.logger.info("Updated artifact goal '%s'", artifactSdmGoal.name);
            return automation_client_1.Success;
        });
    }
};
FindArtifactOnImageLinked = __decorate([
    automation_client_1.EventHandler("Scan when artifact is found", graphQL_1.subscription("OnImageLinked")),
    __metadata("design:paramtypes", [Goal_1.Goal, Object, Array, Object, Object])
], FindArtifactOnImageLinked);
exports.FindArtifactOnImageLinked = FindArtifactOnImageLinked;
//# sourceMappingURL=FindArtifactOnImageLinked.js.map