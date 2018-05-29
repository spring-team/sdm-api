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
const GitCommandGitProject_1 = require("@atomist/automation-client/project/git/GitCommandGitProject");
const retry_1 = require("@atomist/automation-client/util/retry");
const ghub_1 = require("../../util/github/ghub");
const gitHubTagRouter_1 = require("../../util/github/gitHubTagRouter");
/**
 * Run a tagger and publish tags for this repo
 * @param {Tagger} tagger
 * @param {GitHubRepoRef} id
 * @param {ProjectOperationCredentials} credentials
 * @param {AddressChannels} addressChannels
 * @param {HandlerContext} ctx
 */
function publishTags(tagger, id, credentials, addressChannels, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const p = yield GitCommandGitProject_1.GitCommandGitProject.cloned(credentials, id);
        const tags = yield tagger(p, ctx, undefined);
        if (tags.tags.length > 0) {
            // Add existing tags so they're not lost
            tags.tags = tags.tags.concat(yield ghub_1.listTopics(credentials, id));
            yield addressChannels(`Tagging \`${id.owner}/${id.repo}\` with tags ${format(tags.tags)}`);
            const edp = {
                targets: {
                    owner: id.owner,
                    repo: id.repo,
                    sha: "master",
                    usesRegex: false,
                    credentials,
                    repoRef: id,
                    test: () => true,
                },
            };
            return retry_1.doWithRetry(() => gitHubTagRouter_1.GitHubTagRouter(tags, edp, undefined), "Publish tags", {
                randomize: true,
                retries: 30,
            });
        }
    });
}
exports.publishTags = publishTags;
function format(tags) {
    return tags.map(t => "`" + t + "`").join(", ");
}
//# sourceMappingURL=publishTags.js.map