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
/**
 * Store the artifact on local disk, relying on in memory cache.
 * **This is purely for demo and test use. It is NOT a production
 * quality implementation. It uses fake artifact links in
 * GitHub statuses that may not be honored after the present automation
 * client is shut down.**
 */
class EphemeralLocalArtifactStore {
    constructor() {
        this.entries = [];
    }
    storeFile(appInfo, what) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = {
                appInfo,
                deploymentUnitUrl: "http://" + what,
                url: `http://${what}/x`,
            };
            this.entries.push(entry);
            automation_client_1.logger.info("EphemeralLocalArtifactStore: storing %j at %s", appInfo, entry.url);
            return entry.url;
        });
    }
    retrieve(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.entries.find(e => e.url === url);
        });
    }
    checkout(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedArtifact = yield this.retrieve(url);
            if (!storedArtifact) {
                automation_client_1.logger.error("No stored artifact for [%s]: Known=%s", url, this.entries.map(e => e.url).join(","));
                return Promise.reject(new Error("No artifact found"));
            }
            const local = Object.assign({}, storedArtifact.appInfo, parseUrl(storedArtifact.deploymentUnitUrl));
            automation_client_1.logger.info("EphemeralLocalArtifactStore: checking out %s at %j", url, local);
            return local;
        });
    }
}
exports.EphemeralLocalArtifactStore = EphemeralLocalArtifactStore;
function parseUrl(targetUrl) {
    // Form is http:///var/folders/86/p817yp991bdddrqr_bdf20gh0000gp/T/tmp-20964EBUrRVIZ077a/target/losgatos1-0.1.0-SNAPSHOT.jar
    const lastSlash = targetUrl.lastIndexOf("/");
    const filename = targetUrl.substr(lastSlash + 1);
    const cwd = targetUrl.substring(7, lastSlash);
    automation_client_1.logger.debug("Parsing results: url [%s]\n filename [%s]\n cwd [%s]", targetUrl, filename, cwd);
    return { cwd, filename };
}
//# sourceMappingURL=EphemeralLocalArtifactStore.js.map