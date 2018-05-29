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
const decorators_1 = require("@atomist/automation-client/decorators");
const graphQL_1 = require("@atomist/automation-client/graph/graphQL");
const string_1 = require("@atomist/automation-client/internal/util/string");
const Goal_1 = require("../../../../common/delivery/goals/Goal");
const SdmGoalImplementationMapper_1 = require("../../../../common/delivery/goals/support/SdmGoalImplementationMapper");
const storeGoals_1 = require("../../../../common/delivery/goals/support/storeGoals");
const PushRules_1 = require("../../../../common/listener/support/PushRules");
const addressChannels_1 = require("../../../../common/slack/addressChannels");
const repoRef_1 = require("../../../../util/git/repoRef");
/**
 * Set up goalSet on a push (e.g. for delivery).
 */
let SetGoalsOnPush = class SetGoalsOnPush {
    /**
     * Configure goal setting
     * @param projectLoader use to load projects
     * @param goalSetters first GoalSetter that returns goalSet wins
     * @param goalsListeners listener to goals set
     * @param implementationMapping
     * @param credentialsFactory credentials factory
     */
    constructor(projectLoader, goalSetters, goalsListeners, implementationMapping, credentialsFactory) {
        this.projectLoader = projectLoader;
        this.goalSetters = goalSetters;
        this.goalsListeners = goalsListeners;
        this.implementationMapping = implementationMapping;
        this.credentialsFactory = credentialsFactory;
    }
    handle(event, context, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const push = event.data.Push[0];
            const id = repoRef_1.toRemoteRepoRef(push.repo);
            const credentials = this.credentialsFactory.eventHandlerCredentials(context, id);
            yield chooseAndSetGoals({
                projectLoader: params.projectLoader,
                goalsListeners: params.goalsListeners,
                goalSetters: params.goalSetters,
                implementationMapping: params.implementationMapping,
            }, {
                context,
                credentials,
                push,
            });
            return automation_client_1.Success;
        });
    }
};
SetGoalsOnPush = __decorate([
    automation_client_1.EventHandler("Set up goalSet", graphQL_1.subscription("OnPushToAnyBranch")),
    __metadata("design:paramtypes", [Object, Array, Array, SdmGoalImplementationMapper_1.SdmGoalImplementationMapper, Object])
], SetGoalsOnPush);
exports.SetGoalsOnPush = SetGoalsOnPush;
function chooseAndSetGoals(rules, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        const { projectLoader, goalsListeners, goalSetters, implementationMapping } = rules;
        const { context, credentials, push } = parameters;
        const id = repoRef_1.repoRefFromPush(push);
        const addressChannels = addressChannels_1.addressChannelsFor(push.repo, context);
        const goalSetId = string_1.guid();
        const { determinedGoals, goalsToSave } = yield determineGoals({ projectLoader, goalSetters, implementationMapping }, {
            credentials, id, context, push, addressChannels, goalSetId,
        });
        yield Promise.all(goalsToSave.map(g => storeGoals_1.storeGoal(context, g)));
        // Let GoalSetListeners know even if we determined no goals.
        // This is not an error
        const gsi = {
            id,
            context,
            credentials,
            addressChannels: addressChannels_1.addressChannelsFor(push.repo, context),
            goalSetId,
            goalSet: determinedGoals,
        };
        yield Promise.all(goalsListeners.map(l => l(gsi)));
        return determinedGoals;
    });
}
exports.chooseAndSetGoals = chooseAndSetGoals;
function determineGoals(rules, circumstances) {
    return __awaiter(this, void 0, void 0, function* () {
        const { projectLoader, goalSetters, implementationMapping } = rules;
        const { credentials, id, context, push, addressChannels, goalSetId } = circumstances;
        return projectLoader.doWithProject({ credentials, id, context, readOnly: true }, (project) => __awaiter(this, void 0, void 0, function* () {
            const pli = {
                project,
                credentials,
                id,
                push,
                context,
                addressChannels,
            };
            const determinedGoals = yield chooseGoalsForPushOnProject({ goalSetters }, pli);
            if (!determinedGoals) {
                return { determinedGoals: undefined, goalsToSave: [] };
            }
            const goalsToSave = yield sdmGoalsFromGoals(implementationMapping, pli, determinedGoals, goalSetId);
            return { determinedGoals, goalsToSave };
        }));
    });
}
exports.determineGoals = determineGoals;
function sdmGoalsFromGoals(implementationMapping, pli, determinedGoals, goalSetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.all(determinedGoals.goals.map((g) => __awaiter(this, void 0, void 0, function* () {
            return storeGoals_1.constructSdmGoal(pli.context, {
                goalSet: determinedGoals.name,
                goalSetId,
                goal: g,
                state: Goal_1.hasPreconditions(g) ? "planned" : "requested",
                id: pli.id,
                providerId: repoRef_1.providerIdFromPush(pli.push),
                fulfillment: yield fulfillment({ implementationMapping }, g, pli),
            });
        })));
    });
}
function fulfillment(rules, g, inv) {
    return __awaiter(this, void 0, void 0, function* () {
        const { implementationMapping } = rules;
        const plan = yield implementationMapping.findFulfillmentByPush(g, inv);
        if (SdmGoalImplementationMapper_1.isGoalImplementation(plan)) {
            return storeGoals_1.constructSdmGoalImplementation(plan);
        }
        if (SdmGoalImplementationMapper_1.isSideEffect(plan)) {
            return { method: "side-effect", name: plan.sideEffectName };
        }
        automation_client_1.logger.warn("FYI, no implementation found for '%s'", g.name);
        return { method: "other", name: "unspecified-yo" };
    });
}
exports.executeImmaterial = () => __awaiter(this, void 0, void 0, function* () {
    automation_client_1.logger.debug("Immaterial: Nothing to execute");
    return automation_client_1.Success;
});
function chooseGoalsForPushOnProject(rules, pi) {
    return __awaiter(this, void 0, void 0, function* () {
        const { goalSetters } = rules;
        const { push, id, addressChannels } = pi;
        try {
            const pushRules = new PushRules_1.PushRules("Goal setter", goalSetters);
            const determinedGoals = yield pushRules.mapping(pi);
            if (!determinedGoals) {
                automation_client_1.logger.info("No goals set by push to %s:%s on %s", id.owner, id.repo, push.branch);
            }
            else {
                automation_client_1.logger.info("Goals for push on %j are %s", id, determinedGoals.name);
            }
            return determinedGoals;
        }
        catch (err) {
            automation_client_1.logger.error("Error determining goals: %s", err);
            yield addressChannels(`Serious error trying to determine goals. Please check SDM logs: ${err}`);
            throw err;
        }
    });
}
let ApplyGoalsParameters = class ApplyGoalsParameters {
};
__decorate([
    automation_client_1.Secret(automation_client_1.Secrets.UserToken),
    __metadata("design:type", String)
], ApplyGoalsParameters.prototype, "githubToken", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubOwner),
    __metadata("design:type", String)
], ApplyGoalsParameters.prototype, "owner", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubRepository),
    __metadata("design:type", String)
], ApplyGoalsParameters.prototype, "repo", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubRepositoryProvider),
    __metadata("design:type", String)
], ApplyGoalsParameters.prototype, "providerId", void 0);
__decorate([
    automation_client_1.Parameter({ required: false }),
    __metadata("design:type", String)
], ApplyGoalsParameters.prototype, "sha", void 0);
ApplyGoalsParameters = __decorate([
    decorators_1.Parameters()
], ApplyGoalsParameters);
exports.ApplyGoalsParameters = ApplyGoalsParameters;
//# sourceMappingURL=SetGoalsOnPush.js.map