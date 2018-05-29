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
const GitCommandGitProject_1 = require("@atomist/automation-client/project/git/GitCommandGitProject");
const fs = require("fs");
const util_1 = require("util");
const cacheKey_1 = require("../../util/misc/cacheKey");
const LruCache_1 = require("../../util/misc/LruCache");
/**
 * Caching implementation of ProjectLoader
 */
class CachingProjectLoader {
    constructor(maxEntries = 20) {
        this.cache = new LruCache_1.LruCache(maxEntries);
    }
    doWithProject(params, action) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.readOnly) {
                automation_client_1.logger.warn("CachingProjectLoader: Forcing fresh clone for non readonly use of %j", params.id);
                const p = yield GitCommandGitProject_1.GitCommandGitProject.cloned(params.credentials, params.id);
                return action(p);
            }
            automation_client_1.logger.debug("CachingProjectLoader: Hoping to reuse clone for readonly use of %j", params.id);
            const key = cacheKey_1.cacheKeyForSha(params.id);
            let project = this.cache.get(key);
            if (!!project) {
                // Validate it, as the directory may have been cleaned up
                try {
                    yield util_1.promisify(fs.access)(project.baseDir);
                }
                catch (_a) {
                    this.cache.evict(key);
                    automation_client_1.logger.warn("CachingProjectLoader: Invalid cache entry %s", key);
                    project = undefined;
                }
            }
            if (!project) {
                project = yield GitCommandGitProject_1.GitCommandGitProject.cloned(params.credentials, params.id);
                automation_client_1.logger.info("Caching project %j", project.id);
                this.cache.put(key, project);
            }
            automation_client_1.logger.info("CachingProjectLoader: About to invoke action. Cache stats: %j", this.cache.stats);
            return action(project);
        });
    }
}
exports.CachingProjectLoader = CachingProjectLoader;
//# sourceMappingURL=CachingProjectLoader.js.map