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
const ghub_1 = require("../../../../util/github/ghub");
/**
 * Create a new branch, setting a GitHub commit status
 */
class NewBranchWithStatus {
    constructor(branch, message, creds, status) {
        this.branch = branch;
        this.message = message;
        this.creds = creds;
        this.status = status;
        automation_client_1.logger.info("Created NewBranchWithStatus: %j", this);
    }
    afterPersist(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gitStatus = yield p.gitStatus();
                const sha = gitStatus.sha;
                if (!sha) {
                    throw new Error("Sha is not available");
                }
                automation_client_1.logger.info("Setting status %j on sha %s for %j", this.status, sha, p.id);
                return ghub_1.createStatus(this.creds, Object.assign({}, p.id, { sha }), this.status);
            }
            catch (err) {
                automation_client_1.logger.warn("Unable to get git status for %j. Possibly a deleted repo", p.id);
            }
        });
    }
}
exports.NewBranchWithStatus = NewBranchWithStatus;
//# sourceMappingURL=NewBranchWithStatus.js.map