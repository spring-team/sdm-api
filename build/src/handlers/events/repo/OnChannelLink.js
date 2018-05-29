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
const addressChannels_1 = require("../../../common/slack/addressChannels");
const repoRef_1 = require("../../../util/git/repoRef");
/**
 * A new channel has been linked to a repo
 */
let OnChannelLink = class OnChannelLink {
    constructor(projectLoader, listeners, credentialsFactory) {
        this.projectLoader = projectLoader;
        this.listeners = listeners;
        this.credentialsFactory = credentialsFactory;
    }
    handle(event, context, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = event.data.ChannelLink[0].repo;
            const id = repoRef_1.toRemoteRepoRef(repo);
            const credentials = this.credentialsFactory.eventHandlerCredentials(context, id);
            const addressChannels = addressChannels_1.addressChannelsFor(repo, context);
            const newlyLinkedChannelName = event.data.ChannelLink[0].channel.name;
            yield this.projectLoader.doWithProject({ credentials, id, context, readOnly: true }, (project) => __awaiter(this, void 0, void 0, function* () {
                const invocation = {
                    id,
                    context,
                    addressChannels,
                    credentials,
                    project,
                    newlyLinkedChannelName,
                    addressNewlyLinkedChannel: (msg, opts) => context.messageClient.addressChannels(msg, newlyLinkedChannelName, opts),
                };
                yield Promise.all(params.listeners
                    .map(l => l(invocation)));
            }));
            return automation_client_1.Success;
        });
    }
};
OnChannelLink = __decorate([
    automation_client_1.EventHandler("On channel link", graphQL_1.subscription("OnChannelLink")),
    __metadata("design:paramtypes", [Object, Array, Object])
], OnChannelLink);
exports.OnChannelLink = OnChannelLink;
//# sourceMappingURL=OnChannelLink.js.map