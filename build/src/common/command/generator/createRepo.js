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
const onCommand_1 = require("@atomist/automation-client/onCommand");
const EmptyParameters_1 = require("../EmptyParameters");
const commandSearch_1 = require("../support/commandSearch");
/**
 * Return a command handler that can create a repo using generators in this SDM
 * @param sdm
 * @return {HandleCommand<EmptyParameters>}
 */
function createRepoHandler(sdm) {
    return () => onCommand_1.commandHandlerFrom(handleCreateRepo(sdm), EmptyParameters_1.EmptyParameters, "createRepo", "Create a repo", "create repo", "new repo");
}
exports.createRepoHandler = createRepoHandler;
// TODO implement this with dropdown
function handleCreateRepo(sdm) {
    return (ctx) => __awaiter(this, void 0, void 0, function* () {
        const generators = commandSearch_1.commandHandlersWithTag(sdm, "generator");
        yield ctx.messageClient.respond(`${generators.length} generators in this SDM`);
        generators.forEach((hi) => __awaiter(this, void 0, void 0, function* () {
            yield ctx.messageClient.respond(`${hi.instance.intent.map(intent => "`" + intent + "`").join(", ")}`);
        }));
        return automation_client_1.Success;
    });
}
//# sourceMappingURL=createRepo.js.map