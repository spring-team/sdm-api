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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const filesChangedSince_1 = require("../../../util/git/filesChangedSince");
const filteredView_1 = require("../../../util/project/filteredView");
const addressChannels_1 = require("../../slack/addressChannels");
const contextMessageRouting_1 = require("../../slack/contextMessageRouting");
/**
 * Create a PushImpactListenerInvocation from the given context.
 * Includes both the complete project and the changed files.
 * @param {RunWithLogContext} rwlc
 * @param {GitProject} project
 * @return {Promise<PushImpactListenerInvocation>}
 */
function createPushImpactListenerInvocation(rwlc, project) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status, credentials, id, context, addressChannels } = rwlc;
        const commit = status.commit;
        const smartContext = contextMessageRouting_1.teachToRespondInEventHandler(context, ...addressChannels_1.messageDestinationsFor(commit.repo, context));
        const push = commit.pushes[0];
        const filesChanged = push.before ?
            yield filesChangedSince_1.filesChangedSince(project, push.before.sha) :
            yield filesChangedSince_1.filesChangedSinceParentCommit(project);
        const impactedSubProject = !filesChanged ? project : filteredView_1.filteredView(project, path => filesChanged.includes(path));
        return {
            id,
            context: smartContext,
            addressChannels,
            project,
            impactedSubProject,
            credentials,
            filesChanged,
            commit,
            push,
        };
    });
}
exports.createPushImpactListenerInvocation = createPushImpactListenerInvocation;
//# sourceMappingURL=createPushImpactListenerInvocation.js.map