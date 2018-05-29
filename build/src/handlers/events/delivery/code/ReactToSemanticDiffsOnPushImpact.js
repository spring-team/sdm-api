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
const _ = require("lodash");
const addressChannels_1 = require("../../../../common/slack/addressChannels");
const repoRef_1 = require("../../../../util/git/repoRef");
/**
 * React to a PushImpact event to react to semantic diffs
 */
let ReactToSemanticDiffsOnPushImpact = class ReactToSemanticDiffsOnPushImpact {
    constructor(differenceListeners, credentialsFactory) {
        this.differenceListeners = differenceListeners;
        this.credentialsFactory = credentialsFactory;
    }
    handle(event, context, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const pushImpact = event.data.PushImpact[0];
            const after = pushImpact.push.after;
            const id = repoRef_1.toRemoteRepoRef(after.repo, { sha: after.sha });
            const oldFingerprints = pushImpact.push.before.fingerprints;
            const newFingerprints = after.fingerprints;
            const oldValues = oldFingerprints
                .filter(f => !!f.name);
            const newValues = newFingerprints
                .filter(f => !!f.name);
            const allNames = _.uniq(oldValues.map(f => f.name)
                .concat(newValues.map(f => f.name)));
            const diffs = allNames
                .map(name => ({
                oldValue: oldValues.find(f => f.name === name),
                newValue: newValues.find(f => f.name === name),
            }))
                .filter(fv => _.get(fv, "oldValue.sha") !== _.get(fv, "newValue.sha"));
            const credentials = this.credentialsFactory.eventHandlerCredentials(context, id);
            const inv = {
                id,
                context,
                credentials,
                addressChannels: addressChannels_1.addressChannelsFor(after.repo, context),
                diffs,
            };
            yield Promise.all(this.differenceListeners.map(dh => dh(inv)));
            return automation_client_1.Success;
        });
    }
};
ReactToSemanticDiffsOnPushImpact = __decorate([
    automation_client_1.EventHandler("Find semantic diffs from a PushImpact", graphQL_1.subscription("OnPushImpact")),
    __metadata("design:paramtypes", [Array, Object])
], ReactToSemanticDiffsOnPushImpact);
exports.ReactToSemanticDiffsOnPushImpact = ReactToSemanticDiffsOnPushImpact;
//# sourceMappingURL=ReactToSemanticDiffsOnPushImpact.js.map