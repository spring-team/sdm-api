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
const automation_client_1 = require("@atomist/automation-client");
const ghub_1 = require("../../../util/github/ghub");
const projectVersioner_1 = require("./local/projectVersioner");
function executeTag(projectLoader) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const { status, credentials, id, context } = rwlc;
        return projectLoader.doWithProject({ credentials, id, context, readOnly: true }, (p) => __awaiter(this, void 0, void 0, function* () {
            const commit = status.commit;
            const version = yield projectVersioner_1.readSdmVersion(commit.repo.owner, commit.repo.name, commit.repo.org.provider.providerId, commit.sha, id.branch, context);
            yield createTagForStatus(id, commit.sha, commit.message, version, credentials);
            return automation_client_1.Success;
        }));
    });
}
exports.executeTag = executeTag;
function createTagForStatus(id, sha, message, version, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const tag = {
            tag: version,
            message,
            object: sha,
            type: "commit",
            tagger: {
                name: "Atomist",
                email: "info@atomist.com",
                date: new Date().toISOString(),
            },
        };
        yield ghub_1.createTag(credentials, id, tag);
        yield ghub_1.createTagReference(credentials, id, tag);
    });
}
exports.createTagForStatus = createTagForStatus;
//# sourceMappingURL=executeTag.js.map