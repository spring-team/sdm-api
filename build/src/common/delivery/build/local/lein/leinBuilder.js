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
const Microgrammar_1 = require("@atomist/microgrammar/Microgrammar");
const spawned_1 = require("../../../../../util/misc/spawned");
const SpawnBuilder_1 = require("../SpawnBuilder");
exports.RunBuild = spawned_1.asSpawnCommand("lein");
function leinBuilder(projectLoader, ...commands) {
    return new SpawnBuilder_1.SpawnBuilder({
        projectLoader, options: leinBuilderOptions(commands.map(l => spawned_1.asSpawnCommand(l, {}))),
    });
}
exports.leinBuilder = leinBuilder;
exports.leinLogInterpreter = log => {
    return {
        // We don't yet know how to interpret clojure logs
        relevantPart: undefined,
        message: "lein errors",
    };
};
function leinBuilderOptions(commands) {
    return {
        name: "LeinBuilder",
        commands,
        errorFinder: (code, signal, l) => {
            return code !== 0;
        },
        logInterpreter: exports.leinLogInterpreter,
        projectToAppInfo: projectCljToAppInfo,
        options: {
            env: Object.assign({}, process.env),
        },
    };
}
exports.leinBuilderOptions = leinBuilderOptions;
function projectCljToAppInfo(p) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectClj = yield p.findFile("project.clj");
        const content = yield projectClj.getContent();
        return appInfoGrammar.firstMatch(content);
    });
}
exports.projectCljToAppInfo = projectCljToAppInfo;
const appInfoGrammar = Microgrammar_1.Microgrammar.fromString("(defproject ${pkg}/${name} \"${version}\"", {
    name: /[\w-\-]+/,
});
//# sourceMappingURL=leinBuilder.js.map