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
const axios_1 = require("axios");
const https = require("https");
const spawned_1 = require("../../../../util/misc/spawned");
exports.ManagedDeploymentTargeter = (id, branch) => {
    const branchId = Object.assign({}, id, { branch });
    return {
        name: "Run alongside this automation",
        description: `Locally run ${id.sha} from branch ${branch}`,
        managedDeploymentKey: branchId,
    };
};
/**
 * Strategy for looking up a service
 */
var LookupStrategy;
(function (LookupStrategy) {
    LookupStrategy["service"] = "service";
    LookupStrategy["branch"] = "branch";
    LookupStrategy["sha"] = "sha";
})(LookupStrategy = exports.LookupStrategy || (exports.LookupStrategy = {}));
/**
 * Manages local deployments to the automation server node
 * This is not intended for production use
 * @type {Array}
 */
class ManagedDeployments {
    constructor(initialPort) {
        this.initialPort = initialPort;
        this.deployments = [];
    }
    /**
     * Find the appropriate port for this app
     * @param {RemoteRepoRef} id
     * @param lookupStrategy strategy for looking up the instance
     * @param host it will be on. Check for ports not in use
     * @return {number}
     */
    findPort(id, lookupStrategy, host) {
        return __awaiter(this, void 0, void 0, function* () {
            const running = this.findDeployment(id, lookupStrategy);
            return !!running ? running.port : this.nextFreePort(host);
        });
    }
    recordDeployment(da) {
        automation_client_1.logger.info("Recording app [%s:%s] on port [%d]", da.id.owner, da.id.repo, da.port);
        this.deployments.push(da);
    }
    findDeployment(id, lookupStrategy) {
        switch (lookupStrategy) {
            case LookupStrategy.sha:
                if (!id.sha) {
                    throw new Error("Sha should have been set to use 'sha' LookupStrategy");
                }
                // Probability of a sha collision is tiny
                return this.deployments.find(d => d.id.sha === id.sha);
            case LookupStrategy.branch:
                if (!id.branch) {
                    throw new Error("Branch should have been set to use 'branch' LookupStrategy");
                }
                return this.deployments
                    .find(d => d.id.owner === id.owner && d.id.repo === id.repo && d.id.branch === id.branch);
            case LookupStrategy.service:
                this.deployments
                    .find(d => d.id.owner === id.owner && d.id.repo === id.repo);
        }
    }
    /**
     * Terminate any process we're managing on behalf of this id
     * @param {RemoteRepoRef} id
     * @param lookupStrategy strategy for finding the instance
     * @return {Promise<any>}
     */
    terminateIfRunning(id, lookupStrategy) {
        return __awaiter(this, void 0, void 0, function* () {
            const victim = this.findDeployment(id, lookupStrategy);
            if (!!victim && !!victim.childProcess) {
                yield spawned_1.poisonAndWait(victim.childProcess);
                // Keep the port but deallocate the process
                automation_client_1.logger.info("Killed app [%j] with pid %d, but continuing to reserve port [%d]", id, victim.childProcess.pid, victim.port);
                victim.childProcess = undefined;
            }
            else {
                automation_client_1.logger.info("Was asked to kill app [%j], but no eligible process found", id);
            }
        });
    }
    nextFreePort(host) {
        return __awaiter(this, void 0, void 0, function* () {
            let port = this.initialPort;
            while (true) {
                if (this.deployments.some(d => d.port === port)) {
                    port++;
                }
                else if (yield portIsInUse(host, port)) {
                    // Skip this port, too
                    automation_client_1.logger.warn("Unexpected: %s is serving on port %d", host, port);
                    port++;
                }
                else {
                    break;
                }
            }
            return port;
        });
    }
}
exports.ManagedDeployments = ManagedDeployments;
function portIsInUse(host, port) {
    return __awaiter(this, void 0, void 0, function* () {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });
        try {
            yield axios_1.default.head(`${host}:${port}`, { httpsAgent: agent });
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
//# sourceMappingURL=ManagedDeployments.js.map