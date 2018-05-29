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
const df = require("dateformat");
const spawned_1 = require("../../../../../util/misc/spawned");
const executeBuild_1 = require("../../executeBuild");
exports.NodeProjectVersioner = (status, p, log) => __awaiter(this, void 0, void 0, function* () {
    const pjFile = yield p.getFile("package.json");
    const pj = JSON.parse(yield pjFile.getContent());
    const branch = executeBuild_1.branchFromCommit(status.commit).split("/").join(".");
    const branchSuffix = branch !== status.commit.repo.defaultBranch ? `${branch}.` : "";
    const version = `${pj.version}-${branchSuffix}${df(new Date(), "yyyymmddHHMMss")}`;
    yield spawned_1.spawnAndWatch({
        command: "npm",
        args: ["--no-git-tag-version", "version", version],
    }, {
        cwd: p.baseDir,
    }, log, {
        errorFinder: code => code !== 0,
    });
    return version;
});
//# sourceMappingURL=nodeProjectVersioner.js.map